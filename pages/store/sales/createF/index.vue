<template>
  <div class="content">
    <div class="modal" v-show="modalView" @click="toggleModalView">
      <div
        class="modalBox cart"
        v-show="!finalizationView"
        @click="(e) => e.stopPropagation()"
      >
        <div class="close">
          <Icon @click="toggleModalView" name="mdi:window-close" />
        </div>

        <h1 class="title">Verifique os itens abaixo:</h1>

        <ul class="modalCartList">
          <li
            class="modalCartListItem"
            v-for="product of cartList"
            :key="product.id"
          >
            <div class="float">
              <div class="icon" @click="removeOfCart(product.id)">
                <Icon name="ic:baseline-close" />
              </div>
            </div>
            <img :src="product.image.url" alt="product" />
            <h6>
              {{ limitText(product.name, 25) }}
            </h6>
            <div class="quanty">
              <span class="subPlus" @click="editAmount('-', product.id)">
                <Icon name="ic:baseline-minus" />
              </span>
              <input
                type="text"
                v-on:change="onChangeEditAmount"
                v-on:keyup="onChangeEditAmount($event, product.id)"
                :value="product.amount"
              />
              <span class="subPlus" @click="editAmount('+', product.id)">
                <Icon name="material-symbols:add-rounded" />
              </span>
            </div>
            <div class="valueModify">
              <input
                type="text"
                @change="(e) => editValue(e, product.id)"
                class="valueInput"
                :value="product.value / 100"
              />
            </div>
          </li>
        </ul>

        <div class="opts">
          <button class="button" @click="show">Proximo</button>
          <h5 class="totalValue">
            {{ formatToPrice(totalCart / 100) }}
          </h5>
        </div>
      </div>

      <div
        class="modalBox extra"
        v-show="finalizationView"
        @click="(e) => e.stopPropagation()"
      >
        <div class="close">
          <Icon @click="toggleModalView" name="mdi:window-close" />
        </div>

        <h1 class="title">Preencha os campos abaixo:</h1>

        <div class="forms">
          <div class="formItem">
            <p class="inputTitle">Titulo:</p>
            <input
              :value="saleTitle"
              type="text"
              placeholder="Titulo da venda"
            />
          </div>

          <div class="formItem">
            <p class="inputTitle">Forma de pagamento:</p>
            <select id="" ref="saleType">
              <option :value="1">Dinheiro</option>
              <option :value="2">Cartão</option>
              <option :value="3">Pix</option>
            </select>
          </div>

          <div class="formItem">
            <p class="inputTitle">Desconto:</p>
            <input type="text" :value="discountValue > 0 ? discountValue : ''" placeholder="R$ 0,00" />
          </div>
        </div>

        <div class="opts">
          <button class="button" @click="setFinalValue">update</button>
          <button class="button" @click="checkout">Finalizar</button>
          <h5 class="totalValue">
            {{ formatToPrice(totalValue / 100) }}
          </h5>
        </div>
      </div>
    </div>

    <div class="center">
      <div class="subHeader">
        <input type="text" placeholder="Nome do produto" />
        <select name="" id="">
          <option value="">Categoria</option>
          <option
            :value="category.id"
            v-for="category of categoryList"
            :key="category.id"
          >
            {{ category.description }}
          </option>
        </select>
      </div>

      <div class="iconCart" @click="toggleModalView">
        <h1 v-show="cartList.length > 0" class="itensInCart">
          {{ cartList.length }}
        </h1>
        <Icon name="ph:shopping-cart-duotone" />
      </div>

      <div class="listProducts">
        <div class="minHeader">
          <h2 class="title">Produtos:</h2>
        </div>
        <ul class="productList">
          <li
            class="productBox"
            @click="addCart(product)"
            v-for="product of productsList"
            :key="product.id"
          >
            <h3 class="iconSelected" v-show="verifyCountInCart(product.id)">
              {{ verifyCountInCart(product.id) }}
            </h3>
            <img :src="product.image.url" alt="product view" />
            <h3 class="product_title">{{ limitText(product.name, 50) }}</h3>
            <p class="price">{{ formatToPrice(product.value / 100) }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Nova venda",
});

const cartList = useState("cartList", () => []);
const totalCart = useState("totalCart", () => 0);
const categoryList = useState("categoryList", () => []);
const productsList = useState("productsLis", () => []);
const modalView = useState("modalView", () => false);
const saleTitle = useState("saleTitle", () => "");
const saleType = ref(null);
const discountValue = useState("discountValue", () => 0);
const totalValue = useState("totalValue", () => 0);
const finalizationView = useState("finalizationView", () => false);

const onLoad = async () => {
  // cartList.value = [];

  const [{ content: pContent }, { content: cContent }] = await Promise.all([
    productsFunctions.downloadAll(),
    categoriesFunctions.download(),
  ]);
  productsList.value = pContent;
  categoryList.value = cContent;
};

const addCart = (data) => {
  const existId = cartList.value.findIndex((el) => el.id === data.id);
  if (existId >= 0) {
    cartList.value[existId].amount = +cartList.value[existId].amount + 1;
  } else {
    cartList.value.push({ ...data, amount: 1 });
  }
};

const editValue = ({ target }, id) => {
  const index = cartList.value.findIndex((el) => el.id === id);

  if (index < 0) return;

  let newItem = cartList.value[index];
  newItem.value = +target.value * 100;

  cartList.value.splice(index, 1, newItem);
};

const removeOfCart = (id) => {
  const newList = cartList.value.filter((el) => el.id !== id);
  cartList.value = newList;
  if (cartList.value.length <= 0) modalView.value = !modalView.value;
};

const calcCartValue = () => {
  let total = 0;
  for (let item of cartList.value) {
    total += item.value * item.amount;
  }
  totalCart.value = total;
};

const editAmount = (method, id) => {
  const itemIndex = cartList.value.findIndex((el) => el.id === id);
  if (itemIndex < 0) return;

  if (method === "-") {
    cartList.value[itemIndex].amount = +cartList.value[itemIndex].amount - 1;
    if (+cartList.value[itemIndex].amount <= 0) {
      removeOfCart(id);
    }
  } else {
    cartList.value[itemIndex].amount = +cartList.value[itemIndex].amount + 1;
  }
};

const onChangeEditAmount = (e, id) => {
  const newValue = Number(e.target.value).toFixed(0);
  const itemIndex = cartList.value.findIndex((el) => el.id === id);
  if (itemIndex < 0) return;

  if (newValue <= 0) {
    removeOfCart(id);
  } else {
    cartList.value[itemIndex].amount = newValue;
  }
};

const toggleModalView = (e) => {
  if (cartList.value.length > 0) modalView.value = !modalView.value;

  if (modalView.value === false) finalizationView.value = false;
};

const verifyCountInCart = (id) => {
  const find = cartList.value.find((el) => el.id === id);

  if (!find) return false;

  return find.amount;
};

const checkout = () => {
  let form;
  if (+saleType.value.value === 2) {
    form = {
      title: saleTitle.value,
      sale_type_id: +saleType.value.value,
      machine_id: 1,
      discount_for_client: 1,
      products: [],
    };
  } else {
    form = {
      title: saleTitle.value,
      sale_type_id: +saleType.value.value,
      discount_for_client: +discountValue.value,
      products: [],
    };
  }

  cartList.value.forEach((item) => {
    form.products.push({
      id: item.value,
      amount: item.amount,
      value: item.value,
    });
  });

  console.log(form);
};

const saveTitle = () => {
  let title = "";

  cartList.value.forEach((item) => {
    title += `${item.amount} ${item.name}, `;
  });
  
  saleTitle.value = title;
};

const setFinalValue = () => {
  if (discountValue.value > 0) {
    totalValue.value = totalCart.value - +discountValue.value;
  } else {
    totalValue.value = totalCart.value;
  }
  console.log('called: ', saleTitle.value)

};

const show = () => {
  finalizationView.value = true;
};

onLoad();

watchEffect(() => {
  calcCartValue();
  saveTitle();
  setFinalValue();

  if (modalView.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});
</script>

<script>
import salesFunctions from "~/composables/contextFunctions/salesFunctions";
import categoriesFunctions from "~/composables/contextFunctions/categoriesFunctions";
import productsFunctions from "~/composables/contextFunctions/productsFunctions";

export default {
  data() {
    return {
      // cartList: []
    };
  },
  methods: {},
};
</script>

<style scoped>
header {
  box-shadow: none !important;
}

.subHeader {
  margin: 10px 0;
  display: flex;
  gap: 10px;
}

.listProducts {
  width: 100%;
  min-height: 75vh;
  background-color: rgb(250 250 250);
  /* box-shadow: 0 5px 10px rgb(0 0 0 / 10%); */
  box-shadow: 0 0px 10px rgb(0 0 0 / 20%);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}

.minHeader {
  width: 100%;
  margin-bottom: 15px;
  background: rgb(50, 50, 50);
  border-radius: 8px 8px 0 0;
  padding: 5px 3%;
  text-shadow: 0 0 5px;
  color: white;
}

.minHeader .title {
  font-weight: 400;
  font-size: 1.7rem;
}

.productList {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 25px;
  padding: 15px 2% 80px 2%;
}

.productBox {
  width: 180px;
  box-shadow: 0 5px 10px rgb(0 0 0 / 15%);
  border: 1px solid #e2e0e0;
  padding: 10px 2%;
  border-radius: 6px;
  cursor: pointer;
  height: 275px;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  user-select: none;
  position: relative;
}

.productBox .iconSelected {
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 25px;

  border-radius: 0 6px 0 6px;

  background-color: rgb(255 107 42);

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 400;
  font-size: 0.8rem;
  color: white;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.45);
}

.productBox .price {
  position: absolute;
  bottom: 10px;
}

.productBox h3 {
  font-weight: 300;
  font-size: 0.89rem;
  letter-spacing: 0.3px;
}

.productBox img {
  width: 100%;
  height: 150px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
}

.productBox:hover {
  box-shadow: 0 5px 10px rgb(0 0 0 / 30%);
}

.productBox:active {
  box-shadow: 0 5px 10px rgb(0 0 0 / 15%);
  transform: scale(0.96);
}

/* ICON CART - START */

.iconCart {
  position: fixed;
  z-index: 1;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  background-color: rgb(255 107 42);
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 200px;
  color: white;
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.3);

  transition: transform 0.15s;
}

.iconCart:hover {
  transform: scale(1.04);
}

.iconCart:active {
  transform: scale(1);
}

.iconCart svg {
  font-size: 1.7rem;
  text-shadow: 1px 1px 1px black;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.38));
  z-index: 1;
}

.iconCart .itensInCart {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 0.7rem;
  width: 20px;
  height: 20px;
  background: rgb(48, 48, 48);
  border-radius: 200px;
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ICON CART - END */

/* MODAL */
.modal {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3%;

  overflow: hidden;
}

.modal .forms {
  padding: 15px 4%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.modal .formItem {
  width: 100%;
}

.modal .inputTitle {
  font-weight: 400;
}

.modal .formItem select {
  width: 100%;
}

.modal .inputTitle span {
  font-size: 0.9rem;
  font-weight: 300;
}

.modal .modalBox {
  max-height: 95%;
  width: clamp(150px, 98%, 700px);
  /* padding: 45px 4% 25px 4%; */
  background-color: rgb(245, 245, 245);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  position: relative;
  border: none;
}

.modal .close {
  position: absolute;
  right: 10px;
  top: 5px;
  transition: color 0.25s;
  font-size: 1.7em;
}

.modal .close svg {
  cursor: pointer;
  color: white;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.45));
}

.modal h1.title {
  font-weight: 400;

  width: 100%;

  color: white;
  font-weight: 300;
  padding: 5px 4%;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.45);
  background-color: rgb(50, 50, 50);
  border-radius: 3px 3px 0 0;
}

.modal .modalCartList {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-content: center;

  gap: 15px;
  padding: 15px 4%;
  overflow-x: auto;
}

.modalCartListItem {
  min-width: 130px;
  width: 100%;
  max-width: 140px;
  height: 270px;
  background-color: white;
  box-shadow: 0 3px 6px rgb(0 0 0 / 10%);
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  padding: 5px;
  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  user-select: none;
}

.modalCartListItem .float {
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  text-align: right;
}

.modalCartListItem .float .icon {
  display: inline-block;
  background-color: rgb(253, 34, 71);
  border-radius: 0 0 0 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.modalCartListItem .float .icon:hover,
.modalCartListItem .float .icon:active {
  /* background-color: rgb(255, 0, 43); */
  opacity: 1;
}

.modalCartListItem .float .icon svg {
  margin-top: -2.5px;
  color: rgb(255, 255, 255);
}

.modalCartListItem img {
  padding: 0 5px;
  width: 100%;
  height: 100px;
}

.modalCartListItem h6 {
  padding: 0 5px;
  font-weight: 300;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

.modalCartListItem p {
  font-weight: 400;
  font-size: 0.9rem;
}

.modalCartListItem .quanty {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgb(250, 250, 250);
}

.modalCartListItem .quanty input {
  height: 20px;
  text-align: center;
  box-shadow: none;
  border-radius: 0;
  border: none;
  background-color: transparent;
  color: rgb(39, 39, 39);
  font-weight: 300;
  font-size: 0.9rem;
}

.modalCartListItem .quanty .subPlus {
  cursor: pointer;
  background: rgb(243, 243, 243);
}

.modalCartListItem .quanty .subPlus:hover,
.modalCartListItem .quanty .subPlus:active {
  background: rgb(45, 37, 48);
  color: white;
}

.modalCartListItem .quanty {
  border-radius: 5px;
  overflow: hidden;
  /* box-shadow: 0 0px 10px rgba(0, 0, 0, 0.15); */
  border: 1px solid #e6e6e6;
}

.modalCartListItem .quanty .subPlus svg {
  margin-top: -2.5px;
  width: 30px;
}

.modalCartListItem .quanty input:hover,
.modalCartListItem .valueInput:focus,
.modalCartListItem .valueInput:hover {
  box-shadow: none;
}

.modalCartListItem .valueInput {
  height: 27px;
  font-size: 0.85rem;
  font-weight: 300;
  text-align: center;
}

.modal .opts {
  margin-top: 10px;
  padding: 10px 4%;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  gap: 15px;
  align-items: center;
  justify-content: space-evenly;
  border-top: 1px solid #ccc;
}

.modal .totalValue {
  font-weight: 300;
  font-size: 1.2rem;
}

/* responsividade */
@media screen and (max-width: 750px) {
  .productList {
    flex-direction: column;
  }

  .productBox {
    width: 100%;
    height: auto;

    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    gap: 10px;
  }

  .productBox .price {
    position: static;
    font-weight: 400;
  }

  .productBox h3 {
    font-weight: 300;
    font-size: 1rem;
    letter-spacing: 0.3px;
  }

  .productBox img {
    width: 50px;
    height: 50px;
    margin-bottom: 0;
  }
}

@media screen and (max-width: 550px) {
  .productBox h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 0.8rem;
  }
}
</style>
