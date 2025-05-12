import { User } from 'firebase/auth';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface UserProfile extends Omit<User, 'displayName' | 'photoURL'> {
  displayName: string | null;
  photoURL: string | null;
  role?: 'user' | 'admin';
  favorites?: string[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
} 