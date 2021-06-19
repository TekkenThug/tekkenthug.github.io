<template>
  <div class="app">
    <btn @click.native="sideIsActive = !sideIsActive" class="app__mobile-btn" :img="burgerPath"/>
    <Sidebar class="app__sidebar" :class="{ active: sideIsActive }"/>
    <MainLayout />
  </div>
</template>

<script>
/**
 * @author Vadim I
 * Приложение разделено на две части: Сайдбар и Главный лэйоут,
 * с вьюшками для вывода содержимого
 */
import Sidebar from "./components/Sidebar";
import MainLayout from "./layouts/MainLayout";
import Btn from "./components/common/Btn";


export default {
  name: "App",
  components: {Btn, Sidebar, MainLayout },
  data() {
    return {
      /**
       *  @property {boolean} sideIsActive - Флаг для мобильного сайдбара
       *  @property {string} burgerPath - Иконка для мобильного сайдбара
       */
      sideIsActive: false,
      burgerPath: 'static/images/icons/menu.svg',
    }
  }
}
</script>


<style scoped>
.app {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #17191c;
}

.app__mobile-btn {
  display: none;
}

@media (max-width: 968px) {
  .app__sidebar {
    position: fixed;
    background-color: #1a1c1f;
    z-index: 1000;
    display: none;
  }

  .app__sidebar.active {
    display: flex;
  }

  .app__mobile-btn {
    display: block;
    position: fixed;
    top: 10px;
    right: 0;
    padding: 0;
  }
}
</style>