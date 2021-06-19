<template>
  <table class="table">
    <tr>
      <th class="table__header" v-for="(header, index) in headers" :key="index">
        <div class="table__header-icon">
          <img :src="header.path" alt="image">
        </div>
        <span class="table__header-text">{{ header.text }}</span>
      </th>
    </tr>
    <tr v-for="(data, index) in tableData" :key="index">
      <td class="table__data" v-for="(field, name) in data" :key="name">
        {{ field }}
      </td>

      <td class="table__data">
          <button @click="openMenu(index)" class="table__data-more"></button>
          <context-menu v-if="openIndex === index" class="table__data-context" :links="contextContent" />
      </td>
    </tr>
  </table>
</template>

<script>
/**
 * Таблица
 */
import ContextMenu from "./common/ContextMenu";

export default {
  name: "Table",
  components: { ContextMenu },
  data() {
    return {
      /**
       * @property {number} openIndex - Индекс открытого попапа
       */
      openIndex: null
    }
  },
  props: {
    /**
     * @property {array} headers - Заголовки таблицы
     * @property {array} tableData - Данные таблицы
     * @property {array} contextContent - Содержимое контекстного меню
     */
    headers: [],
    tableData: [],
    contextContent: []
  },
  methods: {
    /**
     * Открывает контекстное меню
     * @param index - Индекс попапа
     */
    openMenu(index) {
      if (this.openIndex === index) this.openIndex = null;
      else this.openIndex = index
    }
  },
}
</script>

<style scoped>
  .table {
    width: 100%;
    border-collapse: collapse;
  }

  .table tr:first-child {
    text-align: left;
  }

  .table__header,
  .table__data {
    border: 1px solid #2c2d32;
    padding: 10px 9px;
    position: relative;
  }

  .table__header:first-child,
  .table__data:first-child {
    border-left: none;
    width: 80px;
  }

  .table__header:nth-child(2),
  .table__data:nth-child(2) {
    width: 200px;
  }

  .table__header:last-child,
  .table__data:last-child {
    border-right: none;
    width: 120px;
    text-align: center;
  }

  .table__header-icon {
    width: 15px;
    display: inline-block;
    transform: translateY(3px);
  }

  .table__header-icon img {
    width: 100%;
  }

  .table__header-text {
    color: #67696a;
    font-size: 12px;
  }

  .table__data {
    color: #87898f;
    font-size: 12px;
  }

  .table__data-more {
    border: none;
    background-color: transparent;
    background-image: url('/static/images/icons/more-horizontal.svg');
    background-repeat: no-repeat;
    background-position: center;
    width: 30px;
    height: 15px;
    background-size: 100%;
  }

  .table__data-context {
    position: absolute;
    top: calc(100% - 5px);
    left: -60px;
    width: 190px;
    z-index: 10;
  }

  .table__compete {
    background-color: transparent;
    border: none;
    width: 100%;
    color: #87898f;
  }
</style>