<template>
  <div class="content">
    <div class="subHeader">
      <div class="opts">
        <button @click="toggleFilters" class="button filterButton">
          <Icon v-show="showFilters" :name="'ic:outline-filter-alt'" />
          <Icon
            v-show="!showFilters"
            :name="'material-symbols:filter-alt-off'"
          />
        </button>
        <button class="button bt" @click="navigateTo('/store/products/create')">
          Adicionar um produto
        </button>
      </div>
      <div :class="{ filter: true, show: showFilters }">
        <input type="text" class="productInput" placeholder="Nome do produto" />
        <select name="categories" id="categories">
          <option value="">Todos</option>
          <option value="">Blusas</option>
          <option value="">Camisetas</option>
        </select>
      </div>
    </div>
    <div class="center">
      <ul class="products" v-if="productsList">
        <li v-for="item of productsList" :key="item.id">
          <CardP
            :id="item.id"
            :title="item.name"
            :image="item.image.url"
            :stock="item.stock"
            :price="formatToPrice(item.value / 100)"
            @deleted="downloadData"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { read } from "@/composables/local";

definePageMeta({
  layout: "custom",
});

export default {
  setup() {
    const env = useRuntimeConfig();

    return {
      env,
    };
  },
  data() {
    return {
      showFilters: false,
      productsList: [],
    };
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },

    async downloadData() {
      try {
        this.productsList = [];
        const token = read("token");

        const { error, data } = await useFetch(
          `${this.env.public.apiBase}/product`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (error.value) {
          throw error;
        }
        this.productsList = [...data.value];
      } catch (e) {
        throw e;
      }
    },
  },
  mounted() {
    this.downloadData();
  },
};
</script>

<style scoped>
.subHeader {
  width: 100%;
  padding: 10px 0;
  background: rgb(247, 247, 247);
}

.subHeader .opts {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.bt {
  background-color: #ffffff;
  border: 1px solid rgb(30, 30, 30);
  color: rgb(30, 30, 30);
  font-weight: 300;
}

.bt:hover {
  background-color: rgb(60, 60, 60);
  color: white;
}

.filterButton {
  font-weight: 400;
  background-color: #006bc8;
  padding: 2px 15px;
  font-size: 1.3rem;
}

.filter {
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.productInput {
  max-width: 60%;
}

.filter.show {
  visibility: visible;
}

.products {
  margin-top: 45px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.products li {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 350px) {
  button.button.bt {
    font-size: 0.9rem;
  }
}
</style>