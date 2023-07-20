<template>
  <div class="content">
    <div class="subHeader">
      <div class="filter">
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
      <div class="productsDiv">
        <h2 class="productsTitle">
          <span> Produtos </span>
          <button
            class="button bt"
            @click="navigateTo('/store/products/create')"
          >
            <Icon name="material-symbols:add" />
          </button>
        </h2>
        <div class="productsBox">
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
    </div>
  </div>
</template>

<script setup>
import categoriesFunctions from "~/composables/contextFunctions/categoriesFunctions";
import productsFunctions from "~/composables/contextFunctions/productsFunctions";
import CardProductMain from "./_components/CardProductMain.vue";

useSeoMeta({
  title: "Estoque",
});

definePageMeta({
  middleware: ["auth"],
});

const productList = useState("productList", () => []);
const categoriesList = useState("categoriesList", () => []);

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
  cursor: pointer;
  font-size: 2.3rem;
  padding: 0;

  display: flex;
  justify-content: center;
  align-content: center;

  background-color: rgb(13, 180, 88);
  border-radius: 8px;
}

.bt svg {
  padding: 5px;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
}

.filter {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.productInput {
  max-width: 60%;
}

.productsDiv {
  width: 100%;
  background: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.205);
  border-radius: 8px;
  min-height: 75vh;
}

.productsBox {
  padding: 0 4% 15px 4%;
}

.productsTitle {
  width: 100%;
  margin-bottom: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(50, 50, 50);
  border: 1px solid rgb(50, 50, 50);
  border-radius: 6px 6px 0 0;
  padding: 5px 4%;
  text-shadow: 0 0 5px;
  color: white;

  font-weight: 400;
  font-size: 1.7rem;
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