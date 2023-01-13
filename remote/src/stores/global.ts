import { defineStore } from "pinia";

export const useGlobalStore = defineStore("counter", {
  state: () => ({
    count: 0,
    doubleCount: 0,
  }),
  actions: {
    increment() {},
  },
});
