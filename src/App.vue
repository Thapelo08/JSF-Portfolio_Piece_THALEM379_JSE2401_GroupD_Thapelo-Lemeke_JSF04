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
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  setup() {
    const isLoggedIn = ref(false);
    const router = useRouter();
    const { getCartItemCount } = useCart();
    const { getComparisonList, loadComparisonList } = useComparison();
    const isDarkMode = ref(false);

    const checkLoginStatus = () => {
      isLoggedIn.value = !!localStorage.getItem('token');
    };

    const logout = () => {
      localStorage.removeItem('token');
      isLoggedIn.value = false;
      router.push('/login');
    };

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
    };

    const cartItemCount = computed(() => getCartItemCount());
    const comparisonCount = computed(() => getComparisonList.value.length);

    onMounted(() => {
      checkLoginStatus();
      loadComparisonList();
      
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