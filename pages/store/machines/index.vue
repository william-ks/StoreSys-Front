<template>
  <div class="content">
    <LoadingModal v-show="loadingModal" />

    <div class="center">
      <ul class="machineList">
        <li class="add">
          <Icon name="bi:patch-plus-fill" />
          <span>Adicionar</span>
        </li>
        <MachineItem
          v-for="machine of machineStore.machinesList"
          :key="machine.id"
          :data="machine"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import MachineItem from "./_components/MachineItem.vue";
import { useMachines } from "@/store/machines";
import { usePage } from "~/store/page";

definePageMeta({
  middleware: ["auth"],
});

export default {
  setup() {
    useHead({
      title: "Maquininhas",
    });

    const pageStore = usePage();
    pageStore.title = "Maquininhas";

    const machineStore = useMachines();

    return { machineStore };
  },
  components: { MachineItem },
  data() {
    return {
      loadingModal: false,
    };
  },
  methods: {},
  async mounted() {
    try {
      this.loadingModal = true;
      await this.machineStore.loadData();
    } finally {
      this.loadingModal = false;
    }
  },
};
</script>
  
<style scoped>
@import url("./style.css");
</style>