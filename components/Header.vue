<template>
  <header>
    <div class="center">
      <NuxtLink to="/" class="userName">
        <Icon name="ph:user-circle" />
        {{ user }}
      </NuxtLink>
    </div>
  </header>
</template>

<script>
import utils from "~/composables/utils";

export default {
  data() {
    return {
      user: "",
    };
  },
  mounted() {
    const { user } = utils();
    this.user = user;
  },
};
</script>

<style scoped>
header {
  width: 100%;
  padding: 21.8px 0;
  background-color: white;
  position: relative;
  z-index: 0;
  border-bottom: 1px solid rgb(49, 127, 230);
  /* box-shadow: 0 5px 10px rgb(0 0 0 / 5%); */
}

header>.center {
  display: flex;
  justify-content: flex-end;
  align-content: center;
}

.userName {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  font-weight: 300;
  font-size: 1.1rem;
  text-transform: capitalize;
}

.userName svg {
  font-size: 1.5rem;
}
</style>