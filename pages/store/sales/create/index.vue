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
            v-for="category of store.categoriesList"
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
            <h3 class="product_title">{{ limitText(product.name, 45) }}</h3>
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

<script>
import salesFunctions from "~/composables/contextFunctions/salesFunctions";
import machinesFunctions from "~/composables/contextFunctions/machinesFunctions";
import userFunctions from "~/composables/contextFunctions/userFunctions";
import productsFunctions from "~/composables/contextFunctions/productsFunctions";

import { useCategories } from "@/store/categories";

useSeoMeta({
  title: "Nova Venda",
});

definePageMeta({
  middleware: ["auth"],
});

export default {
  setup() {
    const store = useCategories();
    return {
      store,
    };
  },
  data() {
    return {
      cartList: [],
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
        { content: mContent },
        { content: payContent },
      ] = await Promise.all([
        productsFunctions.downloadAll(),
        machinesFunctions.downloadAll(),
        salesFunctions.downloadPaymentsMethods(),
        this.store.loadData(),
      ]);
      this.productsList = pContent;
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
        sold_at: new Date(this.$refs.date.value),
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
        this.toggleModalView();
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
@import url("./style.css");
</style>
