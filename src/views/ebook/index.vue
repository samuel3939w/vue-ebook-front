<template>
  <div class="ebook" ref="ebook">
    <ebook-title></ebook-title>
    <ebook-header></ebook-header>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
    <ebook-book-mark></ebook-book-mark>
    <ebook-footer></ebook-footer>
  </div>
</template>

<script>
import EbookMenu from "../../components/ebook/EbookMenu.vue";
import EbookReader from "../../components/ebook/EbookReader.vue";
import EbookTitle from "../../components/ebook/EbookTitle.vue";
import { ebookMixin } from "../../utils/mixin";
import { getReadTime, saveReadTime } from "../../utils/localStorage";
import EbookBookMark from "../../components/ebook/EbookBookMark.vue";
import EbookHeader from '../../components/ebook/EbookHeader.vue';
import EbookFooter from '../../components/ebook/EbookFooter.vue';
export default {
  mixins: [ebookMixin],
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu,
    EbookBookMark,
    EbookHeader,
    EbookFooter,
  },
  watch: {
    offsetY(v) {
      if (!this.menuVisible && this.bookAvailable) {
        if (v > 0) {
          this.move(v);
        } else if (v === 0) {
          this.restore();
        }
      }
    },
  },
  methods: {
    restore() {
      this.$refs.ebook.style.top = 0;
      this.$refs.ebook.style.transition = "all .2s linear";
      setTimeout(() => {
        this.$refs.ebook.style.transition = "";
      }, 200);
    },
    move(v) {
      this.$refs.ebook.style.top = v + "px";
    },
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName);
      if (!readTime) {
        readTime = 0;
      }
      this.task = setInterval(() => {
        readTime++;
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime);
        }
      }, 1000);
    },
  },
  mounted() {
    this.startLoopReadTime();
  },
  beforeDestroy() {
    if (this.task) {
      clearInterval(this.task);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.ebook {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>