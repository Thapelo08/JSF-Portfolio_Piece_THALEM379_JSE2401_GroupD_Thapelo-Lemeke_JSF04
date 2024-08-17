// src/composables/useTheme.js
import { ref, watch, onMounted } from 'vue';

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  });

  onMounted(() => {
    document.documentElement.classList.toggle('dark', theme.value === 'dark');
  });

  return { theme, toggleTheme };
}