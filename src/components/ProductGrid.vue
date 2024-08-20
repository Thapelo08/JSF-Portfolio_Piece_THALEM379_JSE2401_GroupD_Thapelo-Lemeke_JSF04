<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="product in products"
      :key="product.id"
      class="card-container bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border dark:border-gray-700 p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      <!-- Link to product details page -->
      <router-link :to="`/product/${product.id}`" class="flex justify-center items-center">
        <img :src="product.image" :alt="product.title" class="w-400px h-48 object-cover mb-5 rounded" />
      </router-link>
      <div class="card-content p-4 flex flex-col flex-grow">
        <!-- Product title -->
        <h3 class="text-lg font-bold mb-2 dark:text-white">{{ product.title }}</h3>
        <!-- Product price -->
        <p class="text-gray-700 dark:text-gray-300 mb-2">${{ product.price }}</p>
        <!-- Product category -->
        <p class="text-gray-500 dark:text-gray-400">{{ product.category }}</p>
        <!-- Product rating -->
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)
        </p>
        <div class="mt-auto flex justify-evenly items-center">
          <!-- Wishlist Button -->
          <WishlistButton :productId="product.id" />

          <!-- Add to cart button -->
          <button
            @click="addToCart(product)"
            class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition duration-200"
          >
            Add To Cart +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTheme } from '../composables/useTheme';
import { useCart } from '../composables/useCart';
import WishlistButton from './WishlistButton.vue';

export default {
  components: {
    WishlistButton,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { theme } = useTheme();
    const { addToCart } = useCart();

    return {
      theme,
      addToCart,
    };
  },
};
</script>

<style scoped>
.card-container {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-container img {
  transition: transform 0.3s ease-in-out;
}

.card-container:hover img {
  transform: scale(1.05);
}

.card-container h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.card-container p {
  margin-bottom: 0.25rem;
}
</style>
