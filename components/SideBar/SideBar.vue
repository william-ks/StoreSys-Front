<template>
  <div :class="{ show: sideBar, sideBar: true }" @click="$emit('toggleSide')">
    <aside @click="stopPropagation">
      <header>
        <button>
          <SideButton :isChecked="sideBar" @toggleSide="$emit('toggleSide')" />
        </button>
      </header>
      <nav>
        <ul @click="changeOnList">
          <li>
            <NuxtLink to="/store/sales">
              <span>
                <Icon
                  name="streamline:money-cash-dollar-coin-accounting-billing-payment-cash-coin-currency-money-finance"
                />
              </span>
              <span> Vendas</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/store/products">
              <span>
                <Icon name="fluent-mdl2:product" />
              </span>
              <span>Estoque</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              <span>
                <Icon name="mi:users" />
              </span>
              <span>Usuários</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              <span>
                <Icon name="ph:chart-line" />
              </span>
              <span>Relatórios</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/store/categories">
              <span>
                <Icon name="carbon:collapse-categories" />
              </span>
              <span>Categorias</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script>
export default {
  props: {
    sideBar: Boolean,
  },
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    stopPropagation(e) {
      e.stopPropagation();
    },
    changeOnList() {
      if (this.sideBar) {
        this.$emit("toggleSide");
      }
    },
  },
};
</script>

<style scoped>
.sideBar {
  width: 40px;
  min-height: 100vh;
  backdrop-filter: blur(6px);

  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  background-color: rgba(34, 34, 39, 0.116);

  transition: backdrop-filter 0.3s;
}

.sideBar.show {
  width: 100%;
}

aside {
  width: 40px;
  min-height: 100vh;

  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;

  background-color: rgba(34, 34, 39);

  color: rgb(233, 239, 243);
  overflow: hidden;

  transition: width 0.25s;

  box-shadow: 8px 0px 12px rgb(0 0 0 / 5%);
}

.sideBar.show aside {
  width: clamp(200px, 60%, 350px);
  box-shadow: 8px 0px 12px rgb(0 0 0 / 35%);
}

aside header {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: rgb(25, 25, 30);
  border-bottom: 1px solid rgb(46, 46, 61);
  padding: 15px 0;
}

button {
  display: inline-block;
  width: 35px;
}

aside.show {
  width: clamp(200px, 60%, 350px);
}

nav,
ul {
  width: 100%;
}

ul {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

ul li {
  width: 100%;
}

ul li a {
  padding: 35px 5px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

  font-size: 1.3rem;
  font-weight: 200;

  border-bottom: 1px solid rgb(46, 46, 61);
}

ul li a:hover {
  color: white;
  text-shadow: 0 0 5px;
  background-color: rgb(45, 45, 50);
}

ul li a svg {
  font-size: 1.6rem;
}

@media screen and (max-width: 450px) {
  button {
    width: 40px;
  }
}
</style>