<template>
  <ModalBase>
    <h1>{{ !data ? "Nova" : "Editar" }} categoria</h1>
    <form @submit="!data ? handleSubmitAdd() : handleSubmitUpdate()">
      <label for="input">
        <p>Nome:</p>
        <input type="text" id="input" ref="input" placeholder="exemplo" />
      </label>
      <div class="opt">
        <button class="button">
          {{ !data ? "Adicionar" : "Salvar" }}
        </button>
      </div>
    </form>
  </ModalBase>
</template>

<script>
import { useCategories } from "@/store/categories";

export default {
  setup() {
    const store = useCategories();

    return {
      store,
    };
  },
  props: {
    data: Object,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async handleSubmitAdd() {
      if (!this.$refs.input.value) return;

      let description = this.$refs.input.value;

      const response = await this.store.create(description);

      if (response.code !== 200) {
        alert("Erro ao adicionar a nova categoria");
      } else {
        this.$emit("close");
      }

      this.$refs.input.value = "";
    },
    async handleSubmitUpdate() {
      if (!this.$refs.input.value) return;

      let description = this.$refs.input.value;

      const response = await this.store.update({
        id: this.data.id,
        description,
      });
      if (response.code !== 200) {
        alert("Erro ao editar a categoria");
      } else {
        this.$emit("close");
      }

      this.$refs.input.value = "";
    },
  },
  mounted() {
    if (this.data) {
      this.$refs.input.value = this.data.description;
    }
  },
};
</script>

<style scoped>
form {
  margin: 10px 0;
}

form p {
  font-weight: 200;
}

.opt {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>