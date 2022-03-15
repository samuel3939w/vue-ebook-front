<template>
  <div class="store-shelf">
    <shelf-title :title="$t('shelf.title')"></shelf-title>
    <scroll
      class="store-shelf-scroll-wrapper"
      :bottom="scrollBottom"
      :top="0"
      @onScroll="onScroll"
      ref="scroll"
    >
      <shelf-search></shelf-search>
      <shelf-list :data="showShelfList"></shelf-list>
    </scroll>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
import { storeShelfMixin } from "../../utils/mixin";
import ShelfTitle from "../../components/shelf/ShelfTitle.vue";
import Scroll from "../../components/common/Scroll.vue";
import ShelfSearch from "../../components/shelf/ShelfSearch.vue";
import ShelfList from "../../components/shelf/ShelfList.vue";
import ShelfFooter from "../../components/shelf/ShelfFooter.vue";

export default {
  mixins: [storeShelfMixin],
  components: { ShelfTitle, Scroll, ShelfSearch, ShelfList, ShelfFooter },
  computed:{
   showShelfList() {
      if (this.shelfSearchList.length>0) {
        return this.shelfSearchList;
      }
      return this.shelfList;
    },
  },
  watch: {
    isEditMode(isEditMode) {
      this.scrollBottom = isEditMode ? 48 : 0;
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },
  },
  data() {
    return {
      scrollBottom: 0,
    };
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY);
    },
  },
  mounted() {
    this.getShelfList();
    this.setShelfCategory([]);
    this.setCurrentType(1);
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.store-shelf {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: white;
  .store-shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
  }
}
</style>