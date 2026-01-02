<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        // Data dummy untuk produk
        $products = [
            [
                'name' => 'Sepatu Lari Nike Air Zoom',
                'slug' => Str::slug('Sepatu Lari Nike Air Zoom'),
                'description' => 'Sepatu lari dengan bantalan empuk yang responsif, cocok untuk lari jarak jauh maupun penggunaan sehari-hari. Desain ergonomis dan bahan breathable.',
                'price' => 1250000,
                'category' => json_encode(['id' => 1, 'name' => 'Sepatu']), // Sesuai migrasi (tipe JSON)
                'images' => json_encode(['products/shoe1.jpg', 'products/shoe2.jpg']),
                'stock' => 50,
                'sku' => 'NK-AZ-001',
                'featured' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Kemeja Flannel Premium',
                'slug' => Str::slug('Kemeja Flannel Premium'),
                'description' => 'Kemeja flannel bahan katun kualitas tinggi. Nyaman dipakai, tidak panas, dan cocok untuk gaya kasual maupun semi-formal.',
                'price' => 299000,
                'category' => json_encode(['id' => 2, 'name' => 'Pakaian']),
                'images' => json_encode(['products/shirt1.jpg']),
                'stock' => 120,
                'sku' => 'FL-PRM-001',
                'featured' => 0,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Smartwatch Series 7',
                'slug' => Str::slug('Smartwatch Series 7'),
                'description' => 'Jam tangan pintar dengan layar retina selalu aktif. Fitur pemantauan oksigen darah, detak jantung, dan berbagai mode olahraga.',
                'price' => 4500000,
                'category' => json_encode(['id' => 3, 'name' => 'Elektronik']),
                'images' => json_encode(['products/watch1.jpg', 'products/watch2.jpg']),
                'stock' => 30,
                'sku' => 'SW-S7-001',
                'featured' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Tas Ransel Waterproof',
                'slug' => Str::slug('Tas Ransel Waterproof'),
                'description' => 'Tas ransel anti air dengan kompartemen laptop. Cocok untuk pekerja kantoran atau mahasiswa yang sering beraktivitas di luar.',
                'price' => 550000,
                'category' => json_encode(['id' => 4, 'name' => 'Aksesoris']),
                'images' => json_encode(['products/bag1.jpg']),
                'stock' => 80,
                'sku' => 'BG-WP-001',
                'featured' => 0,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        DB::table('products')->insert($products);
    }
}
