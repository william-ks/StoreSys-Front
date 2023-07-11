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
          <option
            :value="category.id"
            v-for="category of categoriesList"
            :key="category.id"
          >
            {{ category.description }}
          </option>
        </select>
      </div>
    </div>
    <div class="center">
      <ul class="products">
        <li v-for="item of productList" :key="item.id">
          <CardProductMain
            :id="item.id"
            :title="item.name"
            :image="item.image.url"
            :stock="item.stock"
            :price="formatToPrice(item.value / 100)"
            @yes="delUpdate"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import categoriesFunctions from "~/composables/contextFunctions/categoriesFunctions";
import productsFunctions from "~/composables/contextFunctions/productsFunctions";
import auth from "~/middleware/auth";

useSeoMeta({
  title: "Produtos",
});

definePageMeta({
  middleware: ["auth"],
});

const productList = useState("productList", () => []);
const categoriesList = useState("categoriesList", () => []);
const showFilters = useState("showFilters", () => false);

const onLoad = async () => {
  const [{ content: contentCategories }, { content: contentProducts }] =
    await Promise.all([
      categoriesFunctions.download(),
      productsFunctions.downloadAll(),
    ]);

  productList.value = contentProducts;
  categoriesList.value = contentCategories;
};
await onLoad();

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const delUpdate = async (id) => {
  try {
    const response = await productsFunctions.del(id);

    if (response.code === 400) {
      throw new Error(response.content);
    }

    const { content: contentProducts } = await productsFunctions.downloadAll();

    productList.value = contentProducts;
  } catch (e) {
    alert("Erro ao excluir produto");
    return;
  }
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

.filterButton {
  font-weight: 400;
  background-color: rgb(255 107 42);
  padding: 2px 15px;
  font-size: 1.3rem;
}

.filterButton:hover {
  background-color: rgb(255 107 42);
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  margin: 20px 0;
}

.products li {
  width: 100%;
}

@media screen and (min-width: 750px) {
  .products {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .products li {
    width: 100%;
    max-width: 200px;
  }
}

@media screen and (max-width: 750px) {
  .products {
    gap: 20px;
  }
}

@media screen and (max-width: 350px) {
  button.button.bt {
    font-size: 0.9rem;
  }
}
</style>