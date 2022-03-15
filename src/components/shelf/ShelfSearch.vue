<template>
  <div
    class="shelf-search-wrapper"
    :class="{ 'search-top': ifInputClicked, 'show-shadow': ifShowShadow }"
  >
    <div class="shelf-search" :class="{ 'search-top': ifInputClicked }">
      <div class="search-wrapper">
        <div class="icon-search-wrapper">
          <span class="icon-search icon"></span>
        </div>
        <div class="search-input-wrapper">
          <input
            class="search-input"
            type="text"
            :placeholder="$t('shelf.search')"
            v-model="searchText"
            @click="onSearchClick"
            @keyup.13.exact="search"
          />
        </div>
        <div
          class="icon-clear-wrapper"
          v-if="searchText.length > 0"
          @click="clearSearchText"
        >
          <span class="icon-close-circle-fill icon"></span>
        </div>
      </div>
      <div
        class="icon-locale-wrapper"
        v-if="!ifInputClicked"
        @click="switchLocale"
      >
        <span class="icon-cn icon" v-if="lang === 'cn'"></span>
        <span class="icon-en icon" v-else></span>
      </div>
      <div class="cancel-btn-wrapper" @click="onCancelClick" v-else>
        <span class="cancel-text">{{ $t("shelf.cancel") }}</span>
      </div>
    </div>
    <transition name="hot-search-move">
      <div class="shelf-search-tab-wrapper" v-if="ifInputClicked">
        <div
          class="shelf-search-tab-item"
          v-for="item in tabs"
          :key="item.id"
          @click="onTabClick(item.id)"
        >
          <span
            class="shelf-search-tab-text"
            :class="{ 'selected-tab': selectedTab === item.id }"
            >{{ item.text }}</span
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { setLocalStorage } from "../../utils/localStorage";
import { storeShelfMixin } from "../../utils/mixin";

export default {
  mixins: [storeShelfMixin],
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0 && this.ifInputClicked) {
        this.ifShowShadow = true; //顯示陰影
      } else {
        this.ifShowShadow = false; //隱藏陰影
      }
    },
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
    tabs() {
      return [
        { id: 1, text: this.$t("shelf.default") },
        { id: 2, text: this.$t("shelf.progress") },
        { id: 3, text: this.$t("shelf.purchase") },
      ];
    },
  },
  data() {
    return {
      ifInputClicked: false,
      searchText: "",
      selectedTab: 1,
      ifShowShadow: false,
    };
  },
  methods: {
    async search() {
      const shelfSearchList=this.shelfList.filter((item) => {
        const search=this.searchText.toLowerCase()
        if (item.type === 3) {
          return;
        } else if (item.originalName.toLowerCase().indexOf(search) >= 0) {
          return item;
        }
      });
      this.setShelfSearchList(shelfSearchList)
    },
    onTabClick(id) {
      this.selectedTab = id;
    },
    clearSearchText() {
      this.searchText = "";
    },
    switchLocale() {
      if (this.$i18n.locale === "cn") {
        this.$i18n.locale = "en";
      } else {
        this.$i18n.locale = "cn";
      }
      setLocalStorage("locale", this.$i18n.locale);
    },
    onSearchClick() {
      this.ifInputClicked = true;
      this.setShelfTitleVisible(false);
    },
    onCancelClick() {
      this.ifInputClicked = false;
      this.setShelfTitleVisible(true);
      this.setShelfSearchList([])
      this.searchText=''
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.shelf-search-wrapper {
  position: relative;
  z-index: 105;
  width: 100%;
  height: px2rem(94);
  font-size: px2rem(16);
  background: white;
  &.show-shadow {
    box-shadow: 0 px2rem(2) px2rem(2) rgba(0, 0, 0, 0.1);
  }
  &.search-top {
    position: fixed;
    top: 0;
    left: 0;
  }
  .shelf-search {
    position: absolute;
    display: flex;
    top: px2rem(42);
    left: 0;
    z-index: 105;
    width: 100%;
    height: px2rem(52);
    transition: top 0.3s linear;
    &.search-top {
      top: 0;
    }
    .search-wrapper {
      display: flex;
      flex: 1;
      margin: px2rem(8) 0 px2rem(8) px2rem(10);
      border: px2rem(1) solid #ccc;
      border-radius: px2rem(3);
      .icon-search-wrapper {
        flex: 0 0 px2rem(22);
        @include right;
        .icon-search {
          font-size: px2rem(14);
        }
      }
      .search-input-wrapper {
        flex: 1;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        @include center;
        .search-input {
          width: 100%;
          border: none;
          font-size: px2rem(14);
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            font-size: px2rem(14);
            color: #ccc;
          }
        }
      }
      .icon-clear-wrapper {
        flex: 0 0 px2rem(24);
        @include left;
        .icon-close-circle-fill {
          font-size: px2rem(14);
          color: #ccc;
        }
      }
    }
    .icon-locale-wrapper {
      flex: 0 0 px2rem(55);
      @include center;
      .icon-cn,
      .icon-en {
        font-size: px2rem(22);
        color: #666;
      }
    }
    .cancel-btn-wrapper {
      flex: 0 0 px2rem(55);
      @include center;
      .cancel-text {
        font-size: px2rem(14);
        color: $color-blue;
      }
    }
  }
  .shelf-search-tab-wrapper {
    position: absolute;
    z-index: 105;
    top: px2rem(52);
    left: 0;
    display: flex;
    height: px2rem(42);
    width: 100%;
    .shelf-search-tab-item {
      flex: 1;
      @include center;
      .shelf-search-tab-text {
        font-size: px2rem(12);
        color: #999;
        &.selected-tab {
          color: $color-blue;
        }
      }
    }
  }
}
</style>