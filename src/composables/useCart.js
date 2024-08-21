// src/composables/useCart.js
import { ref, watch } from 'vue';
import { jwtDecode } from 'jwt-decode';

const cart = ref({});

// Load cart from localStorage on initialization
if (localStorage.getItem('cart')) {
  cart.value = JSON.parse(localStorage.getItem('cart'));
}

// Watch for changes in the cart and update localStorage
watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart));
}, { deep: true });

/**
 * Composable function to manage the shopping cart.
 * @module useCart
 * @returns {Object} - The cart management methods and reactive cart state.
 */
export function useCart() {
  /**
   * Retrieves the user ID from the JWT token stored in localStorage.
   * @function getUserId
   * @returns {string|null} - The user ID from the JWT token or null if not found.
   */
  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.sub || decoded.userId; // Adjust based on your JWT structure
    }
    return null;
  };

  /**
   * Adds a product to the cart for the current user.
   * If the product already exists in the cart, it increases the quantity.
   * @function addToCart
   * @param {Object} product - The product object to add to the cart.
   */
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

  /**
   * Removes a product from the cart for the current user.
   * @function removeFromCart
   * @param {string} productId - The ID of the product to remove from the cart.
   */
  const removeFromCart = (productId) => {
    const userId = getUserId();
    if (!userId || !cart.value[userId]) return;

    const index = cart.value[userId].findIndex(item => item.id === productId);
    if (index !== -1) {
      cart.value[userId].splice(index, 1);
    }
  };

  /**
   * Updates the quantity of a product in the cart for the current user.
   * @function updateQuantity
   * @param {string} productId - The ID of the product to update.
   * @param {number} quantity - The new quantity of the product.
   */
  const updateQuantity = (productId, quantity) => {
    const userId = getUserId();
    if (!userId || !cart.value[userId]) return;

    const item = cart.value[userId].find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
    }
  };

  /**
   * Clears the cart for the current user.
   * @function clearCart
   */
  const clearCart = () => {
    const userId = getUserId();
    if (userId) {
      cart.value[userId] = [];
    }
  };

  /**
   * Retrieves the total item count in the cart for the current user.
   * @function getCartItemCount
   * @returns {number} - The total number of items in the cart.
   */
  const getCartItemCount = () => {
    const userId = getUserId();
    if (!userId || !cart.value[userId]) return 0;
    return cart.value[userId].reduce((total, item) => total + item.quantity, 0);
  };

  /**
   * Retrieves the total price of items in the cart for the current user.
   * @function getCartTotal
   * @returns {string} - The total price of items in the cart, formatted to two decimal places.
   */
  const getCartTotal = () => {
    const userId = getUserId();
    if (!userId || !cart.value[userId]) return '0.00';
    return cart.value[userId].reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  /**
   * Retrieves the cart items for the current user.
   * @function getUserCart
   * @returns {Array<Object>} - The list of items in the cart.
   */
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
