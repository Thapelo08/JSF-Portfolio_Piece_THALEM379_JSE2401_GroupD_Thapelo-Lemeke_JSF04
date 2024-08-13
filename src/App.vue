<template>
  <div>
    <Navbar />
    <div v-if="isLoggedIn" class="logout-container">
      <button @click="logout">Logout</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  setup() {
    const isLoggedIn = ref(false);
    const router = useRouter();

    const checkLoginStatus = () => {
      isLoggedIn.value = !!localStorage.getItem('token');
    };

    const logout = () => {
      localStorage.removeItem('token');
      isLoggedIn.value = false;
      router.push('/login');
    };

    onMounted(() => {
      checkLoginStatus();
    });

    return {
      isLoggedIn,
      logout
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