<template>
  <div class="container mx-auto p-6">
    <!-- Filters and sorting controls -->
    <div class="mt-20 flex justify-between items-center flex-wrap mb-4">
      <!-- Category selection dropdown -->
      <select v-model="selectedCategory" class="border p-2 rounded mb-2 sm:mb-0">
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
        />
        <button
          @click="searchProducts"
          class="bg-white text-black border border-l-0 p-2 rounded-r"
        >
          Search
        </button>
      </div>

      <!-- Sorting dropdown -->
      <select v-model="sortOrder" class="border p-2 rounded">
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
import { ref, onMounted, computed } from 'vue';
import Loading from '../components/Loading.vue';
import ProductGrid from '../components/ProductGrid.vue';

/**
 * @fileoverview This component fetches and displays a list of products with options for filtering, searching, and sorting.
 */

export default {
  components: {
    Loading,
    ProductGrid
  },

  setup() {
    /**
     * Reactive reference to the list of products.
     * @type {import('vue').Ref<Array<Product>>}
     */
    const products = ref([]);

    /**
     * Reactive reference to the list of product categories.
     * @type {import('vue').Ref<Array<string>>}
     */
    const categories = ref([]);

    /**
     * Reactive reference to the search query input value.
     * @type {import('vue').Ref<string>}
     */
    const searchQuery = ref('');

    /**
     * Reactive reference to the selected category filter value.
     * @type {import('vue').Ref<string>}
     */
    const selectedCategory = ref('');

    /**
     * Reactive reference to the sorting order value.
     * @type {import('vue').Ref<string>}
     */
    const sortOrder = ref('');

    /**
     * Reactive reference to the loading state.
     * @type {import('vue').Ref<boolean>}
     */
    const loading = ref(true);

    /**
     * Fetches the list of products from the API and updates the products ref.
     * Sets the loading state to false once data is loaded.
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
     * Fetches the list of product categories from the API and updates the categories ref.
     * @async
     */
    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      categories.value = data;
    };

    /**
     * Triggered when the search button is clicked.
     * This function does not perform any additional actions as the filtering is handled by the computed property.
     */
    const searchProducts = () => {
      // This will trigger the computed property to recalculate
    };

    /**
     * Computed property that returns the filtered and sorted list of products based on
     * selected category, search query, and sorting order.
     * @returns {Array<Product>} The filtered and sorted list of products.
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
     * Lifecycle hook that runs when the component is mounted.
     * It fetches the products and categories data.
     */
    onMounted(() => {
      fetchProducts();
      fetchCategories();
    });

    return {
      products,
      categories,
      searchQuery,
      selectedCategory,
      sortOrder,
      loading,
      searchProducts,
      filteredProducts
    };
  }
};
</script>
