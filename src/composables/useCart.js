// src/composables/useCart.js
import { ref, watch } from 'vue';

const cart = ref([]);

// Load cart from localStorage on initialization
if (localStorage.getItem('cart')) {
  cart.value = JSON.parse(localStorage.getItem('cart'));
}

// Watch for changes in the cart and update localStorage
watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart));
}, { deep: true });

export function useCart() {
  const addToCart = (product) => {
    const existingItem = cart.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
  };

  const removeFromCart = (productId) => {
    const index = cart.value.findIndex(item => item.id === productId);
    if (index !== -1) {
      cart.value.splice(index, 1);
    }
  };

  const getCartItemCount = () => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    getCartItemCount
  };
}