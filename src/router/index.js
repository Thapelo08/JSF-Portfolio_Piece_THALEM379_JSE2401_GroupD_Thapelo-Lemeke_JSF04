// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
// import About from '../views/ProductDetails.vue';
import ProductDetails from '../views/ProductDetails.vue';
import Login from '../views/Login.vue';

const routes = [
{
  path: '/login',
  name: 'Login',
component: Login,
},

  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true,
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

