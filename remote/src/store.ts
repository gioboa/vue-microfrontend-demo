import { reactive } from "vue";

declare global {
  interface Window {
    store: { count: number };
  }
}

export const store = window.store || reactive({ count: 0 });
