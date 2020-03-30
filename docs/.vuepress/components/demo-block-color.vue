<template>
  <div class="demo-block-color ak-card ak-card--outline">
    <p class="title">
      <slot name="title"></slot>
    </p>
    <p class="demo-example">
      <slot></slot>
    </p>
  </div>
</template>

<style lang="scss">
.demo-block-color {
  padding: 0 1rem;
  margin: 1rem 0;
  background-image: url("/img/bg/chen.jpg");
  background-size: cover;
  &.ak-card {
    .title {
      color: white;
    }
  }
}
.demo-example {
  line-height: 1;
}
</style>
