<template>
  <main v-if="stationToShow">
    <h1>
      {{ stationToShow.attributes.shem_esek }}
    </h1>
    <googleMap
      :center="getCenter"
      :locationMarkers="[
        {
          position: getCenter,
          title: stationToShow.attributes.shem_esek,
        },
      ]"
    />
    <router-link :to="`/${company}`">חזור</router-link>
  </main>
  <loader v-else />
</template>

<script>
import loader from "@/components/loader.vue";
import googleMap from "@/components/google-map.vue";

export default {
  data() {
    return {
      company: this.$route.params.company,
      stationId: this.$route.params.stationId,
    };
  },
  created() {
    this.loadStation({ company: this.company, stationId: this.stationId });
  },

  methods: {
    loadStation(data) {
      try {
        this.$store.dispatch({ type: "loadStation", data });
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    stationToShow() {
      return this.$store.getters.getStation;
    },
    getCenter() {
      const { x, y } = this.stationToShow.geometry;
      return { lat: y, lng: x };
    },
  },
  components: {
    loader,
    googleMap,
  },
};
</script>
