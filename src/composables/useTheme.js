import { ref, watch, onMounted } from 'vue';

/**
 * Composable function to manage theme settings (light/dark mode).
 * @module useTheme
 * @returns {Object} - The theme management state and methods.
 */
export function useTheme() {
  /**
   * Reactive reference to the current theme. Defaults to 'light' if not set in localStorage.
   * @type {Ref<string>}
   */
  const theme = ref(localStorage.getItem('theme') || 'light');

  /**
   * Toggles between 'light' and 'dark' themes.
   * Updates localStorage and document's class list accordingly.
   * @function toggleTheme
   */
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  /**
   * Watches for changes to the theme and updates localStorage and the document's class list.
   * Adds 'dark' class to the document element if the theme is 'dark'.
   * @function watch
   * @param {string} newTheme - The new theme value ('light' or 'dark').
   */
  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  });

  /**
   * Sets the initial theme based on the value from localStorage when the component is mounted.
   * Adds 'dark' class to the document element if the initial theme is 'dark'.
   * @function onMounted
   */
  onMounted(() => {
    document.documentElement.classList.toggle('dark', theme.value === 'dark');
  });

  return { theme, toggleTheme };
}
