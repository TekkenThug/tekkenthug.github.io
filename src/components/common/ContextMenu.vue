<template>
  <div class="context-menu">
    <ul class="context-menu__list">
      <li v-for="(link, index) in links" :key="index"  @click="link.action ? link.action() : ''">
        <a class="link-btn" href="#">
          <span v-if="link.img" class="link-btn__icon"><img :src="link.img" alt=""></span>
          {{ link.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 *  Контекстное меню с ссылками
 */

export default {
  name: "UserThumbMenu",
  props: {
    /**
     * @property {array} links - Массив с ссылками
     * @property {string} links.img - Путь до иконки
     * @property {string} links.text - Текст в ссылке
     */
    links: []
  }
}
</script>

<style scoped>
  .context-menu {
    border-radius: 5px;
    border: 2px solid #1a1c1f;
    background-color: #17191c;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    color: #74757b;
    font-size: 12px;
    overflow: hidden;
    font-weight: 500;
  }

  .context-menu__list {
    display: flex;
    flex-direction: column;
  }

  .context-menu__list li {
    display: flex;
    padding: 10px;
    transition: all 0.3s ease;
    align-items: center;
  }
  .context-menu__list li:hover {
    background-color: #222428;
    cursor: pointer;
  }

  .link-btn {
    color: inherit;
    display: flex;
    align-items: center;
  }
  .link-btn__icon {
    margin-right: 12px;
    width: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .link-btn__icon img {
    width: 100%;
  }
</style>