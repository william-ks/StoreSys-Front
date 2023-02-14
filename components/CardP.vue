<template>
  <div class="cardProduct">
    <div class="flex">
      <div class="image">
        <img src="@/assets/imgs/pikachu.jpeg" alt="product" />
      </div>

      <div class="description">
        <h2 class="name">Pikachu com efeito</h2>
        <p class="stock">Em estoque: 3</p>
      </div>
    </div>

    <div class="options">
      <button class="button opt">
        <Icon name="material-symbols:edit" />
      </button>
      <button class="button opt">
        <Icon name="bi:trash3" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardProduct",
  props: {
    title: String,
    image: String,
    stock: Number,
  },
};
</script>

<style scoped>
.cardProduct {
  background-color: white;
  width: clamp(170px, 90%, 800px);

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;

  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.212);
  border: 1px solid #ccc;
  user-select: none;

  transition: transform 0.25s;
}

.cardProduct:hover {
  transform: scale(1.02);
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.cardProduct .name {
  font-size: 1.5rem;
  font-weight: 300;
}

.cardProduct .stock {
  margin-top: -8px;
  color: gray;
  font-weight: 200;
}

.image {
  max-width: 100px;
  max-height: 100px;
  border-radius: 8px;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.103);
}

.image img {
  width: 100%;
  height: 100%;
}

.options {
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

@media screen and (max-width: 500px) {
  .flex {
    flex-direction: column;
    text-align: center;
  }

  .cardProduct .name {
    font-size: 1.3rem;
    font-weight: 400;
  }

  .cardProduct .stock {
    margin-top: -4px;
  }

  .options {
    margin-top: 15px;
  }
}
</style>