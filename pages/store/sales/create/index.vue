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
          <button class="button" @click="showFinalizationModal">Proximo</button>
          <h5 class="totalValue">
            {{ formatToPrice(totalCart / 100) }}
          </h5>
        </div>
        <div class="pages">
          <span :class="{ page: true, selected: true }"></span>
          <span :class="{ page: true }" @click="showFinalizationModal"></span>
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
              v-model="saleTitle"
              type="text"
              placeholder="Titulo da venda"
            />
          </div>

          <div class="formItem">
            <p class="inputTitle">Forma de pagamento:</p>
            <div class="saleTypeForm">
              <select @change="changeSaleType" ref="saleType">
                <option
                  :value="payment.id"
                  v-for="payment of paymentsMethods"
                  :key="payment.id"
                >
                  {{ payment.title }}
                </option>
              </select>
              <p class="inputTitle" v-show="viewMachinesOption">
                Maquininha de Cartão:
              </p>
              <select v-show="viewMachinesOption" ref="machine">
                <option
                  :value="machine.id"
                  v-for="machine of machinesList"
                  :key="machine.id"
                >
                  {{ machine.title }}
                  {{
                    saleTypeValue == 3
                      ? `${(machine.credit / 100).toFixed(2)}%`
                      : `${(machine.debit / 100).toFixed(2)}%`
                  }}
                </option>
              </select>
            </div>
          </div>

          <div class="formItem">
            <p class="inputTitle">Desconto:</p>
            <input
              type="text"
              v-model="discountValue"
              @change="setFinalValue"
              placeholder="R$ 0,00"
            />
          </div>
          <div class="formItem">
            <p class="inputTitle">Data da venda:</p>
            <input type="date" ref="date" />
          </div>
        </div>

        <div class="opts">
          <button class="button" @click="checkout">Finalizar</button>
          <h5 class="totalValue">
            {{ formatToPrice(totalValue / 100) }}
          </h5>
        </div>
        <div class="pages">
          <span :class="{ page: true }" @click="showFinalizationModal"></span>
          <span :class="{ page: true, selected: true }"></span>
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
            <h6
              :class="{
                stock: true,
                green: product.stock >= 15,
                orange: product.stock < 15 && product.stock > 0,
                red: product.stock === 0,
              }"
            >
              {{ product.stock }} uni
            </h6>
            <p class="price">{{ formatToPrice(product.value / 100) }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>

<script>
import salesFunctions from "~/composables/contextFunctions/salesFunctions";
import machinesFunctions from "~/composables/contextFunctions/machinesFunctions";
import userFunctions from "~/composables/contextFunctions/userFunctions";
import categoriesFunctions from "~/composables/contextFunctions/categoriesFunctions";
import productsFunctions from "~/composables/contextFunctions/productsFunctions";

export default {
  setup() {},
  data() {
    return {
      cartList: [],
      categoryList: [],
      productsList: [],
      machinesList: [],
      paymentsMethods: [],
      modalView: false,
      saleTypeValue: 1,
      finalizationView: false,
      totalCart: 0,
      totalValue: 0,
      discountValue: "",
      finalValue: 0,
      saleTitle: "",
      updateValue: false,
      viewMachinesOption: false,
    };
  },
  methods: {
    updateValueFunction() {
      this.updateValue = !this.updateValue;
    },

    async onLoad() {
      const [
        { content: pContent },
        { content: cContent },
        { content: mContent },
        { content: payContent },
      ] = await Promise.all([
        productsFunctions.downloadAll(),
        categoriesFunctions.download(),
        machinesFunctions.downloadAll(),
        salesFunctions.downloadPaymentsMethods(),
      ]);
      this.productsList = pContent;
      this.categoryList = cContent;
      this.machinesList = mContent;
      this.paymentsMethods = payContent;

      const actualDate = new Date();
      this.$refs.date.value = actualDate.toISOString().slice(0, 10);
    },

    addCart(data) {
      const product = this.productsList.find((el) => el.id === data.id);
      const IdCList = this.cartList.findIndex((el) => el.id === data.id);

      if (product.stock === 0) {
        return alert("Produto sem estoque disponivel");
      }

      if (IdCList >= 0) {
        if (this.cartList[IdCList].amount >= product.stock) {
          alert("Máximo de itens no estoque já estão selecionados.");
        } else {
          this.cartList[IdCList].amount += 1;
        }
      } else {
        this.cartList.push({ ...data, amount: 1 });
      }

      this.updateValueFunction();
    },

    removeOfCart(id) {
      const newList = this.cartList.filter((el) => el.id !== id);
      this.cartList = newList;
      if (this.cartList.length <= 0) this.modalView = !this.modalView;
    },

    editValue({ target }, id) {
      const index = this.cartList.findIndex((el) => el.id === id);

      if (index < 0) return;

      let newItem = this.cartList[index];
      newItem.value = +target.value * 100;

      this.cartList.splice(index, 1, newItem);
    },

    editAmount(method, id) {
      const itemIndex = this.cartList.findIndex((el) => el.id === id);
      if (itemIndex < 0) return;

      if (method === "-") {
        this.cartList[itemIndex].amount = +this.cartList[itemIndex].amount - 1;
        if (+this.cartList[itemIndex].amount <= 0) {
          this.removeOfCart(id);
        }
      } else {
        if (this.cartList[itemIndex].amount < this.cartList[itemIndex].stock) {
          this.cartList[itemIndex].amount =
            +this.cartList[itemIndex].amount + 1;
        } else {
          return alert("Máximo de itens no estoque já estão selecionados.");
        }
      }

      this.updateValueFunction();
    },

    onChangeEditAmount(e, id) {
      const newValue = Number(e.target.value).toFixed(0);
      const itemIndex = this.cartList.findIndex((el) => el.id === id);
      if (itemIndex < 0) return;

      if (newValue <= 0) {
        this.removeOfCart(id);
      } else {
        this.cartList[itemIndex].amount = newValue;
      }
    },

    verifyCountInCart(id) {
      const find = this.cartList.find((el) => el.id === id);

      if (!find) return false;

      return find.amount;
    },

    calcCartValue() {
      let total = 0;
      for (let item of this.cartList) {
        total += item.value * item.amount;
      }
      this.totalCart = total;
    },

    setFinalValue() {
      const discount_for_client_value = +this.discountValue * 100;
      if (discount_for_client_value > 0) {
        this.totalValue = this.totalCart - discount_for_client_value;
      } else {
        this.totalValue = this.totalCart;
      }
    },

    saveTitle() {
      let title = "";

      this.cartList.forEach((item) => {
        title += `${item.amount} ${item.name}, `;
      });

      title.trim();

      if (title.trim().at(-1) === ",") {
        const splitedTitle = title.trim().split("");
        splitedTitle.pop();
        title = splitedTitle.join("");
      }

      this.saleTitle = title;
    },

    changeSaleType() {
      const type = this.$refs.saleType.value;

      this.saleTypeValue = this.$refs.saleType.value;
      if (+type < 3) {
        this.viewMachinesOption = false;
      } else {
        this.viewMachinesOption = true;
      }
    },

    toggleModalView(e) {
      if (this.cartList.length > 0) this.modalView = !this.modalView;

      if (this.modalView === false) this.finalizationView = false;
    },

    showFinalizationModal() {
      this.finalizationView = !this.finalizationView;
    },

    async checkout() {
      let form = {
        title: this.saleTitle,
        sale_type_id: +this.$refs.saleType.value,
        discount_for_client: +this.discountValue * 100,
        products: [],
      };

      if (this.$refs.saleType.value > 2) {
        form.machine_id = +this.$refs.saleType.value;
      }

      this.cartList.forEach((item) => {
        form.products.push({
          id: item.id,
          amount: item.amount,
          value: item.value,
        });
      });

      const res = await salesFunctions.create(form);
      if (res.code === 200) {
        alert("Venta registrada correctamente");
        navigateTo("/store/sales");
      } else {
        alert("error");
      }
    },
  },
  async mounted() {
    await this.onLoad();
  },
  watch: {
    modalView(oldVal, newVal) {
      if (this.modalView) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
    updateValue(oldVal, newVal) {
      this.calcCartValue();
      this.saveTitle();
      this.setFinalValue();
    },
  },
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
.productBox .stock {
  position: absolute;
  bottom: 30px;
  font-weight: 400;
  text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.2);
}

.productBox .stock.green {
  color: #00b33c;
}
.productBox .stock.red {
  color: red;
}
.productBox .stock.orange {
  color: orange;
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

.saleTypeForm {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

.modal .pages {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 15px 0;
}

.modal .pages .page {
  width: 15px;
  height: 15px;
  background-color: rgb(196, 196, 196);
  border-radius: 100px;
  cursor: pointer;
}

.modal .pages .page.selected {
  background-color: #4caf50;
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

  .modal h1.title {
    font-size: 1.3rem;
  }

  .modal .close {
    right: -10px;
    top: -10px;
    transition: color 0.25s;
    font-size: 1.4em;
    background-color: rgb(50, 50, 50);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    width: 30px;
    height: 30px;
  }
}
</style>
