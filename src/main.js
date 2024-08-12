/**
 * @fileoverview The entry point for the Vue.js application. This file initializes and mounts the Vue application.
 * @module main
 */

import { createApp } from 'vue'; // Import the createApp function from Vue
import App from './App.vue'; // Import the root App component
import router from './router'; // Import the Vue Router instance

/**
 * Creates and mounts the Vue.js application.
 * - Initializes the application with the root component `App`.
 * - Configures the application to use the router.
 * - Mounts the application to the HTML element with the id 'app'.
 *
 * @function
 * @returns {void}
 */
createApp(App)
  .use(router) // Register the router instance
  .mount('#app'); // Mount the Vue app to the DOM
