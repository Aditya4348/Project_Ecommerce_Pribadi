<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('description')->nullable();
            $table->decimal('price');
            $table->json('category')->nullable();
            $table->json('images')->nullable();
            $table->integer('stock');
            $table->string('sku');
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });

        Schema::create('product_specs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('value');
            $table->timestamps();
        });


        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('comment');
            $table->integer('rating');
            $table->timestamps();
        });

        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['user_id', 'product_id']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
        Schema::dropIfExists('product_specs');
        Schema::dropIfExists('review');
        Schema::dropIfExists('favorites');
    }
};
