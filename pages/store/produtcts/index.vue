<template>
  <div class="content">
    <Header>Produtos</Header>
    <div class="center">
      <div class="subHeader">
        <button @click="toggleFilters" class="button filterButton">
          <Icon
            :name="
              showFilters
                ? 'ic:outline-filter-alt'
                : 'material-symbols:filter-alt-off'
            "
          />
        </button>
        <button class="button bt">Adicionar um produto</button>
      </div>
      <div :class="{ filter: true, show: showFilters }">
        <input type="text" class="productInput" placeholder="Nome do produto" />
        <select name="categories" id="categories">
          <option value="">Todos</option>
          <option value="">Blusas</option>
          <option value="">Camisetas</option>
        </select>
      </div>

      <ul class="products">
        <li>
          <CardP />
        </li>
        <li>
          <CardP />
        </li>
        <li>
          <CardP />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "custom",
});

export default {
  data() {
    return {
      showFilters: true,
    };
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
  },
};
</script>

<style scoped>
.subHeader {
  width: 100%;
  height: 100%;
  padding: 10px 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.bt {
  background-color: #006bc8;
  font-weight: 300;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.products li {
  width: 100%;
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