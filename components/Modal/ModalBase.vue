<script>
export default {};
</script>

<template>
  <div class="modal" @click="$emit('close')">
    <div class="modalBox" @click="(e) => e.stopPropagation()">
      <div class="close">
        <Icon @click="$emit('close')" name="mdi:window-close" />
      </div>
      <slot />
    </div>
  </div>
</template>


<style>
.modal {
  cursor: default;
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3%;
  user-select: none;
}

.modalBox {
  width: clamp(150px, 100%, 500px);
  padding: 45px 4% 25px 4%;
  background-color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  position: relative;
}

.close {
  position: absolute;
  right: 10px;
  top: 0px;
  transition: color 0.25s;

  font-size: 1.7em;
}
.close svg {
  cursor: pointer;
}

h1 {
  font-weight: 300;
  text-align: center;
}
</style>