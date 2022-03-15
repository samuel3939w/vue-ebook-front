<template>
  <div class="ebook-header">
    <span class="ebook-header-text">{{ getSectionName }}</span>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";

export default {
  mixins: [ebookMixin],
  computed: {
    getSectionName() {
      // if (this.section) {
      //   const sectionInfo = this.currentBook.section(this.section);
      //   if (
      //     sectionInfo &&
      //     sectionInfo.href &&
      //     this.currentBook &&
      //     this.currentBook.navigation
      //   ) {
      //     return this.currentBook.navigation.get(sectionInfo.href).label;
      //   }
      // }
      //因原本的方法無法讀取二級目錄所以改寫
      return this.section ? this.navigation[this.section].label : "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.ebook-header{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: px2rem(48);
  padding: 0 px2rem(15);
  box-sizing: border-box;
  overflow: hidden;
  @include left;
  .ebook-header-text{
      font-size: px2rem(12);
      color: #6d7178;
  }
}
</style>