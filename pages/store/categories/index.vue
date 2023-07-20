<template>
  <div class="content">
    <CreateEditModal v-show="viewCreateModal" @close="handleAdd" />
    <div class="center">
      <button class="button add" @click="handleAdd">
        <Icon name="material-symbols:add" />
        <span>Nova categoria</span>
      </button>
      <ul class="categoriesList">
        <CategoryItem
          v-for="category of store.categoriesList"
          :key="category.id"
          :data="category"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import CategoryItem from "./_components/CategoryItem";
import CreateEditModal from "./_components/CreateEditModal";
import { useCategories } from "@/store/categories";

useSeoMeta({
  title: "Categorias",
});

definePageMeta({
  middleware: ["auth"],
});

export default {
  setup() {
    const store = useCategories();

    return { store };
  },
  components: {
    CreateEditModal,
    CategoryItem,
  },
  data() {
    return {
      viewCreateModal: false,
    };
  },
  methods: {
    handleAdd() {
      this.viewCreateModal = !this.viewCreateModal;
    },
  },
  mounted() {
    this.store.loadData();
  },
};
</script>
  
<style scoped>
@import url("./style.css");
</style>