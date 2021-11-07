<template>
  <div class="flex">
    <select name="filter" id="filter" v-model="filterBy.name" @change="setFilter">
      <option value="none">חפש לפי...</option>
      <option value="shem_esek">שם עסק</option>
      <option value="t_ktovet">כתובת</option>
    </select>
      <input type="text" @input="setFilter" v-model="filterBy.str"  placeholder="חפש..." />
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
    this.$emit("filter", '');

  },
  methods: {
    setFilter() {
      this.$emit("filter", this.filterBy);
    },
  },
};
</script>
