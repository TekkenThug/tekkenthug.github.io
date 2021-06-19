<template>
  <div class="users">
    <div class="users__top">
      <span class="users__title">{{ config.subtitle }}</span>
      <search v-model="search" />
    </div>
    <div class="users__table-wrapper">
      <users-table class="users__table"
                   data-type="user"
                   :headers="config.tableData.tableHeaders"
                   :table-data="searchUsers"
                   :context-content="config.tableData.usersAction"
      />
    </div>
    <btn class="users__add" :text="config.btnText" />
  </div>
</template>

<script>
import Search from "../components/common/Search";
import Btn from "../components/common/Btn";
import UsersTable from "../components/Table";

export default {
  name: "ControlUsers",
  components: {UsersTable, Btn, Search},
  data() {
    return {
      /**
       * @property {string} search - Значение для поиска
       */
      search: "",
      config: this.$config.controlUsers,
    }
  },
  computed: {
    /**
     * Фильтрация пользователей по имени
     * @returns {({name: string, id: number, email: string, status: string}|{name: string, id: number, email: string, status: string})[]}
     */
    searchUsers() {
      return this.config.tableData.users.filter(user => (user.name).toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  created() {
    /* Заполнение заголовка в лэйоуте */
    this.$emit('titling', this.config.page)
  }
}
</script>

<style scoped>
.users__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.users__title {
  color: #9d9ea6;
  font-weight: 500;
  font-size: 12px;
}

.users__table {
  margin: 12px 0 20px;
  min-width: 540px;
  /*overflow-y: visible;*/
  overflow-x: auto;
}

.users__table-wrapper {
  height: auto;
}


.users__add {
  background-color: #3680EC;
  color: #fff;
  font-size: 12px;
  padding: 14px 20px 12px 20px;
  border: none;
  border-radius: 15px;
  box-shadow: rgba(54,128,236, 0.2) 0px 7px 29px 0px;
  transition: all 0.3s ease;
}

.users__add:hover {
  background-color: rgba(54,128,236, 0.8);
}

</style>