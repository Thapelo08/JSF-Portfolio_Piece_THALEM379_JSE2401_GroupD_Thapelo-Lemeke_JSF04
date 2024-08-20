<template>
  <!-- Grid layout to display products -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Iterate over filtered products and render each product card -->
    <div v-for="product in filteredProducts" :key="product.id" class="card-container bg-white shadow-md rounded-lg overflow-hidden border p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <!-- Link to the product detail page -->
      <router-link :to="`/product/${product.id}`" class="flex justify-center items-center">
        <!-- Product image -->
        <img :src="product.image" :alt="product.title" class="w-400px h-48 object-cover mb-5 rounded" />
      </router-link>
      <!-- Product details and actions -->
      <div class="card-content p-4 flex flex-col flex-grow">
        <!-- Product title -->
        <h3 class="text-lg font-bold mb-2">{{ product.title }}</h3>
        <!-- Product price -->
        <p class="text-gray-700 mb-2">${{ product.price }}</p>
        <!-- Product category -->
        <p class="text-gray-500">{{ product.category }}</p>
        <!-- Product rating and review count -->
        <p class="text-gray-700 mb-4">
          Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)
        </p>
        <!-- Actions: WishlistButton and Add to Cart buttons -->
        <div class="mt-auto flex justify-evenly items-center">
          <!-- WishlistButton component -->
          <WishlistButton :product="product" />
          <!-- Add to Cart button -->
          <button @click="addToCart(product)" class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition duration-200">
            Add To Cart +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCart } from '../composables/useCart';
import WishlistButton from './WishlistButton.vue';  // Import the WishlistButton component

export default {
  name: 'ProductList',
  components: {
    WishlistButton  // Register the WishlistButton component
  },
  props: {
    filteredProducts: {
      type: Array,
      required: true
    }
  },
  setup() {
    const { addToCart } = useCart();

    return {
      addToCart
    };
  }
};
</script>
