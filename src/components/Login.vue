<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
          />
        </div>
        <div>
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
          />
        </div>
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'Login',
    setup() {
      const username = ref('');
      const password = ref('');
      const errorMessage = ref('');
  
      const login = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username.value,
              password: password.value,
            }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            if (data.success) {
              // Handle successful login, e.g., save token and redirect
              localStorage.setItem('token', data.token);
              window.location.href = '/home'; // Redirect to a different page
            } else {
              errorMessage.value = 'Invalid credentials';
            }
          } else {
            errorMessage.value = 'An error occurred. Please try again later.';
          }
        } catch (error) {
          console.error('Login error:', error);
          errorMessage.value = 'An error occurred. Please try again later.';
        }
      };
  
      return {
        username,
        password,
        errorMessage,
        login,
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
  </style>
  