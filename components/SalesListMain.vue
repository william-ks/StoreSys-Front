<template>
  <div class="item">
    <h3 class="desc">
      {{ data.title }}
    </h3>
    <h3 class="desc">
      {{ formatToPrice((data.total - data.discount_for_client) / 100) }}
    </h3>
    <h3 class="desc">{{ formatData(data.sold_at) }}</h3>
  </div>
</template>

<script>
import { formatToPrice } from "~/composables/formatationFunctions";

export default {
  props: {
    data: Object,
  },
};
</script>

<style scoped>
.item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.desc {
  font-size: 1rem;
  font-weight: 300;
}
</style>