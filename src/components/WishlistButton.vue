<template>
  <button @click.prevent="toggleWishlist" class="flex items-center space-x-2 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition duration-200">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="{'text-white': !isInWishlist, 'text-red-300': isInWishlist}" class="w-6 h-6" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
    <span>{{ isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist' }}</span>
  </button>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useWishlist } from '../composables/useWishlist';

export default {
  name: 'WishlistButton',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const favorites = ref([]);

    // Initialize favorites from localStorage
    onMounted(() => {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        favorites.value = JSON.parse(storedFavorites);
      }
    });

    // Determine if the product is in the wishlist
    const inWishlist = ref(isInWishlist(props.product.id));

    // Toggle wishlist status
    const toggleWishlist = () => {
      if (inWishlist.value) {
        removeFromWishlist(props.product.id);
        favorites.value = favorites.value.filter(id => id !== props.product.id);
      } else {
        addToWishlist(props.product);
        favorites.value.push(props.product.id);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
      inWishlist.value = !inWishlist.value;
    };

    return {
      toggleWishlist,
      isInWishlist: inWishlist
    };
  }
};
</script>
