import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '@/lib/firebase/config';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { CartItem, Product } from '@/types/firebase';

interface CartContextType {
  cart: CartItem[];
  favorites: string[];
  loadingCart: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  cartTotal: number;
  simulateCheckout: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser) {
        setCart([]);
        setFavorites([]);
        setLoadingCart(false);
        return;
      }

      try {
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setCart(data.cart || []);
          setFavorites(data.favorites || []);
        } else {
          await setDoc(userRef, { cart: [], favorites: [] });
          setCart([]);
          setFavorites([]);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoadingCart(false);
      }
    };

    loadUserData();
  }, [currentUser]);

  const updateFirestoreCart = async (newCart: CartItem[]) => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { cart: newCart });
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  const updateFirestoreFavorites = async (newFavorites: string[]) => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { favorites: newFavorites });
    } catch (error) {
      console.error('Error updating favorites:', error);
      throw error;
    }
  };

  const addToCart = async (productId: string, quantity = 1) => {
    if (!currentUser) {
      throw new Error('User must be logged in to add items to cart');
    }

    const existingItemIndex = cart.findIndex(item => item.productId === productId);
    let newCart = [...cart];

    if (existingItemIndex > -1) {
      newCart[existingItemIndex].quantity += quantity;
    } else {
      newCart.push({ productId, quantity });
    }

    setCart(newCart);
    await updateFirestoreCart(newCart);
  };

  const removeFromCart = async (productId: string) => {
    if (!currentUser) return;

    const newCart = cart.filter(item => item.productId !== productId);
    setCart(newCart);
    await updateFirestoreCart(newCart);
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!currentUser) return;

    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    const newCart = cart.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );

    setCart(newCart);
    await updateFirestoreCart(newCart);
  };

  const clearCart = async () => {
    if (!currentUser) return;

    setCart([]);
    await updateFirestoreCart([]);
  };

  const toggleFavorite = async (productId: string) => {
    if (!currentUser) {
      throw new Error('User must be logged in to add favorites');
    }

    let newFavorites = [...favorites];
    if (favorites.includes(productId)) {
      newFavorites = newFavorites.filter(id => id !== productId);
    } else {
      newFavorites.push(productId);
    }

    setFavorites(newFavorites);
    await updateFirestoreFavorites(newFavorites);
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const cartTotal = cart.reduce((total, item) => {
    // Aquí deberías obtener el precio del producto desde tu base de datos
    // Por ahora usamos un valor fijo para el ejemplo
    const productPrice = 100; // Reemplazar con precio real
    return total + (productPrice * item.quantity);
  }, 0);

  const simulateCheckout = async () => {
    if (!currentUser) {
      throw new Error('User must be logged in to checkout');
    }

    if (cart.length === 0) {
      throw new Error('Cart is empty');
    }

    // Aquí iría la lógica real de checkout
    // Por ahora solo limpiamos el carrito
    await clearCart();
  };

  const value = {
    cart,
    favorites,
    loadingCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleFavorite,
    isFavorite,
    cartTotal,
    simulateCheckout,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 