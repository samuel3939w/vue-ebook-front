<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :data="random"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <!-- 另一種方法 -->
        <!-- <img class="banner-img" :src="banner" alt=""> -->
        <div
          class="banner-img"
          :style="{ backgroundImage: `url(${banner})` }"
        ></div>
        <guess-you-like :data="guessYouLike"></guess-you-like>
        <recommend class="recommend" :data="recommend"></recommend>
        <featured
          class="featured"
          :titleText="$t('home.featured')"
          :btnText="$t('home.seeAll')"
          :data="featured"
        ></featured>
        <div
          class="category-list-wrapper"
          v-for="(item, index) in categoryList"
          :key="index"
        >
          <category-book :data="item"></category-book>
        </div>
        <category class="categories" :data="categories"></category>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../components/common/Scroll.vue";
import FlapCard from "../../components/home/FlapCard.vue";
import SearchBar from "../../components/home/SearchBar.vue";
import { storeHomeMixin } from "../../utils/mixin";
import { home } from "../../api/store";
import GuessYouLike from "../../components/home/GuessYouLike.vue";
import Recommend from "../../components/home/Recommend.vue";
import Featured from "../../components/home/Featured.vue";
import CategoryBook from "../../components/home/CategoryBook.vue";
import Category from "../../components/home/Category.vue";

export default {
  mixins: [storeHomeMixin],
  data() {
    return {
      scrollTop: 94,
      random: null,
      banner: "",
      guessYouLike: null,
      recommend: null,
      featured: null,
      categoryList: null,
      categories: null,
    };
  },
  components: {
    SearchBar,
    Scroll,
    FlapCard,
    GuessYouLike,
    Recommend,
    Featured,
    CategoryBook,
    Category,
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY);
      if (offsetY > 0) {
        this.scrollTop = 52;
      } else {
        this.scrollTop = 94;
      }
      this.$refs.scroll.refresh();
    },
  },
  async mounted() {
    const response = await home();
    if (response && response.status === 200) {
      const data = response.data;
      const randomIndex = Math.floor(Math.random() * data.random.length);
      this.random = data.random[randomIndex];
      this.banner = data.banner;
      this.guessYouLike = data.guessYouLike;
      this.recommend = data.recommend;
      this.featured = data.featured;
      this.categoryList = data.categoryList;
      this.categories = data.categories;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.store-home {
  width: 100%;
  height: 100%;
  .banner-wrapper {
    width: 100%;
    padding: px2rem(10);
    box-sizing: border-box;
    // 另一種方法
    // .banner-img{
    //   width: 100%;
    //   height: px2rem(160);
    // }
    .banner-img {
      width: 100%;
      height: px2rem(150);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .recommend {
      margin-top: px2rem(20);
    }
    .featured {
      margin-top: px2rem(20);
    }
    .category-list-wrapper {
      margin-top: px2rem(20);
    }
    .categories {
      margin-top: px2rem(20);
    }
  }
}
</style>