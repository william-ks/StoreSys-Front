<template>
  <header>
    <div class="center">
      <h2 class="pageTitle">{{ pageStore.title }}</h2>
      <h3 class="userName" @click="userStore.logOut">
        <Icon name="ph:user-circle" />
      </h3>
    </div>
  </header>
</template>

<script>
import { useUser } from "~/store/user";
import { usePage } from "@/store/page";

export default {
  setup() {
    const userStore = useUser();
    const pageStore = usePage();

    return {
      userStore,
      pageStore,
    };
  },
};
</script>

<style scoped>
header {
  width: 100%;
  padding: 19px 0;
  background-color: white;
  position: relative;
  z-index: 0;
  border-bottom: 1px solid rgb(49, 127, 230);
  /* box-shadow: 0 5px 10px rgb(0 0 0 / 5%); */
}

header > .center {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  position: relative;
}

.pageTitle {
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  font-weight: 300;
  font-size: 1.7rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.541);
}

.userName {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  font-weight: 300;
  font-size: 1.1rem;
  text-transform: capitalize;
  cursor: pointer;
}

.userName svg {
  font-size: 2rem;
}
</style>