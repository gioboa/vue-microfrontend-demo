import { reactive } from "vue";

declare global {
  interface Window {
    store: any;
  }
}

export const store = reactive({ count: 0 });
window.store = store;
