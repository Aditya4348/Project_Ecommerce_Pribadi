<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductSpec;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $data = [
            ['Sepatu Lari Nike Air Zoom', 1, 'Sepatu', 125000],
            ['Kemeja Flannel Premium', 2, 'Pakaian', 29900],
            ['Smartwatch Series 7', 3, 'Elektronik', 450000],
            ['Tas Ransel Waterproof', 4, 'Aksesoris', 55000],
            ['Adidas Ultraboost', 1, 'Sepatu', 150000],
            ['Kaos Polos Hitam', 2, 'Pakaian', 15000],
            ['Headphone Bluetooth', 3, 'Elektronik', 250000],
            ['Dompet Kulit Pria', 4, 'Aksesoris', 45000],
            ['Sepatu Sneakers Casual', 1, 'Sepatu', 95000],
            ['Jaket Bomber Navy', 2, 'Pakaian', 85000],
            ['Mouse Gaming RGB', 3, 'Elektronik', 120000],
            ['Kacamata Hitam', 4, 'Aksesoris', 25000],
            ['Sepatu Formal Pantofel', 1, 'Sepatu', 110000],
            ['Celana Chino Cream', 2, 'Pakaian', 65000],
            ['Keyboard Mechanical', 3, 'Elektronik', 350000],
            ['Jam Tangan Analog', 4, 'Aksesoris', 75000],
            ['Sandal Gunung Outdoor', 1, 'Sepatu', 50000],
            ['Sweater Hoodie Grey', 2, 'Pakaian', 70000],
            ['Speaker Portable Bass', 3, 'Elektronik', 180000],
            ['Topi Baseball Snapback', 4, 'Aksesoris', 30000],
        ];

        $products = [];

        foreach ($data as $index => $item) {
            $products[] = [
                'name' => $item[0],
                'slug' => Str::slug($item[0]),
                'description' => 'Deskripsi lengkap untuk ' . $item[0] . '. Produk ini memiliki kualitas terbaik dengan harga yang kompetitif.',
                'price' => $item[3],

                // ✅ TANPA json_encode
                'category' => [
                    'id' => $item[1],
                    'name' => $item[2],
                ],

                // ✅ ARRAY, bukan STRING
                'images' => [
                    'https://lipsum.app/id/' . ($index + 10) . '/1600x900'
                ],

                'stock' => rand(20, 100),
                'sku' => Str::upper(substr($item[2], 0, 3)) . '-' . str_pad($index + 1, 3, '0', STR_PAD_LEFT),
                'featured' => rand(0, 1),
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }
        
        // Pastikan ada user untuk review (ambil yang pertama atau buat baru)
        $user = User::first() ?? User::factory()->create([
            'name' => 'Reviewer User',
            'email' => 'reviewer@example.com',
        ]);

        foreach ($products as $productData) {
            $product = Product::create($productData);

            // 1. Tambahkan Product Specs berdasarkan kategori
            $categoryName = $productData['category']['name'];
            $specs = [];

            if ($categoryName === 'Sepatu') {
                $specs = [
                    ['name' => 'Material', 'value' => 'Canvas/Suede Premium'],
                    ['name' => 'Sole', 'value' => 'Rubber Anti-Slip'],
                    ['name' => 'Insole', 'value' => 'Memory Foam'],
                ];
            } elseif ($categoryName === 'Pakaian') {
                $specs = [
                    ['name' => 'Material', 'value' => 'Cotton Combed 30s'],
                    ['name' => 'Fit', 'value' => 'Regular Fit'],
                    ['name' => 'Care', 'value' => 'Machine Washable'],
                ];
            } elseif ($categoryName === 'Elektronik') {
                $specs = [
                    ['name' => 'Warranty', 'value' => '1 Year Official'],
                    ['name' => 'Battery', 'value' => 'Long-lasting Li-ion'],
                    ['name' => 'Connectivity', 'value' => 'Bluetooth 5.0 / USB-C'],
                ];
            } else {
                $specs = [
                    ['name' => 'Quality', 'value' => 'High Grade'],
                    ['name' => 'Origin', 'value' => 'Imported'],
                ];
            }

            foreach ($specs as $spec) {
                ProductSpec::create([
                    'product_id' => $product->id,
                    'name' => $spec['name'],
                    'value' => $spec['value'],
                ]);
            }

            // 2. Tambahkan Review Dummy
            Review::create([
                'product_id' => $product->id,
                'user_id' => $user->id,
                'rating' => rand(4, 5),
                'comment' => 'Produk sangat bagus! Kualitas materialnya terasa premium dan pengiriman sangat cepat. Sangat direkomendasikan.',
            ]);
        }
    }
}
