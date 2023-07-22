<template>
  <li class="machineItem" @click="toggleSubModalView">
    <SubModal v-show="subModalView" @close="toggleSubModalView" />
    <Icon class="iconTop" name="mdi:dots-vertical" />
    <h3 class="title">{{ props.data.title }}</h3>
    <h3 class="tax">
      Débito: <span>{{ props.data.debit / 100 }}%</span>
    </h3>
    <h3 class="tax">
      Crédito: <span>{{ props.data.credit / 100 }}%</span>
    </h3>
  </li>
</template>

<script setup>
import SubModal from "./SubModal.vue";
const props = defineProps(["data"]);

const subModalView = useState("subModalView", () => false);

function toggleSubModalView() {
  subModalView.value = !subModalView.value;
}
</script>

<style scoped>
.machineItem {
  width: clamp(100px, 100%, 200px);
  height: 103px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 15px 2%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  cursor: pointer;
}

.iconTop {
  position: absolute;
  right: -1px;
  top: -1px;

  font-size: 1.5rem;
  color: white;

  background: rgb(30, 30, 30);
  border-radius: 0 7px 0 7px;
  border-top: 1px solid rgb(197, 195, 195);
  border-right: 1px solid rgb(197, 195, 195);
}

.title {
  font-weight: 400;
  font-size: 1.2rem;
}

.tax {
  font-size: 0.9rem;
  font-weight: 300;
}
</style>