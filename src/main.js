import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'; // Import Tailwind CSS
import { createPinia } from 'pinia'; // Import Pinia for state management

/**
 * Creates and mounts the Vue.js application.
 * - Initializes the application with the root component `App`.
 * - Configures the application to use the router and Pinia for state management.
 * - Mounts the application to the HTML element with the id 'app'.
 *
 * @function
 * @returns {void}
 */
const app = createApp(App);
const pinia = createPinia();

app.use(router); // Register the router instance
app.use(pinia); // Register Pinia for state management

// Provide isDarkMode globally if needed
app.provide('isDarkMode', App.setup().isDarkMode);

app.mount('#app'); // Mount the Vue app to the DOM