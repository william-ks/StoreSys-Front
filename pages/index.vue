<template>
  <main class="main">
    <div class="center">
      <div class="box">
        <h1 class="title">Bem vindo!</h1>
        <p class="subTitle">Entre para continuar</p>

        <form v-on:submit="handleSubmit">
          <label for="email">
            <p class="inputDesc">E-mail</p>
            <input
              type="email"
              ref="email"
              id="email"
              placeholder="email@exemplo.com"
            />
          </label>

          <label class="password" for="password">
            <p class="inputDesc">Senha</p>
            <div class="flex">
              <input
                :type="seePass ? 'text' : 'password'"
                ref="pass"
                id="password"
                :placeholder="seePass ? 'senhaExemplo123' : '••••••••••••'"
              />

              <span class="eyes" v-on:click="changeView">
                <Icon v-if="!seePass" name="mdi:eye-off" />
                <Icon v-else name="mdi:eye" />
              </span>
            </div>
          </label>

          <button v-if="!loading" class="button">Entrar</button>
          <button v-else class="button">
            <Icon name="svg-spinners:bars-scale" />
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: false,
});
</script>

<script>
export default {
  name: "Login Page",
  data() {
    return {
      seePass: false,
      loading: false,
    };
  },
  methods: {
    changeView() {
      this.seePass = !this.seePass;
    },
    handleSubmit(e) {
      e.preventDefault();
      if (this.loading) {
        return;
      }

      try {
        this.loading = true;
      } catch (e) {
        alert("Error");
      } finally {
        setTimeout(() => {
          this.loading = false;
          navigateTo("/store/home");
        }, 1500);
      }
    },
  },
};
</script>

<style scoped>
main.main {
  width: 100%;
  height: 100vh;
}
main.main > .center {
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: clamp(200px, 100%, 500px);
  background: white;
  padding: 15px 4%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.233);
  border-radius: 10px;
}

.box .title {
  font-size: 3rem;
  text-align: center;
  font-weight: 300;
  color: rgb(68, 68, 68);
}

.box .subTitle {
  margin-top: -15px;
  color: rgb(60, 60, 60);
  text-align: center;
  font-weight: 200;

  margin-bottom: 15px;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.inputDesc {
  font-size: 0.8rem;
  font-weight: 300;
  color: #868686;
}

.password .flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.password .flex input {
  border: none;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.eyes {
  font-size: 25px;
  padding: 2px 5px 0 5px;
  height: 45px;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

@media screen and (max-width: 550px) {
  form {
    gap: 15px;
  }
}

@media screen and (max-width: 325px) {
  .box .title {
    font-size: 2rem;
    font-weight: 400;
  }
}
</style>
