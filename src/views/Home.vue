<template>
  <div class="container mx-auto p-6">
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

/**
 * ProductList component for displaying and managing a list of products with search, filter, and sort functionalities.
 * @component
 */
export default {
  components: {
    Loading,
    ProductGrid,
    WishlistButton
  },
  setup() {
    /**
     * Reactive reference for the list of products.
     * @type {import('vue').Ref<Array<Object>>}
     */
    const products = ref([]);

    /**
     * Reactive reference for the list of categories.
     * @type {import('vue').Ref<Array<string>>}
     */
    const categories = ref([]);

    /**
     * Reactive reference for the search query.
     * @type {import('vue').Ref<string>}
     */
    const searchQuery = ref('');

    /**
     * Reactive reference for the selected category.
     * @type {import('vue').Ref<string>}
     */
    const selectedCategory = ref('');

    /**
     * Reactive reference for the sort order.
     * @type {import('vue').Ref<string>}
     */
    const sortOrder = ref('');

    /**
     * Reactive reference for the loading state.
     * @type {import('vue').Ref<boolean>}
     */
    const loading = ref(true);

    /**
     * Injected reference for dark mode state.
     * @type {import('vue').Inject}
     */
    const isDarkMode = inject('isDarkMode');

    /**
     * Provides wishlist management functions and data.
     * @type {object}
     * @property {import('vue').Ref<Array<Object>>} wishlist - Reactive reference to the wishlist.
     * @property {Function} loadWishlist - Function to load the wishlist from localStorage.
     */
    const { wishlist, loadWishlist } = useWishlist();

    /**
     * Provides cart management functions.
     * @type {object}
     * @property {Function} addToCart - Function to add a product to the cart.
     */
    const { addToCart } = useCart();

    /**
     * Computed property to determine if the user is logged in.
     * @type {import('vue').ComputedRef<boolean>}
     */
    const isLoggedIn = computed(() => !!localStorage.getItem('token'));

    /**
     * Fetches the list of products from the API and updates the `products` reference.
     * @async
     */
    const fetchProducts = async () => {
      loading.value = true;
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      products.value = data;
      loading.value = false;
    };

    /**
     * Fetches the list of categories from the API and updates the `categories` reference.
     * @async
     */
    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      categories.value = data;
    };

    /**
     * Triggers a recalculation of the filtered and sorted product list.
     * This function is bound to the search button.
     */
    const searchProducts = () => {
      // The `filteredProducts` computed property will handle filtering and sorting.
    };

    /**
     * Computed property for the filtered and sorted list of products based on user input.
     * @type {import('vue').ComputedRef<Array<Object>>}
     */
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

    /**
     * Lifecycle hook that triggers data fetching for products, categories, and wishlist when the component is mounted.
     */
    onMounted(() => {
      fetchProducts();
      fetchCategories();
      loadWishlist(); // Ensure the wishlist is loaded
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
