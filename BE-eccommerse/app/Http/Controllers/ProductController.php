<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::query()->select('id', 'name', 'description', 'price', 'category', 'images', 'featured', 'slug');

        // Filter Berdasarkan Category

        if ($category = request('category')) {
            if ($category !== 'all') {
                $query->whereRaw(
                    'LOWER(category) LIKE ?',
                    ['%' . Str::lower(trim($category)) . '%']
                );
            }
        }

        // Filter Slider Harga
        if ($request->filled('min_price') && $request->filled('max_price')) {
            $query->whereBetween('price', [
                $request->min_price,
                $request->max_price
            ]);
        }

        // Filter Berdasarkan Harga
        switch ($request->sort) {
            case 'asc':
                $query->orderBy('price', 'asc');
                break;
            case 'desc':
                $query->orderBy('price', 'desc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            default:
                $query->orderBy('featured', 'desc');
                break;
        }

        $products = $query->paginate(6)->withQueryString();

        return response()->json([
            'message' => 'Products fetched successfully',
            'products' => $products
        ], 200);
    }

    public function saveProduct(StoreProductRequest $request)
    {
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    /**
     * Toggle favorite status for a product.
     */
    public function toggleFavorite(Request $request, $id)
    {
        $user = $request->user();
        $product = Product::findOrFail($id);

        $user->favorites()->toggle($product->id);

        $isFavorite = $user->favorites()
            ->where('product_id', $product->id)
            ->exists();

        return response()->json([
            'message' => 'Favorite updated',
            'is_favorite' => $isFavorite
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
