
export interface Category {
  id: number;
  name: string;
}

/**
 * Type Auth
 * ---------------------
 * Note:  Isi nya type interface Untuk Kebutuhan Authentication
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredetials {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  role: 'customer' | 'admin';
  phone: string;
  address: string;
}

/**
 * Type Main Content
 * ---------------------
 * Note: Isi nya type interface Untuk Kebutuhan Data Utama Website Seperti Product Dan Lain nya
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  stock: number;
  sku: string;
  rating: number;
  reviews: Review[];
  featured?: boolean;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  orders: Order[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: string;
}

export interface SalesData {
  date: string;
  amount: number;
}
