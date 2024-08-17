<template>
  <main>
    <div v-if="error" class="flex justify-center p-5">
      <Error :message="error" />
    </div>
    <div v-else-if="loading" class="flex justify-center p-5">
      <LoadingState />
    </div>
    <div v-else class="grid m-10 space-y-5">
      <a href="/">
        <button class="bg-gray-500 text-white py-2 px-4 rounded">Back</button>
      </a>
      <div v-if="product" class="flex flex-col items-center bg-white border-2 border-gray-500 p-4">
        <img :src="product.image" :alt="product.title" class="object-contain h-48 mt-3 mb-3" />
        <h1 class="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600">{{ product.title }}</h1>
        <p class="mt-2 text-center text-gray-700 mb-3">{{ product.description }}</p>
        <h2 class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug mb-3">$ {{ product.price }}</h2>
        <div class="justify-start flex-1 mt-2 mb-3">
          <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{{ product.category }}</span>
        </div>
        <p class="mt-2 text-gray-700 mb-3">⭐ {{ product.rating?.rate }}</p>
        <p class="mt-1 text-gray-700 mb-3">Reviews: {{ product.rating?.count }}</p>
        <button 
          @click="toggleComparison" 
          class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          :disabled="isComparisonFull && !isInComparison(product.id)"
        >
          {{ isInComparison(product.id) ? 'Remove from Comparison' : 'Add to Comparison' }}
        </button>
        <button 
          @click="addToCart(product)" 
          class="mt-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useCart } from '../composables/useCart';
import { useComparison } from '../composables/useComparison';

export default {
  name: 'ProductDetail',
  
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },

  setup(props) {
    const product = ref({});
    const error = ref(null);
    const loading = ref(false);

    const { addToCart } = useCart();
    const { addToComparison, removeFromComparison, isInComparison, getComparisonList } = useComparison();

    const isComparisonFull = computed(() => getComparisonList.value.length >= 4);

    const getProductDetails = async (productId) => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return { response: data, error: null };
      } catch (err) {
        return { response: null, error: err.message };
      }
    };

    const toggleComparison = () => {
      if (isInComparison(product.value.id)) {
        removeFromComparison(product.value.id);
      } else if (getComparisonList.value.length < 4) {
        addToComparison(product.value);
      }
    };

    onMounted(async () => {
      loading.value = true;
      const { response, error: fetchError } = await getProductDetails(props.id);
      if (fetchError) {
        error.value = fetchError;
      } else {
        product.value = response;
      }
      loading.value = false;
    });

    return {
      product,
      error,
      loading,
      isInComparison,
      isComparisonFull,
      toggleComparison,
      addToCart
    };
  }
};
</script>