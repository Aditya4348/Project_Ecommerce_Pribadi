<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'category',
        'images',
        'stock',
        'sku',
        'featured',
    ];

    protected $casts = [
        'images' => 'array',     // ✅ FIX
        'category' => 'array',
        'featured' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function review()
    {
        return $this->hasMany(Review::class);
    }

    public function favorite() {
        return $this->belongsToMany(User::class, 'favorites');
    }

    public function productSpec()
    {
        return $this->hasMany(ProductSpec::class);
    }
}
