<template>
  <main class="home page">
    <header class="home-header">
    <h1 class="home-main-title">תדלק אותי בת"א!</h1>
  <h2 class="home-sub-title">בחר חברת דלק </h2>
    </header>
    <hr class="home-line"/>
    <companies-list v-if="companiesToShow" :companies="companiesToShow" />
    <loader v-else />
  </main>
</template>

<script>
import loader from "@/components/loader";
import CompaniesList from "../components/companies-list.vue";
export default {
  data() {
    return {
      companies: null,
    };
  },
  created() {
    this.loadCompanies();
  },
  methods: {
    async loadCompanies() {
      await this.$store.dispatch({ type: "loadCompanies" });
    },
  },
  computed: {
    companiesToShow() {
      return this.$store.getters.getCompanies;
    },
  },
  components: {
    loader,
    CompaniesList,
  },
};
</script>
