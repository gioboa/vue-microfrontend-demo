import VCA, { h } from "@vue/composition-api";
import Vue from "vue";
import App from "./App.vue";

init();

function init() {
  Vue.use(VCA);

  const app = new Vue({
    render: () => h(App),
  });

  app.$mount("#app");
}
