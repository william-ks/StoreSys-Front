<template>
  <div class="content">
    <div class="subHeader">
      <div class="filter">
        <button class="button bt" @click="changePage">Nova venda</button>
      </div>
    </div>
    <div class="center">
      <div class="listGroup">
        <ul class="list">
          <li
            class="itemList"
            v-for="item of saleStore.salesList"
            :key="item.id"
          >
            <SalesListMain :data="item"></SalesListMain>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SalesListMain from "./_components/SalesListMain.vue";
import { useCategories } from "~/store/categories";
import { useSales } from "@/store/sales";
import { usePage } from "@/store/page";

definePageMeta({
  middleware: ["auth"],
});

export default {
  setup() {
    useHead({
      title: "Vendas",
    });
    const categoriesstore = useCategories();
    const saleStore = useSales();
    const pageStore = usePage();

    pageStore.title = "Vendas";

    return {
      saleStore,
      categoriesstore,
    };
  },
  components: { SalesListMain },
  data() {
    return {
      showFilters: false,
    };
  },
  methods: {
    changePage() {
      return navigateTo("/store/sales/create");
    },
  },
  async mounted() {
    await Promise.all([
      this.saleStore.loadData(),
      this.categoriesstore.loadData(),
    ]);
  },
};
</script>

<style scoped>
header {
  box-shadow: none !important;
}

.subHeader {
  width: 100%;
  padding: 10px 0;
}

.subHeader .opts {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.filter {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.listGroup {
  width: 100%;
  /* padding: 15px 0; */
  min-height: 75vh;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 5px 10px rgb(0 0 0 / 15%);
  border: 1px solid #f7f7f7;
  overflow: hidden;
}

.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1px;
}

.itemList {
  width: 100%;
  cursor: pointer;
  padding: 15px 2%;
  user-select: none;
  border-bottom: 1px solid rgb(0 0 0 / 10%);

  transition: box-shadow 0.15s;
}

.itemList:hover {
  box-shadow: 0 3px 6px rgb(0 0 0 / 10%);
  transform: scale(1.005);
}

.itemList:active {
  transform: scale(1);
}

.bt {
  background-color: #ffffff;
  font-weight: 300;
  color: rgb(30, 30, 30);
  border: 1px solid rgb(30, 30, 30);
  text-shadow: none;
  transition: background-color 0.25s, color 0.25s;
}

.bt:hover {
  background-color: rgb(60, 60, 60);
  color: white;
}
</style>