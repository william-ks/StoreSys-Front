<template>
  <aside :class="{ show: sideBar }">
    <header>
      <button>
        <SideButton @toggleSide="$emit('toggleSide')" />
      </button>
    </header>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/">
            <span>
              <Icon name="game-icons:take-my-money" />
            </span>
            <span> Vendas</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
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
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  props: {
    sideBar: Boolean,
  },
};
</script>

<style scoped>
aside {
  width: 40px;
  min-height: 100vh;

  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;

  background-color: rgb(30, 30, 35);

  color: rgb(233, 239, 243);
  overflow: hidden;

  transition: width 0.25s;

  box-shadow: 8px 0px 12px rgb(0 0 0 / 26%);
}

aside header {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: rgb(30, 30, 35);
  border-bottom: 1px solid rgb(46, 46, 61);
  padding: 15px 0;
}

button {
  display: inline-block;
  width: 30px;
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
</style>