<template>
  <div>
    <!-- Render the Navbar component -->
    <Navbar />

    <!-- Render the content for the current route -->
    <router-view />
  </div>
</template>

<script>
/**
 * @fileoverview This is the main layout component for the application.
 * It includes a Navbar and a router-view for rendering matched components based on the current route.
 */

import Navbar from './components/Navbar.vue';

/**
 * Main layout component for the application.
 * It includes the Navbar component and the router-view.
 *
 * @component
 */
export default {
  components: {
    /** 
     * The Navbar component used for navigation throughout the app.
     * @type {import('./components/Navbar.vue').default}
     */
    Navbar
  }
};
</script>
