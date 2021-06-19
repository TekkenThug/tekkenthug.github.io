<template>
  <div class="search">
    <input :value="searchValue"
           @input="$emit('input', $event.target.value)"
           type="text"
           :placeholder="placeholder">
  </div>
</template>

<script>
/**
 * Поле поиска
 */
export default {
  name: "Search",
  props: {
    /**
     *  @property {string} placeholder - Текст плейсхолдера
     *  @property {string} searchValue - Значение поиска для эмита наверх
     */
    placeholder: {
      type: String,
      default: 'Поиск'
    },
    searchValue: ""
  }
}
</script>

<style scoped>
  .search {
    position: relative;
    max-width: 210px;
    border-radius: 20px;
    border: 2px solid #2c2d32;
  }

  .search input {
    width: 100%;
    padding: 4px 10px 3px 27px;
    font-size: 12px;
    background-color: transparent;
    border: none;
    color: #fff;
  }

  .search::before {
    content: "";
    position: absolute;
    left: 8px;
    top: 50%;
    width: 14px;
    height: 14px;
    transform: translateY(-50%);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    background-image: url('/static/images/icons/search.svg');
  }

</style>