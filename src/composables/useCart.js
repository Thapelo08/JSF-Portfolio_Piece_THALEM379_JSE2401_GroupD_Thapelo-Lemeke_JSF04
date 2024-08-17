// src/composables/useCart.js
import { ref, watch } from 'vue';
import { jwtDecode }  from 'jwt-decode';

const cart = ref({});

// Load cart from localStorage on initialization
if (localStorage.getItem('cart')) {
  cart.value = JSON.parse(localStorage.getItem('cart'));
}

// Watch for changes in the cart and update localStorage
watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart));
}, { deep: true });

export function useCart() {
  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.sub || decoded.userId; // Adjust based on your JWT structure
    }
    return null;
  };

  const addToCart = (product) => {
    const userId = getUserId();
    if (!userId) return;

    if (!cart.value[userId]) {
      cart.value[userId] = [];
    }

    const existingItem = cart.value[userId].find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value[userId].push({ ...product, quantity: 1 });
    }
  };

  const removeFromCart = (productId) => {
    const userId = getUserId();
    if (!userId || !cart.value[userId]) return;

    const index = cart.value[userId].findIndex(item => item.id === productId);
    if (index !== -1) {
      cart.value[userId].splice(index, 1);
    }
  };

  const updateQuantity = (productId, quantity) => {
    const userId = getUserId();
    if (!userId || !cart.value[userId]) return;

    const item = cart.value[userId].find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
    }
  };

  const clearCart = () => {
    const userId = getUserId();
    if (userId) {
      cart.value[userId] = [];
    }
  };

  const getCartItemCount = () => {
    const userId = getUserId();
    if (!userId || !cart.value[userId]) return 0;
    return cart.value[userId].reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    const userId = getUserId();
    if (!userId || !cart.value[userId]) return 0;
    return cart.value[userId].reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const getUserCart = () => {
    const userId = getUserId();
    return userId ? cart.value[userId] || [] : [];
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    getUserCart
  };
}