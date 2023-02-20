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
        <p class="price">{{ price }}</p>
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
import { read } from "@/composables/local";

export default {
  setup() {
    const env = useRuntimeConfig();

    return {
      env,
    };
  },
  data() {
    return {
      confirmModalB: false,
      token: `Bearer ${read("token")}`,
    };
  },
  name: "cardProduct",
  props: {
    id: Number,
    title: String,
    image: String,
    stock: Number,
    price: String,
  },
  methods: {
    change() {
      this.confirmModalB = !this.confirmModalB;
    },
    async del() {
      try {
        const { error } = await useFetch(
          `${this.env.public.apiBase}/product/${this.id}`,
          {
            method: "DELETE",
            headers: {
              authorization: this.token,
            },
          }
        );

        if (error.value) {
          throw error;
        }

        this.$emit("deleted");
      } catch (e) {
        alert("Erro ao excluir produto");
      } finally {
        this.change();
      }
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
  height: 370px;

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

.description {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.options {
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.price {
  margin-top: 10px;
  font-size: 1.3rem;
  font-weight: 200;
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