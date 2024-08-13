// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
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
    meta: { requiresAuth: true },
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/wihslist',
    name: 'wishlist',
    component: () => import('../views/wishlist.vue'), 
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue'),
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;