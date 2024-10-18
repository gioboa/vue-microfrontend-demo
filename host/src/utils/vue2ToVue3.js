const Vue2 = (await import("remote/vue2")).default;

export const vue2ToVue3 = async (remoteComponent, wrapperId) => {
  const bindSlotContext = (target = {}, context) => {
    return Object.keys(target).map((key) => {
      const vnode = target[key];
      vnode.context = context;
      return vnode;
    });
  };

  let vm;
  return {
    mounted() {
      const slots = bindSlotContext(this.$slots, this.__self);

      vm = new Vue2({
        render: (createElement) => {
          return createElement(
            remoteComponent,
            {
              on: this.$attrs,
              attrs: this.$attrs,
              props: this.$props,
              scopedSlots: this.$scopedSlots,
            },
            slots,
          );
        },
      });
      vm.$mount(`#${wrapperId}`);
    },
    props: remoteComponent.props,
    render() {
      vm && vm.$forceUpdate();
    },
  };
};
