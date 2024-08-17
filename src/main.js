import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'; // Import Tailwind CSS

/**
 * Creates and mounts the Vue.js application.
 * - Initializes the application with the root component `App`.
 * - Configures the application to use the router.
 * - Mounts the application to the HTML element with the id 'app'.
 *
 * @function
 * @returns {void}
 */
const app = createApp(App);

app.use(router); // Register the router instance

// Provide isDarkMode globally if needed
app.provide('isDarkMode', App.setup().isDarkMode);

app.mount('#app'); // Mount the Vue app to the DOM
