<template>
  <div class="custom">
    <SideBar :sideBar="openedSideBar" @toggleSide="toggleSideBar" />
    <main class="content">
      <Header />
      <div class="full">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openedSideBar: false,
    };
  },
  methods: {
    toggleSideBar() {
      this.openedSideBar = !this.openedSideBar;
    },
  },
};
</script>

<style scoped>
.custom {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.content {
  width: 100%;
  min-height: 100vh;
  padding-left: 35px;
}

.full {
  width: 100%;
  padding-bottom: 15px;
}
</style>