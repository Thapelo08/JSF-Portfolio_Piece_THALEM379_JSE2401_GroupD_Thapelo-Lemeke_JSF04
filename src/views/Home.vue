<template>
  <div class="container mx-auto p-6">
    <!-- Wishlist Carousel -->
    <div v-if="isLoggedIn && wishlist.length > 0" class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Your Wishlist</h2>
      <div class="flex overflow-x-auto space-x-4">
        <div v-for="product in wishlist" :key="product.id" class="flex-none w-64">
          <div class="border p-4 rounded">
            <img :src="product.image" :alt="product.title" class="w-full h-48 object-cover mb-2">
            <h3 class="text-lg font-semibold">{{ product.title }}</h3>
            <p class="text-gray-600">${{ product.price }}</p>
            <div class="mt-2 flex justify-between items-center">
              <WishlistButton :product="product" />
              <button @click="addToCart(product)" class="bg-green-500 text-white px-2 py-1 rounded text-sm">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and sorting controls -->
    <div class="mt-20 flex justify-between items-center flex-wrap mb-4">
      <!-- Category selection dropdown -->
      <select v-model="selectedCategory" class="border p-2 rounded mb-2 sm:mb-0" :class="{ 'bg-white text-black': !isDarkMode, 'bg-gray-700 text-white': isDarkMode }">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <!-- Search input and button -->
      <div class="flex items-center mb-2 sm:mb-0">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products..."
          class="border p-2 rounded-l"
          :class="{ 'bg-white text-black': !isDarkMode, 'bg-gray-700 text-white': isDarkMode }"
        />
        <button
          @click="searchProducts"
          class="border border-l-0 p-2 rounded-r"
          :class="{ 'bg-white text-black': !isDarkMode, 'bg-gray-700 text-white': isDarkMode }"
        >
          Search
        </button>
      </div>

      <!-- Sorting dropdown -->
      <select v-model="sortOrder" class="border p-2 rounded" :class="{ 'bg-white text-black': !isDarkMode, 'bg-gray-700 text-white': isDarkMode }">
        <option value="">Sort by Price</option>
        <option value="default">Default</option>
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>
    </div>

    <!-- Loading indicator -->
    <Loading v-if="loading" />
    
    <!-- Grid of filtered products -->
    <ProductGrid :products="filteredProducts" v-else />
  </div>
</template>

<script>
import { ref, onMounted, computed, inject } from 'vue';
import Loading from '../components/Loading.vue';
import ProductGrid from '../components/ProductGrid.vue';
import WishlistButton from '../components/WishlistButton.vue';
import { useWishlist } from '../composables/useWishlist';
import { useCart } from '../composables/useCart';

export default {
  components: {
    Loading,
    ProductGrid,
    WishlistButton
  },
  setup() {
    const isDarkMode = inject('isDarkMode');
    
    // Reactive references
    const products = ref([]);
    const categories = ref([]);
    const searchQuery = ref('');
    const selectedCategory = ref('');
    const sortOrder = ref('');
    const loading = ref(true);

    // Wishlist management
    const { wishlist, loadWishlist } = useWishlist();
    const { addToCart } = useCart();
    const isLoggedIn = computed(() => !!localStorage.getItem('token'));

    // Fetch products from API
    const fetchProducts = async () => {
      loading.value = true;
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      products.value = data;
      loading.value = false;
    };

    // Fetch categories from API
    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      categories.value = data;
    };

    // Search products - triggers recalculation of computed property
    const searchProducts = () => {
      // Computed property will handle filtering and sorting
    };

    // Computed property for filtered and sorted products
    const filteredProducts = computed(() => {
      let prods = products.value;

      if (selectedCategory.value) {
        prods = prods.filter(product => product.category === selectedCategory.value);
      }
      if (sortOrder.value === 'asc') {
        prods = prods.sort((a, b) => a.price - b.price);
      } else if (sortOrder.value === 'desc') {
        prods = prods.sort((a, b) => b.price - a.price);
      } else if (sortOrder.value === 'default') {
        prods = prods.sort((a, b) => a.id - b.id);
      }

      if (searchQuery.value) {
        prods = prods.filter(product =>
          product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return prods;
    });

    // Lifecycle hook for initial data fetching
    onMounted(() => {
      fetchProducts();
      fetchCategories();
      loadWishlist(); // Ensure wishlist is loaded
    });

    return {
      products,
      categories,
      searchQuery,
      selectedCategory,
      sortOrder,
      loading,
      searchProducts,
      filteredProducts,
      wishlist,
      isLoggedIn,
      addToCart,
      isDarkMode
    };
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
