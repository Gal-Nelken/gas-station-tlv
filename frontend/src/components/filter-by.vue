<template>
  <div class="company-filter">
    <select
      name="filter"
      class="filter-select"
      id="filter"
      v-model="filterBy.name"
      @change="setFilter"
    >
      <option class="filter-option" value="none">חפש לפי...</option>
      <option class="filter-option" value="shem_esek">שם עסק</option>
      <option class="filter-option" value="t_ktovet">כתובת</option>
    </select>
    <input
    class="filter-input"
      type="text"
      @input="setFilter"
      v-model="filterBy.str"
      placeholder="חפש..."
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        name: "none",
        str: "",
      },
    };
  },
  destroyed() {
    this.$emit("filter", "");
  },
  methods: {
    setFilter() {
      this.$emit("filter", this.filterBy);
    },
  },
};
</script>
