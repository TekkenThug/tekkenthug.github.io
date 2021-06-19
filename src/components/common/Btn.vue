<template>
  <button @click="$emit('click')" class="btn">
    <span class="btn__icon" v-if="img">
      <img :src="img" alt="">
    </span>
    {{ text }}
  </button>
</template>

<script>
/**
 * Кнопка
 */
export default {
  name: "Btn",
  props: {
    text: {
      type: String,
      default: ""
    },
    img: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
  .btn {
    background-color: transparent;
    color: #fff;
    font-size: 12px;
    padding: 14px 20px 12px 20px;
    border: none;
    transition: all 0.3s ease;
  }

  .btn__icon {
    margin-right: 15px;
  }
</style>