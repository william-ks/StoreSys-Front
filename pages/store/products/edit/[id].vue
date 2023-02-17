<template>
  <div class="main">
    <h1 class="pageTitle">Editar Produto</h1>

    <form class="form">
      <label for="title">
        <p class="inputDesc">Título</p>
        <input ref="title" type="text" id="title" />
      </label>
      <label for="categories">
        <p class="inputDesc">Categoria</p>
        <select ref="category" name="categories" id="categories">
          <option value="1">Saias</option>
          <option value="2">Roupas</option>
        </select>
      </label>
      <label for="">
        <p class="inputDesc">Preço</p>
        <div class="float">
          <input ref="price" type="text" />
          <span>R$</span>
        </div>
      </label>
      <label for="">
        <p class="inputDesc">Estoque</p>
        <input ref="stock" type="text" />
      </label>

      <div class="inputFileDiv">
        <p class="inputDesc">Adicionar Foto</p>

        <label
          class="fileLabel"
          @change="(e) => setFile(e.target.files[0])"
          for="inputFile"
        >
          <div :class="{ iconGroup: true, point: !image.url }">
            <div class="imageDiv" v-if="image.url">
              <img :src="image.url" alt="" class="image" />
              <div class="removeImage" @click="removeImage">
                <Icon name="lucide:trash-2" />
              </div>
            </div>

            <Icon class="imageIcon" v-else name="lucide:image-plus" />
          </div>

          <input
            type="file"
            id="inputFile"
            class="inputFile"
            :disabled="image.url ? true : false"
          />
        </label>
      </div>
    </form>
    <div class="buttons">
      <button @click="handleSubmit" class="button">Atualizar</button>
      <button class="button cancel">Cancelar</button>
    </div>
  </div>
</template>

<script>
import state from "@/composables/state";
import { read } from "@/composables/local";

definePageMeta({
  layout: "custom",
});

export default {
  setup() {
    const env = useRuntimeConfig();

    const [file, setFile] = state("");
    const [image, setImage] = state({});

    return {
      env,
      file,
      setFile,
      image,
      setImage,
    };
  },
  data() {
    return {
      id: this.$route.params.id,
      token: `Bearer ${read("token")}`,
    };
  },
  mounted() {
    if (!Number(this.id)) {
      navigateTo("/store/products");
    }

    this.getThisProduct();
  },
  methods: {
    removeImage() {
      this.setFile("");
      this.setImage({});
    },
    async uploadImage() {
      if (!this.file) return;

      const dataForm = new FormData();
      dataForm.append("image", this.file);

      try {
        const { error, data } = await useFetch(
          `${this.env.public.apiBase}/product/image`,
          {
            method: "POST",
            headers: {
              authorization: this.token,
            },
            body: dataForm,
          }
        );

        if (error.value) {
          throw error;
        }

        this.setImage({ ...data.value });
      } catch (e) {
        alert("Ocorreu um erro ao enviar a imagem.");
        return;
      }
    },
    async getThisProduct() {
      try {
        const { error, data } = await useFetch(
          `${this.env.public.apiBase}/product/${this.id}`,
          {
            headers: {
              authorization: this.token,
            },
          }
        );

        if (error.value) {
          throw error;
        }

        this.$refs.title.value = data.value.name;
        this.$refs.stock.value = data.value.stock;
        this.$refs.price.value = data.value.value / 100;
        this.$refs.category.value = data.value.category_id;

        this.setImage({
          url: data.value.image.url,
          path: data.value.image.path,
        });
      } catch (e) {
        alert("Ocorreu um erro ao ler as informações do produto.");
        return;
      }
    },

    async handleSubmit(e) {
      e.preventDefault();

      const form = {
        name: this.$refs.title.value,
        value: Number(this.$refs.price.value) * 100,
        stock: Number(this.$refs.stock.value),
        category_id: Number(this.$refs.category.value),
        url: this.image.url,
        path: this.image.path,
      };

      try {
        const { error, data } = await useFetch(
          `${this.env.public.apiBase}/product/${this.id}`,
          {
            method: "PUT",
            headers: {
              authorization: this.token,
            },
            body: { ...form },
          }
        );

        if (error.value) {
          throw error;
        }

        navigateTo("/store/products");
      } catch (e) {
        alert("Ocorreu um erro ao salvar o produto");
        return;
      }
    },
  },
  watch: {
    file(newValue, oldValue) {
      this.uploadImage();
    },
  },
};
</script>

<style scoped>
.main {
  width: clamp(150px, 90%, 1400px);
  margin: 15px auto;
  border-radius: 6px;
  min-height: 80vh;
  padding: 15px 4%;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.pageTitle {
  font-size: 1.7rem;
  font-weight: 400;
  margin-bottom: 20px;
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
}

.button {
  padding: 5px 35px;
  border-radius: 200px;
  border: 1px solid rgb(30, 30, 30);
  font-weight: 300;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.button.cancel {
  background: white;
  color: rgb(30, 30, 30);

  transition: background 0.15s, color 0.15s;
}

.button.cancel:hover {
  color: white;
  background: rgb(30, 30, 30);
}

.form {
  width: 100%;
}

p.inputDesc {
  font-weight: 300;
  font-size: 1rem;
  color: rgb(63, 63, 63);
}

.fileLabel {
  position: relative;
  user-select: none;
  margin-top: 3px;
  margin-bottom: 25px;
  width: 150px;
  height: 150px;
  color: white;
  text-transform: uppercase;
  text-align: center;
  display: block;
  background-color: rgb(250, 250, 250);
  border-radius: 4px;
  border: 1px solid rgb(80, 80, 80);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.point {
  cursor: pointer;
}

.inputFile {
  display: none;
}

.iconGroup {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: rgb(39, 39, 39);
}

.imageIcon {
  font-size: 2.5rem;
}

.imageDiv {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

img.image {
  width: 100%;
  height: 100%;
}

.removeImage {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.274);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.removeImage:hover {
  background: rgba(255, 255, 255, 1);
}
.removeImage svg {
  widows: 25px;
  height: 25px;
}
</style>