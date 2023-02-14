<template>
  <aside :class="{ show: sideBar }">
    <header>
      <button>
        <SideButton @toggleSide="$emit('toggleSide')" />
      </button>
    </header>
    <h2 class="name">William</h2>
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
  width: 35px;
  min-height: 100vh;

  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;

  background-color: rgb(26, 26, 46);

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
  background-color: rgb(31, 31, 48);
  border-bottom: 1px solid rgb(46, 46, 61);
  padding: 10px 0;
}

button {
  display: inline-block;
  width: 30px;
}

aside.show {
  width: clamp(150px, 60%, 350px);
}
</style>