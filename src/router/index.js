import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductDetails from '../views/ProductDetails.vue';
import Login from '../views/Login.vue';
import ComparisonList from '../views/ComparisonList.vue';
import Wishlist from '../components/Wishlist.vue';
import WishlistButton from '../components/WishlistButton.vue';

/**
 * Array of route definitions for the Vue Router.
 * @constant {Array<Object>} routes
 */
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
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/comparison',
    name: 'Comparison',
    component: ComparisonList,
    meta: { requiresAuth: true },
  },
  {
    path: '/WishlistButton',
    name: 'WishlistButton',
    component: WishlistButton,
    meta: { requiresAuth: true },
  },
];

/**
 * Vue Router instance configured with the history mode and routes.
 * @constant {Object} router
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/**
 * Global navigation guard to check authentication before navigating to protected routes.
 * Redirects to the login page if the user is not authenticated and tries to access a protected route.
 * @function
 * @param {Object} to - The target Route Object being navigated to.
 * @param {Object} from - The current Route Object being navigated away from.
 * @param {Function} next - A function that must be called to resolve the hook.
 */
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
