<template>
  <div class="shelf-item-category">
    <div class="shelf-item-category-list" v-if="data.itemList.length > 0">
      <div
        class="shelf-item-category-item"
        v-for="(item, index) in data.itemList"
        :key="index"
      >
        <span v-if="ifShowItem(index)">
          <img :src="item.cover" class="shelf-item-category-img" />
        </span>
      </div>
    </div>
    <div class="shelf-item-category-bg" v-else>
      <span class="icon-book2"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  methods: {
    ifShowItem(index) {
      if (index >= 9) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.shelf-item-category {
  width: 100%;
  height: 100%;
  .shelf-item-category-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    padding-top: px2rem(5);
    box-sizing: border-box;
    .shelf-item-category-item {
      flex: 0 0 33.33%;
      width: 33.33%;
      height: 33.33%;
      &:nth-child(3n + 1) {
        padding: px2rem(0) px2rem(2.5) px2rem(5) px2rem(5);
        box-sizing: border-box;
      }
      &:nth-child(3n + 2) {
        padding: px2rem(0) px2rem(2.5) px2rem(5) px2rem(2.5);
        box-sizing: border-box;
      }
      &:nth-child(3n + 3) {
        padding: px2rem(0) px2rem(5) px2rem(5) px2rem(2.5);
        box-sizing: border-box;
      }
      .shelf-item-category-img {
        height: 100%;
        width: 100%;
      }
    }
  }
  .shelf-item-category-bg {
    width: 100%;
    height: 100%;
    background: white;
    font-size: px2rem(30);
    color: #ccc;
    @include center;
  }
}
</style>