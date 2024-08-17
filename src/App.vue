<template>
  <div>
    <Navbar :cartItemCount="cartItemCount" :comparisonCount="comparisonCount" />
    <div v-if="isLoggedIn" class="logout-container">
      <router-link to="/comparison" class="mr-4">Comparison ({{ comparisonCount }})</router-link>
      <button @click="logout">Logout</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from './composables/useCart';
import { useComparison } from './composables/useComparison';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  setup() {
    const isLoggedIn = ref(false);
    const router = useRouter();
    const { getCartItemCount } = useCart();
    const { getComparisonList, loadComparisonList } = useComparison();

    const checkLoginStatus = () => {
      isLoggedIn.value = !!localStorage.getItem('token');
    };

    const logout = () => {
      localStorage.removeItem('token');
      isLoggedIn.value = false;
      router.push('/login');
    };

    const cartItemCount = computed(() => getCartItemCount());
    const comparisonCount = computed(() => getComparisonList.value.length);

    onMounted(() => {
      checkLoginStatus();
      loadComparisonList();
    });

    return {
      isLoggedIn,
      logout,
      cartItemCount,
      comparisonCount
    };
  }
};
</script>

<style scoped>
.logout-container {
  position: absolute;
  top: 10px;
  right: 10px;
}
.mr-4 {
  margin-right: 1rem;
}
</style>