<template>
  <div class="contentModal">
    <div class="modalIcons">
      <Icon name="line-md:loading-twotone-loop" />
      <p>Carregando...</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.contentModal {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;
}

.modalIcons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.modalIcons svg {
  font-size: 5rem;
  color: rgb(0, 217, 255);
}

.modalIcons p {
  color: white;
}
</style>