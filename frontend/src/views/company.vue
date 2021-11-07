<template>
  <main>
    <header>
      <h2>חברת דלק: {{ name }}</h2>
      <filter-by @filter="setFilter" />
    </header>
    <section v-if="stationsToShow">
      <station-list :stations="stationsToShow" />
      <router-link to="/">חזור</router-link>
    </section>
    <loader v-else />
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
