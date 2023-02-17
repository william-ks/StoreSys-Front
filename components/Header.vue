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
import { read } from "@/composables/local";

export default {
  data() {
    return {
      user: "user",
    };
  },
  mounted() {
    this.user = read("user");
  },
};
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