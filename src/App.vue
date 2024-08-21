<template>
  <div :class="{ 'dark': isDarkMode }">
    <Navbar 
      :cartItemCount="cartItemCount" 
      :comparisonCount="comparisonCount"
      :isDarkMode="isDarkMode"
      @toggleTheme="toggleTheme"
    />
    <div v-if="isLoggedIn" class="logout-container">
      <router-link to="/comparison" class="mr-4">Comparison ({{ comparisonCount }})</router-link>
      <button @click="logout">Logout</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from './composables/useCart';
import { useComparison } from './composables/useComparison';
import { useWishlist } from './composables/useWishlist';
import Navbar from './components/Navbar.vue';

/**
 * Main App component that manages the overall layout and theme.
 * @component
 */
export default {
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    /**
     * Reactive reference to track the login status of the user.
     * @type {import('vue').Ref<boolean>}
     */
    const isLoggedIn = ref(false);

    /**
     * Reactive reference to track the dark mode theme status.
     * @type {import('vue').Ref<boolean>}
     */
    const isDarkMode = ref(false);

    /**
     * Vue Router instance.
     * @type {import('vue-router').Router}
     */
    const router = useRouter();

    /**
     * Functions for cart management.
     * @type {Object}
     * @property {Function} getCartItemCount - Returns the number of items in the cart.
     */
    const { getCartItemCount } = useCart();

    /**
     * Functions for comparison list management.
     * @type {Object}
     * @property {Function} getComparisonList - Returns the list of compared products.
     * @property {Function} loadComparisonList - Loads the comparison list from storage.
     */
    const { getComparisonList, loadComparisonList } = useComparison();

    /**
     * Functions for wishlist management.
     * @type {Object}
     * @property {Function} loadWishlist - Loads the wishlist from storage.
     */
    const { loadWishlist } = useWishlist();

    /**
     * Checks and updates the login status based on the presence of a token in localStorage.
     */
    const checkLoginStatus = () => {
      isLoggedIn.value = !!localStorage.getItem('token');
    };

    /**
     * Logs out the user by removing the token from localStorage and redirecting to the login page.
     */
    const logout = () => {
      localStorage.removeItem('token');
      isLoggedIn.value = false;
      router.push('/login');
    };

    /**
     * Toggles between light and dark theme and saves the preference to localStorage.
     */
    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
    };

    /**
     * Computed property to get the count of items in the cart.
     * @type {import('vue').ComputedRef<number>}
     */
    const cartItemCount = computed(() => getCartItemCount());

    /**
     * Computed property to get the count of items in the comparison list.
     * @type {import('vue').ComputedRef<number>}
     */
    const comparisonCount = computed(() => getComparisonList.value.length);

    onMounted(() => {
      checkLoginStatus();
      loadComparisonList();
      loadWishlist();

      // Load theme preference from localStorage or use system preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        isDarkMode.value = savedTheme === 'dark';
      } else {
        isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    });

    watch(isDarkMode, (newValue) => {
      document.documentElement.classList.toggle('dark', newValue);
    }, { immediate: true });

    return {
      isLoggedIn,
      logout,
      cartItemCount,
      comparisonCount,
      isDarkMode,
      toggleTheme
    };
  }
};
</script>

<style>
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
}

.dark {
  --bg-color: #1a202c;
  --text-color: #ffffff;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

.logout-container {
  position: absolute;
  top: 10px;
  right: 10px;
}

.mr-4 {
  margin-right: 1rem;
}
</style>
