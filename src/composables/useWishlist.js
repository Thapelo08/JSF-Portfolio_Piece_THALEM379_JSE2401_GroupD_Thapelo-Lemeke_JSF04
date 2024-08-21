import { ref } from 'vue';

/**
 * Composable function to manage the user's wishlist.
 * @module useWishlist
 * @returns {Object} - The wishlist management state and methods.
 */
export function useWishlist() {
  /**
   * Reactive reference to the wishlist items.
   * @type {Ref<Array>}
   */
  const wishlist = ref([]);

  /**
   * Loads the wishlist from localStorage and initializes the wishlist reference.
   * @function loadWishlist
   */
  const loadWishlist = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      wishlist.value = JSON.parse(savedWishlist);
    }
  };

  /**
   * Adds an item to the wishlist and saves the updated wishlist to localStorage.
   * @function addToWishlist
   * @param {Object} item - The item to add to the wishlist. Must include an 'id' property.
   */
  const addToWishlist = (item) => {
    wishlist.value.push(item);
    saveWishlist();
  };

  /**
   * Removes an item from the wishlist by its ID and saves the updated wishlist to localStorage.
   * @function removeFromWishlist
   * @param {number|string} itemId - The ID of the item to remove from the wishlist.
   */
  const removeFromWishlist = (itemId) => {
    wishlist.value = wishlist.value.filter(item => item.id !== itemId);
    saveWishlist();
  };

  /**
   * Saves the current wishlist to localStorage.
   * @function saveWishlist
   */
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
