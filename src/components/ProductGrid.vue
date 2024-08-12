<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Iterate over products and display each one -->
      <div v-for="product in products" :key="product.id" class="card-container bg-white shadow-md rounded-lg overflow-hidden border p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
        <!-- Link to product details page -->
        <router-link :to="`/product/${product.id}`" class="flex justify-center items-center">
          <img :src="product.image" :alt="product.title" class="w-400px h-48 object-cover mb-5 rounded" />
        </router-link>
        <div class="card-content p-4 flex flex-col flex-grow">
          <!-- Product title -->
          <h3 class="text-lg font-bold mb-2">{{ product.title }}</h3>
          <!-- Product price -->
          <p class="text-gray-700 mb-2">${{ product.price }}</p>
          <!-- Product category -->
          <p class="text-gray-500">{{ product.category }}</p>
          <!-- Product rating -->
          <p class="text-gray-700 mb-4">
            Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)
          </p>
          <div class="mt-auto flex justify-evenly items-center">
            <!-- Toggle favorite button -->
            <button @click="toggleFavorite(product.id)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="{'text-gray-300': !isFavorite(product.id), 'text-red-500': isFavorite(product.id)}" class="w-6 h-6" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
            <!-- Add to cart button -->
            <button class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition duration-200">
              Add To Cart +
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  /**
   * @fileoverview This component displays a grid of products with an option to add them to the cart or mark them as favorites.
   * It includes functionality for toggling favorite status and interacts with local storage to persist user preferences.
   */
  
  export default {
    /**
     * @name ProductGrid
     * @description A component that renders a list of products in a grid format.
     * Each product is displayed with an image, title, price, category, rating, and options to add to cart or mark as favorite.
     */
  
    /**
     * Component properties.
     * @type {Object}
     * @property {Array} products - Array of product objects to display.
     */
    props: {
      products: {
        type: Array,
        required: true
      }
    },
  
    setup(props) {
      /**
       * Reactive state to keep track of favorite products.
       * @type {import('vue').Ref<number[]>}
       */
      const favorites = ref([]);
  
      /**
       * Toggles the favorite status of a product.
       * Adds or removes the product ID from the list of favorites and updates local storage.
       * @param {number} productId - The ID of the product to toggle.
       */
      const toggleFavorite = (productId) => {
        const index = favorites.value.indexOf(productId);
        if (index > -1) {
          favorites.value.splice(index, 1);
        } else {
          favorites.value.push(productId);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites.value));
      };
  
      /**
       * Checks if a product is in the favorites list.
       * @param {number} productId - The ID of the product to check.
       * @returns {boolean} - Returns true if the product is a favorite, otherwise false.
       */
      const isFavorite = (productId) => {
        return favorites.value.includes(productId);
      };
  
      return {
        toggleFavorite,
        isFavorite
      };
    }
  };
  </script>
  