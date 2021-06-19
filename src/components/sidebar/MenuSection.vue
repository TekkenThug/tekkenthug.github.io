<template>
  <div class="section">
    <h3 v-if="title" class="section__title">{{ title }}</h3>
    <ul class="section__list">
      <li v-for="subtitle in subtitles" :key="subtitle">
        <a href="#">{{ subtitle }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * Секция меню в сайдбаре
 */
export default {
  name: "MenuSection",
  props: {
    /**
     * @property {string} title - Заголовок
     * @property {array} subtitles - Пул подзаголовков
     */
    title: {
      type: String,
      default: ""
    },
    subtitles: []
  }
}
</script>

<style scoped>
  .section {
    font-size: 12px;
  }

  .section__title {
    color: #6d7279;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 10px;
    padding-left: 17px;
  }

  .section__list {
    color: #87898f;
  }

  .section__list li {
    transition: all 0.3s ease;
  }

  .section__list li:hover {
    background-color: #23252a;
  }

  .section__list a {
    color: inherit;
    padding: 10px 0 8px 17px;
    display: block;
  }
</style>