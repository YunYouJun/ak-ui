<template>
  <div class="demo-block-dark ak-card ak-card--outline">
    <p class="title">
      <slot name="title"></slot>
    </p>
    <p class="demo-example">
      <slot></slot>
    </p>
  </div>
</template>

<style lang="scss">
.demo-block-dark {
  padding: 0 1rem;
  margin: 1rem 0;
  background-image: url("/img/bg/dark.jpg");
  background-size: cover;
  background-position: center;
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
