import Vue from "vue";
import VueRouter from "vue-router";
import home from "@/views/Home.vue";
import station from "@/views/station.vue";
import company from "@/views/company.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/:company',
    component: company
  },
  {
    path: '/:company/:stationId',
    component: station
  }
];

const router = new VueRouter({
  routes,
});

export default router;
