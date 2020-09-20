import objectAssign from "object-assign";
import toast from "./index";
import Vue from "vue";

let $vm;
// 初始化插件时的默认参数
let initOptions = {
  type: "text",
  duration: 2000,
  position: "center",
  text: ''
};

const Toast = Vue.extend(toast);

const initInstance = (options = {}) => {
  if (!$vm) {
    $vm = new Toast({
      el: document.createElement("div")
    });
    document.body.appendChild($vm.$el);
  }
  for (let opt in initOptions) {
    $vm[opt] = options[opt] || initOptions[opt];
  }
};

Toast.show = (opts = {}) => {
  initInstance(opts);
  Vue.nextTick(() => {
    typeof $vm.show === "function" && $vm.show();
  });
};

Toast.hide = () => {
  initInstance({ ...$vm._props });
  Vue.nextTick(() => {
    typeof $vm.hide === "function" && $vm.hide();
  });
};

Toast.text = (text = "", position, duration) => {
  initInstance({ text, position, duration, type: "text" });
  Vue.nextTick(() => {
    typeof $vm.show === "function" && $vm.show();
  });
};

const install = (Vue, pluginOptions = {}) => {
  if (install.installed) return;
  initOptions = objectAssign(initOptions, pluginOptions);
  Vue.component(toast.name, toast, pluginOptions);
  Vue.$toast = Vue.prototype.$toast = Toast;
  install.installed = true;
};
export default install;
