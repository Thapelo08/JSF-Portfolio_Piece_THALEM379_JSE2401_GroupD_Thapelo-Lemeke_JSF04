<template>
  <nav class="fixed w-full bg-pink-600 p-4 text-pink-50 shadow-lg">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link to="/">
        <button class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="../assets/online-shop.png" class="h-8" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
            SwiftCart
          </span>
        </button>
      </router-link>

      <!-- Navigation links for larger screens -->
      <div class="hidden md:flex">
        <a href="/" class="mr-4 hover:underline">wishlist</a>
        <a href="./" class="mr-4 hover:underline">cart</a>
        <a href="./" class="hover:underline" v-if="!isLoggedIn">Login</a>
        <button v-if="isLoggedIn" @click="logout" class="hover:underline">Logout</button>
      </div>

      <!-- Menu toggle button for smaller screens -->
      <button @click="toggleMenu" class="md:hidden text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu for smaller screens -->
    <div v-if="open" class="md:hidden mt-4 bg-pink-500">
      <a href="/" class="block p-2 hover:bg-pink-400">wishlist</a>
      <a href="./" class="block p-2 hover:bg-pink-400">cart</a>
      <a href="./" class="block p-2 hover:bg-pink-400" v-if="!isLoggedIn">Login</a>
      <button v-if="isLoggedIn" @click="logout" class="block p-2 hover:bg-pink-400">Logout</button>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Navbar',
  setup() {
    const open = ref(false);
    const router = useRouter();

    // Check if user is logged in
    const isLoggedIn = computed(() => !!localStorage.getItem('token'));

    const toggleMenu = () => {
      open.value = !open.value;
    };

    const logout = () => {
      localStorage.removeItem('token');
      router.push('/');
    };

    return {
      open,
      toggleMenu,
      isLoggedIn,
      logout,
    };
  },
};
</script>
