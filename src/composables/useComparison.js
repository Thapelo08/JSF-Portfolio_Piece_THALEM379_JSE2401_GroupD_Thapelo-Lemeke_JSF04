import { ref, computed } from 'vue';

const comparisonList = ref([]);

export function useComparison() {
  const addToComparison = (product) => {
    if (comparisonList.value.length < 4 && !isInComparison(product.id)) {
      comparisonList.value.push(product);
      localStorage.setItem('comparisonList', JSON.stringify(comparisonList.value));
    }
  };

  const removeFromComparison = (productId) => {
    comparisonList.value = comparisonList.value.filter(item => item.id !== productId);
    localStorage.setItem('comparisonList', JSON.stringify(comparisonList.value));
  };

  const clearComparison = () => {
    comparisonList.value = [];
    localStorage.removeItem('comparisonList');
  };

  const isInComparison = (productId) => {
    return comparisonList.value.some(item => item.id === productId);
  };

  const getComparisonList = computed(() => comparisonList.value);

  const comparisonCount = computed(() => comparisonList.value.length);

  const loadComparisonList = () => {
    const storedList = localStorage.getItem('comparisonList');
    if (storedList) {
      comparisonList.value = JSON.parse(storedList);
    }
  };

  return {
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    getComparisonList,
    comparisonCount,
    loadComparisonList,
  };
}
