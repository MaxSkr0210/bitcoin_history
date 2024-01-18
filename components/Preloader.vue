<template>
  <div class="preloader" v-if="!loaded">
    <span class="loader"></span>
  </div>
</template>

<script setup lang="ts">
const store = datasStore();
const loaded = ref(false);

watch(
  () => store.period,
  async () => {
    loaded.value = false;
  }
);

watch(
  () => store.bitcoin,
  async () => {
    loaded.value = true;
  }
);
</script>

<style>
.preloader {
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  width: 58px;
  height: 58px;
  border: 8px solid #fff;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
