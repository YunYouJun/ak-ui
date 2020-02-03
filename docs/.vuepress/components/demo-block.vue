<template>
  <div class="demo-block ak-card ak-card--outline">
    <p class="title">
      <slot name="title"></slot>
    </p>
    <p class="demo-example">
      <slot></slot>
    </p>
  </div>
</template>

<style>
.demo-block {
  padding: 0 1rem;
}
.demo-example {
  line-height: 1;
}
</style>