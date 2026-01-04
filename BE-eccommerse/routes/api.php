<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');




Route::get('products', [ProductController::class, 'index']);
Route::get('products/{product:slug}', [ProductController::class, 'show']);

    

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('verify-registration', [AuthController::class, 'verifyRegistration']);
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
});

Route::middleware('auth:api')->get('/user', [AuthController::class, 'me']);

Route::middleware(['auth:api, role:customer'])->group(function () {
    Route::post('/products/{slug}/favorite', [ProductController::class, 'toggleFavorite']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
});

Route::middleware(['auth:api, role:admin'])->group(function () {
    Route::post('products', [ProductController::class, 'store']);
    Route::put('products/{slug}', [ProductController::class, 'update']);
    Route::delete('products/{slug}', [ProductController::class, 'destroy']);
});