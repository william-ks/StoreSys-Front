<template>
  <div class="content">
    <div class="center">
      <button class="button add">
        <Icon name="material-symbols:add" />
        <span>Adicionar categoria</span>
      </button>
      <ul class="categoriesList">
        <li
          class="categoriesItem"
          v-for="category of categoriesList"
          :key="category.id"
        >
          <span>{{ category.description }}</span>
          <Icon @click="handleAddCategory" name="humbleicons:dots-vertical" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import categoriesFunctions from "~/composables/contextFunctions/categoriesFunctions";

useSeoMeta({
  title: "Categorias",
});
</script>
  
<script>
definePageMeta({
  middleware: ["auth"],
});

export default {
  data() {
    return {
      categoriesList: [],
    };
  },
  methods: {
    handleAddCategory() {
      console.log("here");
    },
  },
  async mounted() {
    const { content } = await categoriesFunctions.download();
    this.categoriesList = content;
  },
};
</script>
  
<style scoped>
@import url("./style.css");
</style>