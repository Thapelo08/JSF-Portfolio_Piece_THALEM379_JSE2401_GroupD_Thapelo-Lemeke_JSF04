import { ref, computed } from 'vue';

const comparisonList = ref([]);

/**
 * Composable function to manage the comparison list of products.
 * @module useComparison
 * @returns {Object} - The comparison list management methods and reactive state.
 */
export function useComparison() {
  /**
   * Adds a product to the comparison list if the list has fewer than 4 items and the product is not already in the list.
   * Updates localStorage with the new comparison list.
   * @function addToComparison
   * @param {Object} product - The product object to add to the comparison list.
   */
  const addToComparison = (product) => {
    if (comparisonList.value.length < 4 && !isInComparison(product.id)) {
      comparisonList.value.push(product);
      localStorage.setItem('comparisonList', JSON.stringify(comparisonList.value));
    }
  };

  /**
   * Removes a product from the comparison list by its ID.
   * Updates localStorage with the updated comparison list.
   * @function removeFromComparison
   * @param {string} productId - The ID of the product to remove from the comparison list.
   */
  const removeFromComparison = (productId) => {
    comparisonList.value = comparisonList.value.filter(item => item.id !== productId);
    localStorage.setItem('comparisonList', JSON.stringify(comparisonList.value));
  };

  /**
   * Clears the entire comparison list and removes it from localStorage.
   * @function clearComparison
   */
  const clearComparison = () => {
    comparisonList.value = [];
    localStorage.removeItem('comparisonList');
  };

  /**
   * Checks if a product is already in the comparison list.
   * @function isInComparison
   * @param {string} productId - The ID of the product to check.
   * @returns {boolean} - True if the product is in the comparison list, false otherwise.
   */
  const isInComparison = (productId) => {
    return comparisonList.value.some(item => item.id === productId);
  };

  /**
   * Computed property that returns the current comparison list.
   * @function getComparisonList
   * @returns {Array<Object>} - The list of products currently in the comparison list.
   */
  const getComparisonList = computed(() => comparisonList.value);

  /**
   * Computed property that returns the number of products in the comparison list.
   * @function comparisonCount
   * @returns {number} - The number of products in the comparison list.
   */
  const comparisonCount = computed(() => comparisonList.value.length);

  /**
   * Loads the comparison list from localStorage if available.
   * @function loadComparisonList
   */
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
