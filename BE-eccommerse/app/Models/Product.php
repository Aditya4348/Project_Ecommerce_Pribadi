<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'category',
        'images',
        'stock',
        'sku',
        'featured',
    ];


    public function review(){
        return $this->hasMany(Review::class, 'product_id', 'id');
    }

    
}
