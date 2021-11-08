<template>
  <main class="company page">
    <header  class="company-header">
      <h2 class="company-header-title">חברת דלק: {{ name }}</h2>
      <filter-by v-if="stationsToShow" @filter="setFilter" />
    </header>
    <hr class="home-line"/>
      <station-list v-if="stationsToShow" :stations="stationsToShow" />
    <loader v-else />
      <router-link class="secondary-btn" to="/"> חזור</router-link>
  </main>
</template>

<script>
import filterBy from "../components/filter-by.vue";
import stationList from "../components/station-list.vue";
import loader from "@/components/loader.vue";

export default {
  data() {
    return {
      name: this.$route.params.company,
    };
  },
  created() {
    this.loadStations(this.name);
  },

  methods: {
    async loadStations(name) {
      await this.$store.dispatch({ type: "loadStations", data: name });
    },
    setFilter(filterBy) {
      this.$store.commit({ type: "SET_FILTER", filterBy });
    },
  },
  computed: {
    stationsToShow() {
      return this.$store.getters.getStations;
    },
  },
  components: {
    filterBy,
    stationList,
    loader,
  },
};
</script>
