<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <div
      class="ebook-reader-mask"
      @click="onMaskClick"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove.left="onMouseMove"
      @mouseup.left="onMouseEnd"
    ></div>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
import { themeList, flatten } from "../../utils/book";
import Epub from "epubjs";
import {
  getFontFamily,
  saveFontFamily,
  saveFontSize,
  getFontSize,
  saveTheme,
  getTheme,
  getLocation,
} from "../../utils/localStorage";
import { getLocalForage } from "../../utils/localForage";
global.ePub = Epub;
export default {
  mixins: [ebookMixin],
  computed: {
    themeList() {
      return themeList(this);
    },
  },
  methods: {
    //1-屬標進入
    //2-屬標進入後的移動
    //3-屬標從移動狀況鬆手
    //4-屬標還原
    onMouseEnter(e) {
      this.mouseStartTime = e.timeStamp;
      this.mouseState = 1;
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
    },
    onMouseMove(e) {
      if (this.mouseState === 1) {
        this.mouseState = 2;
      } else if (this.mouseState === 2) {
        let offsetY = 0;
        if (this.firstOffsetY) {
          offsetY = e.clientY - this.firstOffsetY;
          this.setOffsetY(offsetY);
        } else {
          this.firstOffsetY = e.clientY;
        }
      }
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
    },
    onMouseEnd(e) {
      if (this.mouseState === 2) {
        this.mouseState = 3;
        this.setOffsetY(0);
        this.firstOffsetY = null;
      } else {
        this.mouseState = 4;
      }
      const time = e.timeStamp - this.mouseStartTime;
      if (time < 100) {
        this.mouseState = 4;
      }
    },
    move(e) {
      let offsetY = 0;
      if (this.firstOffsetY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY;
        this.setOffsetY(offsetY);
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY;
      }

      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
    },
    moveEnd() {
      this.setOffsetY(0);
      this.firstOffsetY = null;
    },
    onMaskClick(e) {
      if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
        return;
      }
      const offsetX = e.offsetX;
      const width = window.innerWidth;

      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage();
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage();
      } else {
        this.toggleTitleAndMenu();
      }
    },
    //翻至下一頁
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation();
        });
        this.hideTitleAndMenu();
      }
    },
    //翻至上一頁
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation();
        });
        this.hideTitleAndMenu();
      }
    },
    //初始化樣式
    initTheme() {
      let defaultTheme = getTheme(this.fileName);
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name;
        saveTheme(this.fileName, defaultTheme);
      }
      this.setDefaultTheme(defaultTheme);
      this.themeList.forEach((theme) => {
        this.rendition.themes.register(theme.name, theme.style);
      });
      this.rendition.themes.select(defaultTheme);
    },
    //初始化字體
    initFontFamily() {
      const font = getFontFamily(this.fileName);
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily);
      } else {
        this.setDefaultFontFamily(font);
        this.currentBook.rendition.themes.font(font);
      }
    },
    //初始化字體大小
    initFontSize() {
      const fontSize = getFontSize(this.fileName);
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize);
      } else {
        this.setDefaultFontSize(fontSize);
        this.currentBook.rendition.themes.fontSize(fontSize);
      }
    },
    toggleTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1);
        this.setFontFamilyVisible(false);
      }
      this.setMenuVisible(!this.menuVisible);
    },
    initRendition() {
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method: "default",
      });
      const location = getLocation(this.fileName);
      this.display(location, () => {
        this.initTheme();
        this.initFontFamily();
        this.initFontSize();
        this.initGlobalStyle();
      });

      this.rendition.hooks.content.register((contents) => {
        Promise.all([
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
          ),
        ]).then(() => {});
      });
    },
    // initGesture() {
    //   this.rendition.on("touchstart", (event) => {
    //     this.touchstartX = event.changedTouches[0].clientX;
    //     this.touchStartTime = event.timeStamp;
    //   });
    //   this.rendition.on("touchend", (event) => {
    //     const offsetX = event.changedTouches[0].clientX - this.touchstartX;
    //     const time = event.timeStamp - this.touchStartTime;
    //     if (time < 500 && offsetX > 40) {
    //       this.prevPage();
    //     } else if (time < 500 && offsetX < -40) {
    //       this.nextPage();
    //     } else {
    //       this.toggleTitleAndMenu();
    //     }
    //     if (event.cancelable) event.preventDefault();
    //     event.stopPropagation();
    //   });
    // },
    async parseBook() {
      const cover = await this.book.loaded.cover;
      const metadata = await this.book.loaded.metadata;
      const nav = await this.book.loaded.navigation;
      const url = await this.book.archive.createUrl(cover);
      this.setCover(url);
      this.setMetadata(metadata);
      //將多層結構轉成單層一級導航
      const navItem = flatten(nav.toc);
      //將導航附上level層級
      function find(item, level = 0) {
        if (!item.parent) {
          return level;
        } else {
          return find(
            navItem.filter((parantItem) => parantItem.id === item.parent)[0],
            ++level
          );
        }
      }
      navItem.forEach((item) => {
        item.level = find(item);
      });
      this.setNavigation(navItem);
    },
    initEpub(url) {
      this.book = new Epub(url);
      this.setCurrentBook(this.book);
      this.initRendition();
      //this.initGesture();
      this.parseBook();
      this.book.ready.then(() => {
        return this.book.locations
          .generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          )
          .then(() => {
            this.setBookAvailable(true);
            this.refreshLocation();
          });
      });
    },
  },
  mounted() {
    const books = this.$route.params.fileName.split("|");
    const fileName = books[1];
    getLocalForage(fileName, (err, blob) => {
      if (!err && blob) {
        console.log("找到離線緩存電子書");
        //設置fileName
        this.setFileName(books.join("/")).then(() => {
          this.initEpub(blob);
        });
      } else {
        console.log("在線獲取電子書");
        //設置fileName
        this.setFileName(books.join("/")).then(
          () => {
            //const url = `${process.env.VUE_APP_EPUB_URL}/${this.fileName}.epub`;
            const url = `${process.env.VUE_APP_EPUB_URL}/${fileName}.epub`;
            this.initEpub(url);
          }
        );
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-reader-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
  }
}
</style>