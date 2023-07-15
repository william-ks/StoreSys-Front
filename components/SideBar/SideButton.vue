<template>
  <label for="checkbox" class="hamburger">
    <input :checked="isChecked" type="checkbox" @click="$emit('toggleSide')" id="checkbox" />
    <span class="line line--top"></span>
    <span class="line line--middle"></span>
    <span class="line line--bottom"></span>
  </label>
</template>

<script>
export default {
  props: {
    isChecked: Boolean
  }
};
</script>

<style scoped>
#checkbox {
  display: none;
}

.hamburger {
  position: relative;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.line {
  position: absolute;
  width: 21px;
  height: 2px;
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  transition: transform 0.25s, opacity 0.35s;
}

.line--top {
  transform: translateY(-7px);
}

.line--bottom {
  transform: translateY(7px);
}

#checkbox:checked~.line--top {
  transform: rotate(45deg);
}

#checkbox:checked~.line--middle {
  transform: rotate(16deg);
  opacity: 0;
}

#checkbox:checked~.line--bottom {
  transform: rotate(-45deg);
}
</style>