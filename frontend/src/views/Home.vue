<template>
  <main class="home">
    <h1>תדלק אותי!</h1>
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
