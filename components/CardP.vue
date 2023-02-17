<template>
  <div class="cardProduct">
    <ConfirmModal v-if="confirmModalB" @yes="del" @close="change" />
    <div class="flex">
      <div class="image">
        <img :src="image ?? '@/assets/imgs/pikachu.jpeg'" alt="product" />
      </div>

      <div class="description">
        <h2 class="name">{{ title }}</h2>
        <p class="stock">Em estoque: {{ stock }}</p>
      </div>
    </div>

    <div class="options">
      <button @click="toEdit" class="button opt">
        <Icon name="material-symbols:edit" />
      </button>

      <button @click="change" class="button opt">
        <Icon name="bi:trash3" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmModalB: false,
    };
  },
  name: "cardProduct",
  props: {
    id: Number,
    title: String,
    image: String,
    stock: Number,
  },
  methods: {
    change() {
      this.confirmModalB = !this.confirmModalB;
    },
    async del() {
      console.log(`Produto de id=${this.id} deletado`);
    },
    toEdit() {
      navigateTo(`/store/products/edit/${this.id}`);
    },
  },
};
</script>

<style scoped>
.cardProduct {
  background-color: white;
  width: 200px;
  height: 325px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;

  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;

  flex-direction: column;
  transition: box-shadow 0.25s;
}

.cardProduct:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

.flex {
  width: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.cardProduct .name {
  margin-top: -8px;
  font-size: 1.3rem;
  font-weight: 300;
}

.cardProduct .stock {
  color: gray;
  font-weight: 200;
}

.image {
  width: 150px;
  height: 150px;

  border-radius: 8px;
  background: #ccc;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.103);
}

.image img {
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  user-select: none;
}

.options {
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.opt {
  background: white;
  border: 1px solid #ccc;
  padding: 3px 8px;
  border-radius: 50px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  color: rgb(54, 54, 54);
}

.options {
  margin-top: 15px;
}
</style>