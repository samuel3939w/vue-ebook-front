<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="settingVisible === 1">
      <div class="setting-theme">
        <div
          class="setting-theme-item"
          v-for="(item, index) in themeList"
          :key="index"
          @click="setTheme(index)"
        >
          <div
            class="preview"
            :class="{ selected: item.name === defaultTheme }"
            :style="{ background: item.style.body.background }"
          ></div>
          <div class="text" :class="{ selected: item.name === defaultTheme }">
            {{ item.alias }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
import { themeList } from "../../utils/book";
import { saveTheme } from "../../utils/localStorage";
export default {
  mixins: [ebookMixin],
  computed: {
    themeList() {
      return themeList(this);
    },
  },
  methods: {
    setTheme(index) {
      const theme = this.themeList[index];
      this.setDefaultTheme(theme.name).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme);
        this.initGlobalStyle()
      });
      saveTheme(this.fileName, theme.name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 101;
  width: 100%;
  height: px2rem(90);
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-theme {
    display: flex;
    height: 100%;
    .setting-theme-item {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: px2rem(5);
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: px2rem(1) solid #ccc;
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(10) rgba(0, 0, 0, 0.15);
        }
      }
      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        color: #eee;
        @include center;
        &.selected {
          color: #333;
        }
      }
    }
  }
}
</style>