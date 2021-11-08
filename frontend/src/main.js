import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/main.scss"
import * as VueGoogleMaps from "vue2-google-maps"

Vue.config.productionTip = false;


Vue.config.productionTip = false
// --- GOOGLE MAP ---
Vue.use(VueGoogleMaps, {
  load: {
    key: "GOOGLE-API-KEY",
    libraries: "places"
  }
});


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
