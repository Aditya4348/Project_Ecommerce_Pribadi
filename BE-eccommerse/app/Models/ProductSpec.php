<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSpec extends Model
{
    protected $fillable = [
        'product_id',
        'name',
        'value',
    ];

    public function Product(){
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
