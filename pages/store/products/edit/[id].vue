<template>
  <div class="main">
    <h1 class="pageTitle">Editar Produto</h1>

    <form class="form">
      <div class="flexing">
        <label for="title">
          <p class="inputDesc">Título</p>
          <input ref="title" placeholder="Nome do produto" type="text" id="title" />
        </label>

        <label for="cod">
          <p class="inputDesc">Código</p>
          <input ref="code" placeholder="123" type="text" id="cod" />
        </label>

        <label for="categories" class="categories">
          <p class="inputDesc">Categoria</p>
          <select ref="category" name="categories" class="categories" id="categories">
            <option value="">Todos</option>
            <option :value="category.id" v-for="category of categoriesList" :key="category.id">
              {{ category.description }}
            </option>
          </select>
        </label>
      </div>

      <label for="price" class="labelPrice">
        <p class="inputDesc">Preço</p>
        <div class="float">
          <input ref="price" id="price" placeholder="0,00" type="text" />
          <span>R$</span>
        </div>
      </label>

      <label for="stock">
        <p class="inputDesc">Estoque</p>
        <input ref="stock" id="stock" type="text" placeholder="0" />
      </label>

      <label for="description">
        <textarea ref="description" id="description" placeholder="Descrição..."></textarea>
      </label>


      <div class="inputFileDiv">
        <p class="inputDesc">Adicionar Foto:</p>

        <label class="fileLabel" @change="(e) => setFile(e.target.files[0])" for="inputFile">
          <div :class="{ iconGroup: true, point: !image.url }">
            <div class="imageDiv" v-if="image.url">
              <img :src="image.url" alt="" class="image" />
              <div class="removeImage" @click="removeImage">
                <Icon name="lucide:trash-2" />
              </div>
            </div>

            <Icon class="imageIcon" v-else name="lucide:image-plus" />
          </div>

          <input type="file" id="inputFile" class="inputFile" :disabled="image.url ? true : false" />
        </label>
      </div>
    </form>
    <div class="buttons">
      <button @click="handleSubmit" class="button">Atualizar</button>
      <button class="button cancel" @click="cancel">Cancelar</button>
    </div>
  </div>
</template>
  
<script>
import state from "@/composables/state";
import categoriesFunctions from '~/composables/contextFunctions/categoriesFunctions';
import productsFunctions from '~/composables/contextFunctions/productsFunctions';

useSeoMeta({
  title: 'Editar Produto',
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
      categoriesList: []
    };
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
        const response = await productsFunctions.uploadImg(dataForm);

        if (response.code === 400) {
          throw new Error(response.content);
        }

        this.setImage({ ...response.content });
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
        code: Number(this.$refs.code.value),
        description: this.$refs.description.value,
        url: this.image.url,
        path: this.image.path,
      };

      try {
        const response = await productsFunctions.update(this.id, form);

        if (response.code === 400) {
          throw new Error();
        }

        navigateTo("/store/products");
      } catch (e) {
        alert("Ocorreu um erro ao salvar o produto");
        return;
      }
    },

    cancel() {
      navigateTo("/store/products");
    },
  },
  watch: {
    file(newValue, oldValue) {
      this.uploadImage();
    },
  },
  async mounted() {
    if (!Number(this.id)) {
      navigateTo("/store/products");
    }

    const { content: contentCategories } = await categoriesFunctions.download();
    this.categoriesList = contentCategories;

    const { content: productThis } = await productsFunctions.downloadOne(this.id);

    this.$refs.title.value = productThis.name;
    this.$refs.code.value = productThis.code;
    this.$refs.category.value = productThis.category_id;
    this.$refs.stock.value = productThis.stock;
    this.$refs.price.value = productThis.value / 100;
    this.$refs.description.value = productThis.description;

    this.setImage({
      url: productThis.image.url,
      path: productThis.image.path,
    });

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
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.233);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.center {
  margin-bottom: 15px;
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
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 15px;
}

.flexing {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.flexing label:first-of-type {
  flex-grow: 1;
}

.flexing label:nth-of-type(2) {
  flex-grow: auto;
  max-width: 100px;
}

.flexing label:last-of-type {
  width: auto;
}

p.inputDesc {
  font-weight: 300;
  font-size: 1rem;
  color: rgb(63, 63, 63);
}

.labelPrice {
  position: relative;
}

.labelPrice span {
  position: absolute;
  left: 5px;
  top: 33px;
  font-weight: 300;
  font-size: 1.2rem;
  color: rgb(173, 173, 173);
}

.labelPrice input {
  padding-left: 35px;
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

@media screen and (max-width: 550px) {
  .flexing {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
  }

  select {
    border: 1px solid #ccc;
  }

  .categories {
    width: 100% !important;
  }

  .flexing label:first-of-type {
    flex-grow: 0;
  }

  .flexing label:nth-of-type(2) {
    max-width: 100%;
  }

  .buttons {
    flex-direction: column;
  }

  .inputFileDiv {
    margin: 0 auto;
  }
}
</style>