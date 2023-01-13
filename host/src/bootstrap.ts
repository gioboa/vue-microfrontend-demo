import { createApp } from "vue";
import App from "./App.vue";
import { state } from "shared";
import "./store";

state.message = "Hello from host!";

createApp(App).mount("#app");
