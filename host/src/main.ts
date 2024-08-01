import { createPinia } from "pinia";
import { state } from "shared";
import { createApp } from "vue";
import "./stores/counter";

state.message = "Hello from host!";

import("./App.vue").then((App) => {
  const app = createApp(App.default);
  app.use(createPinia());
  app.mount("#app");
});
