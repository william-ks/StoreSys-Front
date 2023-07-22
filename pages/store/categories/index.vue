<template>
  <div class="content">
    <LoadingModal v-show="loadingModal" />
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
import { usePage } from "~/store/page";

definePageMeta({
  middleware: ["auth"],
});

export default {
  setup() {
    useHead({
      title: "Categorias",
    });

    const pageStore = usePage();

    pageStore.title = "Categorias";

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
      loadingModal: false,
    };
  },
  methods: {
    handleAdd() {
      this.viewCreateModal = !this.viewCreateModal;
    },
  },
  async mounted() {
    try {
      this.loadingModal = true;
      await this.store.loadData();
    } finally {
      this.loadingModal = false;
    }
  },
};
</script>
  
<style scoped>
@import url("./style.css");
</style>