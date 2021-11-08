<template>
  <div>
    <gmap-map :zoom="12" :center="center" class="google-map">
      <gmap-marker
        v-for="(m, index) in locationMarkers"
        @click="goToStation(m.path)"
        :key="index"
        :position="m.position"
        :title="m.title"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  props: {
    center: Object,
    locationMarkers: Array,
  },
  data() {
    return {
      locPlaces: [],
      existingPlace: null,
    };
  },

  mounted() {
    this.locateGeoLocation();
  },

  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
    },
    // By Clicking Map Marker, Go To Station Page
    goToStation(path) {
      if (!path) return;
      this.$router.push(path);
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng(),
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
      }
    },
    locateGeoLocation: function () {
      navigator.geolocation.getCurrentPosition((res) => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        };
      });
    },
  },
};
</script>

<style lang="scss">
.google-map {
  width: 100%;
  height: 400px;
  align-self: stretch;
  background-color: unset;
}
</style>
