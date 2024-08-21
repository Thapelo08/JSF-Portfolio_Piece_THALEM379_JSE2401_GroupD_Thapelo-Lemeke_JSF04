<template>
  <main :class="{'dark:bg-gray-900': theme === 'dark'}">
    <div v-if="error" class="flex justify-center p-5">
      <Error :message="error" />
    </div>
    <div v-else-if="loading" class="flex justify-center p-5">
      <LoadingState />
    </div>
    <div v-else class="grid m-10 space-y-5">
      <a href="/">
        <button class="bg-gray-500 dark:bg-gray-700 text-white py-2 px-4 rounded">Back</button>
      </a>
      <div v-if="product" class="flex flex-col items-center bg-white dark:bg-gray-800 border-2 border-gray-500 dark:border-gray-600 p-4">
        <img :src="product.image" :alt="product.title" class="object-contain h-48 mt-3 mb-3" />
        <h1 class="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600 dark:text-slate-300">{{ product.title }}</h1>
        <p class="mt-2 text-center text-gray-700 dark:text-gray-300 mb-3">{{ product.description }}</p>
        <h2 class="text-base line-clamp-2 font-extrabold text-slate-500 dark:text-slate-400 leading-snug mb-3">$ {{ product.price }}</h2>
        <div class="justify-start flex-1 mt-2 mb-3">
          <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{{ product.category }}</span>
        </div>
        <p class="mt-2 text-gray-700 dark:text-gray-300 mb-3">⭐ {{ product.rating?.rate }}</p>
        <p class="mt-1 text-gray-700 dark:text-gray-300 mb-3">Reviews: {{ product.rating?.count }}</p>
        
        <!-- User Rating and Review Section -->
        <div v-if="isLoggedIn" class="mt-6 w-full">
          <h3 class="text-xl font-bold mb-2">Leave a Review</h3>
          <div class="flex items-center mb-2">
            <span class="mr-2">Your Rating:</span>
            <div>
              <span v-for="star in 5" :key="star" @click="setUserRating(star)" class="cursor-pointer text-2xl">
                {{ star <= userRating ? '★' : '☆' }}
              </span>
            </div>
          </div>
          <textarea v-model="userReview" class="w-full p-2 border rounded" placeholder="Write your review here..."></textarea>
          <button @click="submitReview" class="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Submit Review
          </button>
        </div>

        <!-- Display Reviews -->
        <div class="mt-6 w-full">
          <h3 class="text-xl font-bold mb-2">Customer Reviews</h3>
          <div class="mb-2">
            <select v-model="sortBy" class="p-2 border rounded">
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
          <div v-for="review in sortedReviews" :key="review.id" class="border-b py-2">
            <div class="flex justify-between">
              <span>{{ review.userName }}</span>
              <span>{{ formatDate(review.timestamp) }}</span>
            </div>
            <div>Rating: {{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</div>
            <p>{{ review.comment }}</p>
            <div v-if="isLoggedIn && review.userId === currentUserId">
              <button @click="editReview(review)" class="text-blue-500">Edit</button>
              <button @click="deleteReview(review.id)" class="text-red-500 ml-2">Delete</button>
            </div>
          </div>
        </div>

        <button 
          @click="toggleComparison" 
          class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          :disabled="isComparisonFull && !isInComparison(product.id)"
        >
          {{ isInComparison(product.id) ? 'Remove from Comparison' : 'Add to Comparison' }}
        </button>
        <button 
          @click="addToCart(product)" 
          class="mt-3 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          Add to Cart +
        </button>
      </div>

      <!-- Notification component -->
      <div v-if="notification" class="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded">
        {{ notification }}
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import Loading from '../components/Loading.vue';
import { useCart } from '../composables/useCart';
import { useComparison } from '../composables/useComparison';
import { useTheme } from '../composables/useTheme';

/**
 * ProductDetail component for displaying detailed information about a product.
 * @component
 */
export default {
  components: {
    Loading,
  },
  name: 'ProductDetail',
  
  props: {
    /**
     * The ID of the product to display.
     * @type {string | number}
     * @required
     */
    id: {
      type: [String, Number],
      required: true
    }
  },

  setup(props) {
    /**
     * Reactive reference for product details.
     * @type {import('vue').Ref<object>}
     */
    const product = ref({});

    /**
     * Reactive reference for error message.
     * @type {import('vue').Ref<string | null>}
     */
    const error = ref(null);

    /**
     * Reactive reference for loading state.
     * @type {import('vue').Ref<boolean>}
     */
    const loading = ref(true);

    /**
     * Function to add a product to the cart.
     * @type {Function}
     */
    const { addToCart } = useCart();

    /**
     * Functions and state for managing product comparisons.
     * @type {Object}
     * @property {Function} addToComparison - Adds a product to the comparison list.
     * @property {Function} removeFromComparison - Removes a product from the comparison list.
     * @property {Function} isInComparison - Checks if a product is in the comparison list.
     * @property {Function} getComparisonList - Retrieves the comparison list.
     */
    const { addToComparison, removeFromComparison, isInComparison, getComparisonList } = useComparison();

    /**
     * Function and state for managing theme.
     * @type {Object}
     * @property {string} theme - Current theme of the application.
     */
    const { theme } = useTheme();

    /**
     * Computed property to check if the comparison list is full.
     * @type {import('vue').ComputedRef<boolean>}
     */
    const isComparisonFull = computed(() => getComparisonList.value.length >= 4);

    /**
     * Reactive reference for user rating.
     * @type {import('vue').Ref<number>}
     */
    const userRating = ref(0);

    /**
     * Reactive reference for user review text.
     * @type {import('vue').Ref<string>}
     */
    const userReview = ref('');

    /**
     * Reactive reference for list of reviews.
     * @type {import('vue').Ref<Array<object>>}
     */
    const reviews = ref([]);

    /**
     * Reactive reference for sorting reviews.
     * @type {import('vue').Ref<string>}
     */
    const sortBy = ref('date');

    /**
     * Reactive reference for notification message.
     * @type {import('vue').Ref<string>}
     */
    const notification = ref('');

    /**
     * Reactive reference for user login status.
     * @type {import('vue').Ref<boolean>}
     */
    const isLoggedIn = ref(true); // This should be dynamically set based on your auth logic

    /**
     * Reactive reference for current user's ID.
     * @type {import('vue').Ref<string>}
     */
    const currentUserId = ref('user123'); // This should be dynamically set to the current user's ID

    /**
     * Sets the user's rating for the product.
     * @param {number} rating - The rating value (1-5 stars).
     */
    const setUserRating = (rating) => {
      userRating.value = rating;
    };

    /**
     * Submits the user's review for the product.
     */
    const submitReview = () => {
      if (userRating.value === 0 || userReview.value.trim() === '') {
        showNotification('Please provide both a rating and a review.');
        return;
      }

      const newReview = {
        id: Date.now(),
        userId: currentUserId.value,
        userName: 'John Doe', // Replace with actual user name
        productId: props.id,
        rating: userRating.value,
        comment: userReview.value,
        timestamp: new Date().toISOString()
      };

      reviews.value.push(newReview);
      saveReviewsToLocalStorage();
      userRating.value = 0;
      userReview.value = '';
      showNotification('Your review has been submitted successfully!');
    };

    /**
     * Edits an existing review.
     * @param {object} review - The review to edit.
     */
    const editReview = (review) => {
      userRating.value = review.rating;
      userReview.value = review.comment;
      deleteReview(review.id);
    };

    /**
     * Deletes a review by ID.
     * @param {number} reviewId - The ID of the review to delete.
     */
    const deleteReview = (reviewId) => {
      reviews.value = reviews.value.filter(review => review.id !== reviewId);
      saveReviewsToLocalStorage();
      showNotification('Your review has been deleted.');
    };

    /**
     * Saves reviews to local storage.
     */
    const saveReviewsToLocalStorage = () => {
      localStorage.setItem(`reviews_${props.id}`, JSON.stringify(reviews.value));
    };

    /**
     * Loads reviews from local storage.
     */
    const loadReviewsFromLocalStorage = () => {
      const storedReviews = localStorage.getItem(`reviews_${props.id}`);
      if (storedReviews) {
        reviews.value = JSON.parse(storedReviews);
      }
    };

    /**
     * Shows a notification message.
     * @param {string} message - The message to display.
     */
    const showNotification = (message) => {
      notification.value = message;
      setTimeout(() => {
        notification.value = '';
      }, 3000);
    };

    /**
     * Formats a date string into a more readable format.
     * @param {string} dateString - The date string to format.
     * @returns {string} The formatted date string.
     */
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    /**
     * Computes and sorts the reviews based on the selected sort criteria.
     * @type {import('vue').ComputedRef<Array<object>>}
     */
    const sortedReviews = computed(() => {
      return [...reviews.value].sort((a, b) => {
        if (sortBy.value === 'date') {
          return new Date(b.timestamp) - new Date(a.timestamp);
        } else {
          return b.rating - a.rating;
        }
      });
    });

    /**
     * Fetches product details from the API.
     * @param {string | number} productId - The ID of the product to fetch.
     * @returns {Promise<{response: object, error: string | null}>} The API response or error.
     */
    const getProductDetails = async (productId) => {
      loading.value = true;
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

    /**
     * Toggles the product's presence in the comparison list.
     */
    const toggleComparison = () => {
      if (isInComparison(product.value.id)) {
        removeFromComparison(product.value.id);
      } else if (getComparisonList.value.length < 4) {
        addToComparison(product.value);
      }
    };

    onMounted(async () => {
      loading.value = false;
      const { response, error: fetchError } = await getProductDetails(props.id);
      if (fetchError) {
        error.value = fetchError;
      } else {
        product.value = response;
        loadReviewsFromLocalStorage(); // Load reviews after product details are fetched
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
      addToCart,
      theme,
      userRating,
      userReview,
      reviews,
      sortBy,
      notification,
      isLoggedIn,
      currentUserId,
      setUserRating,
      submitReview,
      editReview,
      deleteReview,
      formatDate,
      sortedReviews
    };
  }
};
</script>
