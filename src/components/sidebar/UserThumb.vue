<template>
  <div class="wrapper">
    <div class="thumb">
      <img :src="imgPath" alt="user picture">
    </div>
    <h2 class="title">{{ name }}</h2>
    <button @click="showPopup = !showPopup" class="more-btn"></button>
    <transition name="fade">
      <context-menu v-if="showPopup" :links="config.options" class="popup"/>
    </transition>
  </div>
</template>

<script>
/**
 * Миниатюра пользователя
 */
import ContextMenu from "../common/ContextMenu"

export default {
  name: "UserThumb",
  components: { ContextMenu },
  data() {
    return {
      /**
       *  @property {boolean} showPopup - Показ попапа
       */
      showPopup: false,
      config: this.$config.sidebar.userThumb,
    }
  },
  props: {
    /**
     * @property {string} imgPath - Путь до картинки юзера
     * @property {string} name - Имя юзера
     */
    imgPath: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.thumb {
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  overflow: hidden;
}

.thumb img {
  display: block;
  width: 100%;
}

.title {
  font-weight: 500;
}

.more-btn {
  margin-left: auto;
  border: none;
  width: 18px;
  height: 14px;
  background-image: url('/static/images/icons/chevron-down.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  background-color: transparent;
}

.popup {
  width: 100%;
  position: absolute;
  z-index: 5;
  top: calc(100% + 10px);

}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>