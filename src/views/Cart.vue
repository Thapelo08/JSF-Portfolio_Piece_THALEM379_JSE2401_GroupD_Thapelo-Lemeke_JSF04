<template>
  <div class="cart-container">
    <h2>Your Shopping Cart</h2>
    <div v-if="userCart.length === 0">
      Your cart is empty.
    </div>
    <div v-else>
      <ul>
        <li v-for="item in userCart" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.title" class="cart-item-image">
          <div class="cart-item-details">
            <h3>{{ item.title }}</h3>
            <p>Price: ${{ item.price }}</p>
            <div class="quantity-control">
              <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>
            <button @click="removeFromCart(item.id)">Remove</button>
          </div>
        </li>
      </ul>
      <div class="cart-summary">
        <p>Total Items: {{ cartItemCount }}</p>
        <p>Total Cost: ${{ cartTotal }}</p>
        <button @click="clearCart">Clear Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useCart } from '../composables/useCart';

/**
* Cart component displays the user's shopping cart with item details, quantity controls, and summary.
* @component
*/
export default {
name: 'Cart',
setup() {
  const { getUserCart, updateQuantity, removeFromCart, clearCart, getCartItemCount, getCartTotal } = useCart();

  /**
   * Computed property for the user's cart items.
   * @type {import('vue').ComputedRef<Array<Object>>}
   */
  const userCart = computed(() => getUserCart());

  /**
   * Computed property for the total count of items in the cart.
   * @type {import('vue').ComputedRef<number>}
   */
  const cartItemCount = computed(() => getCartItemCount());

  /**
   * Computed property for the total cost of items in the cart.
   * @type {import('vue').ComputedRef<string>}
   */
  const cartTotal = computed(() => getCartTotal());

  return {
    userCart,
    cartItemCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart
  };
}
}
</script>

<style scoped>
/**
* Styles for the cart component.
*/
.cart-container {
max-width: 800px;
margin: 0 auto;
padding: 20px;
}

.cart-item {
display: flex;
margin-bottom: 20px;
border-bottom: 1px solid #ccc;
padding-bottom: 20px;
}

.cart-item-image {
width: 100px;
height: 100px;
object-fit: contain;
margin-right: 20px;
}

.cart-item-details {
flex-grow: 1;
}

.quantity-control {
display: flex;
align-items: center;
margin-top: 10px;
}

.quantity-control button {
padding: 5px 10px;
margin: 0 5px;
}

.cart-summary {
margin-top: 20px;
text-align: right;
}
</style>
