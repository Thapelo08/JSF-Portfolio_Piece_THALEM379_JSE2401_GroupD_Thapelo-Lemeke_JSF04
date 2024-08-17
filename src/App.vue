<template>
  <div>
    <Navbar :cartItemCount="cartItemCount" />
    <div v-if="isLoggedIn" class="logout-container">
      <button @click="logout">Logout</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from './composables/useCart';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  setup() {
    const isLoggedIn = ref(false);
    const router = useRouter();
    const { getCartItemCount } = useCart();

    const checkLoginStatus = () => {
      isLoggedIn.value = !!localStorage.getItem('token');
    };

    const logout = () => {
      localStorage.removeItem('token');
      isLoggedIn.value = false;
      router.push('/login');
    };

    const cartItemCount = computed(() => getCartItemCount());

    onMounted(() => {
      checkLoginStatus();
    });

    return {
      isLoggedIn,
      logout,
      cartItemCount
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
</style>