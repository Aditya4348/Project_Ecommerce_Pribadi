<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Inscription d'un nouvel utilisateur avec envoi d'OTP
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Générer et envoyer l'OTP pour vérification
        $this->sendOtp($user->email, 'otp_register_');

        return response()->json([
            'message' => 'User successfully registered. Please check your email for OTP verification.',
            'user' => $user
        ], 201);
    }

    /**
     * Vérification de l'inscription via OTP
     */
    public function verifyRegistration(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $cachedOtp = Cache::get('otp_register_' . $request->email);

        if (!$cachedOtp || $cachedOtp != $request->otp) {
            return response()->json(['error' => 'Invalid or expired OTP'], 400);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user->email_verified_at) {
            $user->email_verified_at = now();
            $user->save();
        }

        Cache::forget('otp_register_' . $request->email);

        $token = auth()->login($user);

        return $this->respondWithToken($token);
    }

    /**
     * Connexion
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Vérifier si l'email est vérifié
        if (auth()->user()->email_verified_at === null) {
            auth()->logout();
            return response()->json(['error' => 'Email not verified. Please verify your account.'], 403);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Mot de passe oublié : Envoi OTP
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $this->sendOtp($request->email, 'otp_reset_');

        return response()->json(['message' => 'OTP sent to your email for password reset.']);
    }

    /**
     * Réinitialisation du mot de passe avec OTP
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|numeric',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $cachedOtp = Cache::get('otp_reset_' . $request->email);

        if (!$cachedOtp || $cachedOtp != $request->otp) {
            return response()->json(['error' => 'Invalid or expired OTP'], 400);
        }

        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        Cache::forget('otp_reset_' . $request->email);

        return response()->json(['message' => 'Password successfully reset. You can now login.']);
    }

    /**
     * Helper pour envoyer l'OTP (Utilise Mail::raw pour l'exemple)
     */
    protected function sendOtp($email, $prefix)
    {
        $otp = random_int(100000, 999999);
        // Stocker l'OTP dans le cache pour 10 minutes
        Cache::put($prefix . $email, $otp, now()->addMinutes(10));

        try {
            Mail::raw("Your OTP code is: $otp", function ($message) use ($email) {
                $message->to($email)
                    ->subject('Verification Code');
            });
        } catch (\Exception $e) {
            // Log l'erreur si l'envoi échoue
        }
    }

    public function me()
    {
        Log::info("user fetched", ['user' => auth()->user()]);

        return response()->json(Auth::guard('api')->user());
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}
