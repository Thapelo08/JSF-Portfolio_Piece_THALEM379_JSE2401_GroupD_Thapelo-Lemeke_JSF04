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
          <a href="./" class="mr-4 hover:underline">
            <svg
              width="32px"
              height="32px"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- SVG content -->
              <path
                d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                stroke="#1C274C"
                stroke-width="1.5"
              />
              <path
                d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                stroke="#1C274C"
                stroke-width="1.5"
              />
              <path
                d="M11 10.8L12.1429 12L15 9"
                stroke="#1C274C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                stroke="#1C274C"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </a>
          <a href="./" class="hover:underline">Login</a>
        </div>
        <!-- Menu toggle button for smaller screens -->
        <button @click="toggleMenu" class="md:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <!-- Mobile menu for smaller screens -->
      <div v-if="open" class="md:hidden mt-4 bg-pink-500">
        <a href="/" class="block p-2 hover:bg-pink-400">wishlist</a>
        <a href="./" class="block p-2 hover:bg-pink-400">cart</a>
        <a href="./" class="block p-2 hover:bg-pink-400">
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- SVG content -->
            <path
              d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
              stroke="#1C274C"
              stroke-width="1.5"
            />
            <path
              d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
              stroke="#1C274C"
              stroke-width="1.5"
            />
            <path
              d="M11 10.8L12.1429 12L15 9"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </a>
        <a href="./" class="block p-2 hover:bg-pink-400">Login</a>
      </div>
    </nav>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  /**
   * @fileoverview The Navbar component provides the navigation bar for the application.
   * It includes links for navigation and a responsive menu that toggles visibility on smaller screens.
   */
  
  export default {
    /**
     * The name of the component.
     * @type {string}
     */
    name: 'Navbar',
  
    setup() {
      /**
       * Reactive state for menu visibility.
       * @type {import('vue').Ref<boolean>}
       */
      const open = ref(false);
  
      /**
       * Toggles the visibility of the mobile menu.
       * @function
       */
      const toggleMenu = () => {
        open.value = !open.value;
      };
  
      return {
        open,
        toggleMenu,
      };
    },
  };
  </script>
  