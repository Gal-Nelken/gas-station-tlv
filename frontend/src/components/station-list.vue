<template>
  <ul class="table">
    <li class="table-row">
      <h3>שם תחנה</h3>
      <h3>כתובת</h3>
    </li>
    <li v-if="stations.length < 1" class="table-row">אין תחנות להראות</li>
    <li v-for="(station, idx) in stations" :key="idx" class="table-row">
      <router-link
        :to="`/${station.attributes.shem_hevra}/${station.attributes.UniqueId}`"
        class="table-station-name"
        >{{ station.attributes.shem_esek }}</router-link
      >
      <h4 class="table-station-adress">{{ station.attributes.t_ktovet }}</h4>
    </li>
    <google-map
      class="stations-map"
      :center="mapCenter"
      :locationMarkers="stationsLocation"
    />
  </ul>
</template>

<script>
import googleMap from "@/components/google-map.vue";

export default {
  props: {
    stations: Array,
  },
  computed: {
    stationsLocation() {
      if (!this.stations) return [];
      let locations = [];
      this.stations.forEach((station) => {
        const { x, y } = station.geometry;
        const { shem_esek, UniqueId, shem_hevra } = station.attributes;
        locations.push({
          position: { lat: y, lng: x },
          title: shem_esek,
          path: `/${shem_hevra}/${UniqueId}`,
        });
      });
      return locations;
    },
    mapCenter() {
      if (!this.stations) return;
      return { lat: 32.08, lng: 34.8 };
    },
  },
  components: {
    googleMap,
  },
};
</script>

<style lang="scss">
.stations-map {
  align-self: stretch;
}
</style>
