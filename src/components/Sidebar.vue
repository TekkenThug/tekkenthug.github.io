<template>
  <div class="sidebar">
      <user-thumb class="sidebar__user-thumb"
                  :img-path="user.avatar"
                  :name="user.name" />

      <div class="sidebar__list">
          <menu-section v-for="(block, index) in sidebar.menuContent"
                        :key="index"
                        :title="block.title"
                        :subtitles="block.subtitles"
                        class="sidebar__item" />
      </div>

    <btn :img="sidebar.componentBtn.icon"
         class="sidebar__component-btn"
         :text="sidebar.componentBtn.text"
         :action="sidebar.componentBtn.action"
    />
  </div>
</template>

<script>
/**
 * Сайдбар
 */
import UserThumb from "./sidebar/UserThumb";
import MenuSection from "./sidebar/MenuSection";
import Btn from "./common/Btn";

export default {
  name: "Sidebar",
  components: { UserThumb, MenuSection, Btn },
  data() {
    return {
      user: this.$config.user,
      sidebar: this.$config.sidebar,
    }
  }
}
</script>

<style scoped>
  .sidebar {
    max-width: 300px;
    width: 100%;
    border-right: 2px solid #1a1c1f;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100vh;
    overflow-y: auto;
  }

  .sidebar__user-thumb {
    margin: 14px 17px;
  }

  .sidebar__list {
    border-top: 2px solid #1a1c1f;
    padding-top: 25px;
    padding-bottom: 50px;
  }

  .sidebar__item + .sidebar__item {
    margin-top: 20px;
  }

  .sidebar__component-btn {
    margin-top: auto;
    color: #87898f;
    font-weight: 500;
    padding: 16px 10px 16px 17px;
    font-size: 12px;
    transition: all 0.3s ease;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
  }
  
  .sidebar__component-btn:hover {
    background-color: #23252a;
  }
</style>