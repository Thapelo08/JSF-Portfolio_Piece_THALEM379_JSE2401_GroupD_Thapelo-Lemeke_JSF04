// src/composables/useWishlist.js
import { ref, watch } from 'vue';

export function useWishlist() {
  const wishlist = ref([]);

  const loadWishlist = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      wishlist.value = JSON.parse(savedWishlist);
    }
  };

  watch(wishlist, (newWishlist) => {
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  }, { deep: true });

  const addToWishlist = (product) => {
    if (!wishlist.value.some(item => item.id === product.id)) {
      wishlist.value.push(product);
    }
  };

  const removeFromWishlist = (productId) => {
    wishlist.value = wishlist.value.filter(item => item.id !== productId);
  };

  const clearWishlist = () => {
    wishlist.value = [];
  };

  const isInWishlist = (productId) => {
    return wishlist.value.some(item => item.id === productId);
  };

  return {
    wishlist,
    loadWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist
  };
}