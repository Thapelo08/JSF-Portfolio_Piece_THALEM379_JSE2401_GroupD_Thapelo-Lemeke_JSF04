// src/composables/useWishlist.js
import { ref } from 'vue';

const wishlist = ref([]);

export function useWishlist() {
  const loadWishlist = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      wishlist.value = JSON.parse(savedWishlist);
    }
  };

  const addToWishlist = (item) => {
    wishlist.value.push(item);
    saveWishlist();
  };
  

  const removeFromWishlist = (itemId) => {
    wishlist.value = wishlist.value.filter(item => item.id !== itemId);
    saveWishlist();
  };

  const saveWishlist = () => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist.value));
  };

  return {
    wishlist,
    loadWishlist,
    addToWishlist,
    removeFromWishlist
  };
}
