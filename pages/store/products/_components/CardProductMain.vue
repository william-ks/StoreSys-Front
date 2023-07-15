<template>
  <div class="cardProduct">
    <ConfirmModal v-if="confirmModalB" @yes="del" @close="change" />
    <div class="image">
      <img :src="image ?? '@/assets/imgs/pikachu.jpeg'" alt="product" />
    </div>

    <div class="description">
      <h2 class="name">{{ limitText(title, 12) }}</h2>
      <p class="stock">{{ stock }} Unidades</p>
      <p class="price">
        <span class="full">Preço:</span>
        <span class="subPrice">{{ price }}</span>
      </p>
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

<script setup>
import ConfirmModal from "@/components/Modal/ConfirmModal.vue";
</script>

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
    price: String,
  },
  methods: {
    change() {
      this.confirmModalB = !this.confirmModalB;
    },
    async del() {
      this.change();
      this.$emit("yes", this.id);
    },
    toEdit() {
      navigateTo(`/store/products/edit/${this.id}`);
    },
  },
  watch: {
    confirmModalB(old, newValue) {
      if (this.confirmModalB) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  },
};
</script>

<style scoped>
.cardProduct {
  width: 200px;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  border-radius: 16px;

  background-color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ebebeb;
  transition: box-shadow 0.1s;
}

.cardProduct:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

.image {
  width: 100%;
  height: 168px;

  border-radius: 8px;
  background: #ccc;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.08);
}

.image img {
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  user-select: none;
}

.description {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.description .name {
  text-transform: capitalize;
  font-size: 1.2rem;
  font-weight: 300;
}

.description .stock {
  color: gray;
  font-size: 0.7rem;
  font-weight: 300;
}

.description .price {
  font-size: 0.9rem;
  font-weight: 300;
}

.description .price .subPrice {
  font-size: 1rem;
  font-weight: 400;
}

.options {
  width: 100%;

  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.opt {
  cursor: pointer;
  background: white;
  color: rgb(54, 54, 54);
  padding: 3px 8px;

  font-size: 1rem;

  border-radius: 50px;
  border: 1px solid #ccc;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.15s, box-shadow 0.15s;
}

.opt:hover {
  transform: scale(1.04);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  background: white;
}

@media screen and (max-width: 750px) {
  .cardProduct {
    width: 100%;
    height: auto;

    flex-direction: row;
    justify-content: space-between;
  }

  .description {
    margin-top: 0;
    width: calc(100% - 124px);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
  }

  .description .name {
    font-size: 1rem;
    font-weight: 300;
  }

  .description .stock {
    font-size: 0.7rem;
    font-weight: 200;
  }

  .description .price {
    font-size: 0.8rem;
    font-weight: 200;
  }

  .description .price .subPrice {
    font-size: 0.9rem;
  }

  .options {
    margin-top: -3px;
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: auto;
  }

  .image {
    width: 70px;
    height: 70px;
  }
}

@media screen and (max-width: 370px) {
  .full {
    display: none;
  }
}
</style>