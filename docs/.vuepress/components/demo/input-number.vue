<template>
  <div class="ak-input-number">
    <span role="button" class="ak-input-number__increase">
      <svg class="ak-icon" aria-hidden="true">
        <use xlink:href="#icon-add-line"></use>
      </svg>
    </span>
    <span role="button" class="ak-input-number__decrease">
      <svg class="ak-icon" aria-hidden="true">
        <use xlink:href="#icon-subtract-line"></use>
      </svg>
    </span>
    <span role="button" class="ak-input-number__max">最多</span>
    <span role="button" class="ak-input-number__min">最少</span>
    <input type="text" class="ak-input-number__inner" value="00:00:00" />
  </div>
</template>
