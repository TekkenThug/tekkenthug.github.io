<template>
  <div class="layout">
    <h2 class="layout__title">{{ title }}</h2>
    <h3 class="layout__subtitle">{{ subtitle }}</h3>

    <ControlUsers @titling="handlerTitle" />
  </div>
</template>

<script>
import ControlUsers from "./ControlUsers";

export default {
  name: "MainLayout",
  components: { ControlUsers },
  data() {
    return {
      /**
       *  @property {string} page.title - Заголовок текущей страницы
       *  @property {string} page.subtitle - Подзаголовок текущей страницы
       */
      title: "",
      subtitle: ""
    }
  },
  methods: {
    /**
     * Прописываем заголовки
     *
     * @param {object} obj - Объект с заголовками
     */
    handlerTitle(obj) {
      this.title = obj.title;
      this.subtitle = obj.subtitle
    }
  }
}
</script>

<style scoped>
  .layout {
    padding: 30px 38px;
    flex-grow: 1;
    height: 100vh;
    overflow-y: auto;
  }
  .layout__title {
    font-size: 14px;
    margin-bottom: 15px;
    color: #87898f;
  }
  .layout__subtitle {
    font-size: 16px;
    font-weight: 600;
    color: #d5d6dc;
    margin-bottom: 15px;
  }

  @media (max-width: 768px) {
    .layout {
      padding: 30px 15px;
    }
  }
</style>