<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Comparison List</h1>
    
    <div v-if="comparisonList.length === 0" class="text-gray-500">
      No products added for comparison.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in comparisonList" :key="product.id" class="bg-white shadow-md rounded-lg overflow-hidden border p-4">
        <img :src="product.image" :alt="product.title" class="w-full h-48 object-cover mb-5" />
        <h3 class="text-lg font-bold mb-2">{{ product.title }}</h3>
        <p class="text-gray-700 mb-2">${{ product.price }}</p>
        <p class="text-gray-500 mb-2">{{ product.category }}</p>
        <p class="text-gray-700 mb-4">Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)</p>
        <button @click="removeFromComparison(product.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'ComparisonList',
  setup() {
    const comparisonList = ref([]);

    onMounted(() => {
      const storedComparisonList = localStorage.getItem('comparisonList');
      if (storedComparisonList) {
        comparisonList.value = JSON.parse(storedComparisonList);
      }
    });

    const removeFromComparison = (productId) => {
      comparisonList.value = comparisonList.value.filter(product => product.id !== productId);
      localStorage.setItem('comparisonList', JSON.stringify(comparisonList.value));
    };

    return {
      comparisonList,
      removeFromComparison
    };
  }
};
</script>