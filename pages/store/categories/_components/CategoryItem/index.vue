<template>
  <li class="categoriesItem">
    <span>{{ data.description }}</span>
    <Icon name="humbleicons:dots-vertical" />
  </li>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  methods: {},
};
</script>

<style>
</style>