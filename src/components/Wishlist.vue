<template>
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-bold mb-4">My Wishlist</h1>
      <div class="mb-4">
        <button @click="clearWishlist" class="bg-red-500 text-white px-4 py-2 rounded">Clear Wishlist</button>
      </div>
      <div class="mb-4">
        <select v-model="sortOrder" class="border p-2 rounded">
          <option value="">Sort by Price</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="product in sortedWishlist" :key="product.id" class="border p-4 rounded">
          <img :src="product.image" :alt="product.title" class="w-full h-48 object-cover mb-2">
          <h2 class="text-lg font-semibold">{{ product.title }}</h2>
          <p class="text-gray-600">${{ product.price }}</p>
          <div class="mt-2 flex justify-between items-center">
            <button @click="removeFromWishlist(product.id)" class="bg-red-500 text-white px-2 py-1 rounded mr-2">Remove</button>
            <button @click="addToCart(product)" class="bg-green-500 text-white px-2 py-1 rounded">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useWishlist } from '../composables/useWishlist';
  import { useCart } from '../composables/useCart';
  
  export default {
    name: 'Wishlist',
    setup() {
      const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
      const { addToCart } = useCart();
      const sortOrder = ref('');
  
      const sortedWishlist = computed(() => {
        if (sortOrder.value === 'asc') {
          return [...wishlist.value].sort((a, b) => a.price - b.price);
        } else if (sortOrder.value === 'desc') {
          return [...wishlist.value].sort((a, b) => b.price - a.price);
        }
        return wishlist.value;
      });
  
      return {
        sortedWishlist,
        removeFromWishlist,
        clearWishlist,
        addToCart,
        sortOrder
      };
    }
  };
  </script>
  