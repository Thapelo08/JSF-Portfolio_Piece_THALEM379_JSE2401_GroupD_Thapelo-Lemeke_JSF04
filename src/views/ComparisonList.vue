<template>
  <div class="comparison-list p-4">
    <h1 class="text-2xl font-bold mb-4">Product Comparison</h1>
    <div v-if="comparisonItemCount === 0" class="text-center text-gray-500">
      No products added to comparison yet.
    </div>
    <div v-else>
      <p class="mb-4">Total Items: {{ comparisonItemCount }}</p>
      <button @click="clearComparison" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4">
        Clear Comparison
      </button>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2">Specification</th>
              <th v-for="product in comparisonList" :key="product.id" class="border border-gray-300 p-2">
                {{ product.title }}
                <button @click="removeFromComparison(product.id)" class="ml-2 text-red-500 hover:text-red-700">
                  Remove
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 p-2 font-bold">Image</td>
              <td v-for="product in comparisonList" :key="product.id" class="border border-gray-300 p-2">
                <img :src="product.image" :alt="product.title" class="w-32 h-32 object-contain mx-auto" />
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-bold">Description</td>
              <td v-for="product in comparisonList" :key="product.id" class="border border-gray-300 p-2">
                {{ product.description }}
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-bold">Price</td>
              <td v-for="product in comparisonList" :key="product.id" class="border border-gray-300 p-2">
                ${{ product.price }}
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2 font-bold">Rating</td>
              <td v-for="product in comparisonList" :key="product.id" class="border border-gray-300 p-2">
                {{ product.rating.rate }} ({{ product.rating.count }} reviews)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useComparison } from '../composables/useComparison';

export default {
  name: 'ComparisonList',
  setup() {
    const { getComparisonList, comparisonCount, removeFromComparison, clearComparison, loadComparisonList } = useComparison();

    // Access the value of the computed property
    const comparisonList = computed(() => getComparisonList.value);
    const comparisonItemCount = computed(() => comparisonCount.value);

    onMounted(() => {
      loadComparisonList();
    });

    return {
      comparisonList,
      comparisonItemCount,
      removeFromComparison,
      clearComparison,
    };
  },
};
</script>
