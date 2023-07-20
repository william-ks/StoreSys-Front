<template>
  <li class="categoriesItem">
    <ConfirmModal
      v-if="openedExcludeModal"
      @yes="del(data.id)"
      @close="changeExcludeModal"
    />
    <SubModal
      v-if="openedSubModal"
      @close="changeSubModal"
      @edit="changeEditModal"
      @del="changeExcludeModal"
    />
    <CreateEditModal
      v-if="openedEditModal"
      :data="data"
      @close="changeEditModal"
    />

    <h3>{{ data.description }}</h3>
    <div class="iconSpan">
      <Icon name="material-symbols:delete-outline" @click="changeSubModal" />
    </div>
  </li>
</template>

<script>
import ConfirmModal from "@/components/Modal/ConfirmModal.vue";
import SubModal from "./SubModal.vue";
import CreateEditModal from "./CreateEditModal.vue";
import { useCategories } from "~/store/categories";

export default {
  setup() {
    const categoriesStore = useCategories();

    return { categoriesStore };
  },
  components: { ConfirmModal, SubModal, CreateEditModal },
  props: {
    data: Object,
  },
  data() {
    return {
      openedExcludeModal: false,
      openedSubModal: false,
      openedEditModal: false,
    };
  },
  methods: {
    changeExcludeModal() {
      this.openedExcludeModal = !this.openedExcludeModal;
    },
    async del(id) {
      const response = await this.categoriesStore.del(id);
      if (response.code === 200) {
        this.changeExcludeModal();
      } else {
        if (response.error) {
          alert(response.error);
        } else {
          alert("Não é possível apagar está categoria.");
        }
      }
    },
    changeSubModal() {
      this.openedSubModal = !this.openedSubModal;
    },
    changeEditModal() {
      this.openedEditModal = !this.openedEditModal;
    },
  },
};
</script>

<style scoped>
.categoriesItem {
  width: 100%;
  padding: 10px 2%;

  border-radius: 8px;
  border: 1px solid #e7e7e7;

  background-color: white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;

  user-select: none;
}

.categoriesItem h3 {
  font-size: 1.3rem;
  font-weight: 200;
}

.categoriesItem svg {
  cursor: pointer;
  font-size: 1.3rem;
}
</style>