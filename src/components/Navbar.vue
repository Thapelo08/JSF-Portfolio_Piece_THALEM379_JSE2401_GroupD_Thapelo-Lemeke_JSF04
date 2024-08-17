<template>
  <nav class="fixed w-full p-4 shadow-lg sticky top-0 z-50" :class="{ 'bg-pink-600 text-pink-50': !isDarkMode, 'bg-gray-800 text-gray-100': isDarkMode }">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link to="/">
        <button class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="../assets/online-shop.png" class="h-8" alt="SwiftCart Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap">
            SwiftCart
          </span>
        </button>
      </router-link>

      <!-- Navigation links for larger screens -->
      <div class="hidden md:flex items-center">
        <router-link to="/comparison" class="mr-4 hover:underline">Comparison</router-link>
        <router-link to="/wishlist" class="mr-4 hover:underline">Wishlist</router-link>
        <router-link to="/cart" class="mr-4 hover:underline" v-if="isLoggedIn">
          Cart ({{ cartItemCount }})
        </router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="hover:underline" @click="toggleMenu">Login</router-link>
        <button v-else @click="logout" class="hover:underline">Logout</button>
      </div>

      <!-- Theme toggle button -->
      <button @click="$emit('toggleTheme')" class="ml-4">
        <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>

      <!-- Menu toggle button for smaller screens -->
      <button @click="toggleMenu" class="md:hidden text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu for smaller screens -->
    <div v-if="open" class="md:hidden mt-4" :class="{ 'bg-pink-500': !isDarkMode, 'bg-gray-700': isDarkMode }">
      <router-link to="/comparison" class="block p-2 hover:bg-pink-400" :class="{ 'hover:bg-pink-400': !isDarkMode, 'hover:bg-gray-600': isDarkMode }">Comparison</router-link>
      <router-link to="/wishlist" class="block p-2 hover:bg-pink-400" :class="{ 'hover:bg-pink-400': !isDarkMode, 'hover:bg-gray-600': isDarkMode }">Wishlist</router-link>
      <router-link to="/cart" class="block p-2 hover:bg-pink-400" :class="{ 'hover:bg-pink-400': !isDarkMode, 'hover:bg-gray-600': isDarkMode }" v-if="isLoggedIn">
        Cart ({{ cartItemCount }})
      </router-link>
      <router-link v-if="!isLoggedIn" to="/login" class="block p-2 hover:bg-pink-400" :class="{ 'hover:bg-pink-400': !isDarkMode, 'hover:bg-gray-600': isDarkMode }" @click="toggleMenu">Login</router-link>
      <button v-else @click="logout" class="block w-full text-left p-2 hover:bg-pink-400" :class="{ 'hover:bg-pink-400': !isDarkMode, 'hover:bg-gray-600': isDarkMode }">Logout</button>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';

export default {
  name: 'Navbar',
  props: {
    cartItemCount: {
      type: Number,
      required: true
    },
    isDarkMode: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const open = ref(false);
    const router = useRouter();
    const { getCartItemCount } = useCart();

    // Check if user is logged in
    const isLoggedIn = computed(() => !!localStorage.getItem('token'));

    const toggleMenu = () => {
      open.value = !open.value;
    };

    const logout = () => {
      localStorage.removeItem('token');
      router.push('/login');
    };

    return {
      open,
      toggleMenu,
      isLoggedIn,
      logout,
      cartItemCount: computed(() => getCartItemCount())
    };
  }
};
</script>
