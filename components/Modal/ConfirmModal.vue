<script>
export default {};
</script>

<template>
  <ModalBase>
    <h1>Você tem certeza ?</h1>
    <div class="buttons">
      <button @click="$emit('yes')" class="button yes">Sim</button>
      <button @click="$emit('close')" class="button no">Não</button>
    </div>
  </ModalBase>
</template>


<style scoped>
.buttons {
  margin-top: 25px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

button.button {
  border-radius: 100px;
  font-weight: 200;
  padding: 5px 35px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid rgb(30, 30, 30);
}

button.yes {
  border-color: transparent;
}

button.button:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transform: scale(1.02);
}

button.no {
  background: white;

  color: rgb(30, 30, 30);
  transition: background 0.15s, color 0.15s;
}

button.no:hover {
  color: white;
  background: rgb(30, 30, 30);
}
</style>