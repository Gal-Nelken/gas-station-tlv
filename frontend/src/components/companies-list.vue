<template>
  <main class="card-grid">
    <div v-for="(company, idx) in companies" :key="idx">
      <router-link class="card" :to="`/${company}`">{{ company }}</router-link>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    companies: Array,
  },
};
</script>
