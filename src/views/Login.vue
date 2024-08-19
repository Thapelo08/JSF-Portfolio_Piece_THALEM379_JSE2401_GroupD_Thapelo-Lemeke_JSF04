<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div mb-4>
        <label for="username" class="block text-gray-500 text-sm font-bold">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
        />
      </div>
      <div>
        <label for="password" class="block text-gray-500 text-sm font-bold">Password:</label>
        <div class="password-input">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            required
          />
          <button type="button" @click="togglePassword">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>
      <button type="submit" :disabled="isLoading || !isFormValid">Login</button>
      <p v-if="isLoading" class="loading">Authenticating...</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const isLoading = ref(false);
    const showPassword = ref(false);
    const router = useRouter();

    const isFormValid = computed(() => username.value.trim() && password.value.trim());

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const login = async () => {
  if (!isFormValid.value) return;

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const response = await fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid username or password');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      const redirectPath = router.currentRoute.value.query.redirect || '/';
      router.push(redirectPath);
    } else {
      throw new Error('No token received');
    }
  } catch (error) {
    console.error('Login error:', error);
    errorMessage.value = error.message || 'An unexpected error occurred';
  } finally {
    isLoading.value = false;
  }
};

    return {
      username,
      password,
      errorMessage,
      isLoading,
      showPassword,
      isFormValid,
      login,
      togglePassword,
    };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 0 auto;
}

.error {
  color: red;
}

.loading {
  color: blue;
}

.password-input {
  display: flex;
}

.password-input input {
  flex-grow: 1;
}
</style>