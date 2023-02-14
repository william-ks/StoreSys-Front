<template>
  <header>
    <div class="center">
      <h2 class="titlePage">
        <slot />
      </h2>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  width: 100%;
  padding: 15px 0;
  background-color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgb(49, 127, 230);
  position: relative;
  z-index: 0;
}

header > .center {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.titlePage {
  width: 100%;
  font-weight: 300;
  font-size: 2rem;
  text-align: center;
}
</style>