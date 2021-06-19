import Vue from 'vue'
import App from './App'
import config from "./config";

/** Импорт конфига **/
Vue.prototype.$config = config;

export default new Vue({
    el: '#app',
    render: h => h(App),
})


