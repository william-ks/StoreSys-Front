<template>
  <ModalBase>
    <h1>O que você quer fazer ?</h1>
    <div class="opts">
      <button class="button bt" @click="closeEmit('edit')">
        <Icon name="material-symbols:edit-outline" />
        <span> Editar </span>
      </button>
      <button class="button bt" @click="closeEmit('del')">
        <Icon name="material-symbols:delete-outline" />
        <span> Deletar </span>
      </button>
    </div>
  </ModalBase>
</template>

<script>
export default {
  methods: {
    closeEmit(emitName) {
      this.$emit(emitName);
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 1.9em;
}
.opts {
  width: 100%;
  margin: 25px 0 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.bt {
  border-radius: 100px;
  padding: 7px 25px;
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.bt span {
  display: inline-block;
}

.opts .bt:last-of-type {
  background: rgb(255, 0, 60);
}
.opts .bt:last-of-type:hover {
  background: rgb(225, 10, 60);
}

@media screen and (max-width: 400px) {
  .opts {
    flex-direction: column;
    gap: 20px;
  }
}
</style>