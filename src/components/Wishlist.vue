<template>
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-bold mb-4">My Wishlist</h1>
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

   <div class="mb-4">
        <button @click="clearWishlist(products.id)" class="bg-red-500 text-white px-4 py-2 rounded">Clear Wishlist</button>
      </div>

  </template>
  
  <script>
import { ref, computed, onMounted, watch } from 'vue';
import { useWishlist } from '../composables/useWishlist';
import { useCart } from '../composables/useCart';

export default {
  name: 'Wishlist',
  setup() {
    const { wishlist, removeFromWishlist, clearWishlist, addToWishlist } = useWishlist();
    const { addToCart } = useCart();
    const sortOrder = ref('');
    const products = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const sortedWishlist = computed(() => {
      if (sortOrder.value === 'asc') {
        return [...wishlist.value].sort((a, b) => a.price - b.price);
      } else if (sortOrder.value === 'desc') {
        return [...wishlist.value].sort((a, b) => b.price - a.price);
      }
      return wishlist.value;
    });

    // Load wishlist from localStorage on component mount
    onMounted(() => {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        wishlist.value = JSON.parse(savedWishlist);
      }
    });

    // Watch for changes in the wishlist and save to localStorage
    watch(wishlist, (newWishlist) => {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    }, { deep: true });

    onMounted(async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        products.value = await response.json();
        loading.value = false;
      } catch (err) {
        error.value = err.message;
        loading.value = false;
      }
    });

    return {
      sortedWishlist,
      removeFromWishlist,
      clearWishlist,
      addToCart,
      sortOrder,
      products,
      loading,
      error,
      addToWishlist
    };
  }
};
</script>