<template>
  <div class="content">
    <div class="center"></div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Categorias",
});
</script>
  
<script>
definePageMeta({
  middleware: ["auth"],
});

export default {};
</script>
  
<style scoped>
</style>