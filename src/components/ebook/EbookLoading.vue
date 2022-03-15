<template>
  <div class="ebook-loading">
    <div class="ebook-loading-wrapper">
      <div
        class="ebook-loading-item"
        v-for="(item, index) in data"
        :key="index"
      >
        <div
          class="ebook-loading-line-wrapper"
          v-for="(subItem, subIndex) in item"
          :key="subIndex"
        >
          <div class="ebook-loading-line" ref="line"></div>
          <div class="ebook-loading-mask" ref="mask"></div>
        </div>
      </div>
      <div class="ebook-loading-center"></div>
    </div>
  </div>
</template>

<script>
import { px2rem } from "../../utils/utils";

export default {
  data() {
    return {
      data: [
        [{}, {}, {}],
        [{}, {}, {}],
      ],
        maskWidth: [
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
        ],
        lineWidth: [
          { value: 16 },
          { value: 16 },
          { value: 16 },
          { value: 16 },
          { value: 16 },
          { value: 16 },
        ],
        add: true,
    };
  },
    mounted() {
      this.task = setInterval(() => {
        this.$refs.mask.forEach((item, index) => {
          const mask = this.$refs.mask[index];
          const line = this.$refs.line[index];
          let maskWidth = this.maskWidth[index];
          let lineWidth = this.lineWidth[index];

          if (index === 0) {
            if (this.add && maskWidth.value < 16) {
              maskWidth.value++;
              lineWidth.value--;
            } else if (!this.add && lineWidth.value < 16) {
              maskWidth.value--;
              lineWidth.value++;
            }
          } else {
            if (this.add && maskWidth.value < 16) {
              let preMaskWidth = this.maskWidth[index - 1];
              if (preMaskWidth.value >= 8) {
                maskWidth.value++;
                lineWidth.value--;
              }
            } else if (!this.add && lineWidth.value < 16) {
              let preLineWidth = this.lineWidth[index - 1];
              if (preLineWidth.value >= 8) {
                maskWidth.value--;
                lineWidth.value++;
              }
            }
          }

          mask.style.width = `${px2rem(maskWidth.value)}rem`;
          mask.style.flex = `0 0 ${px2rem(maskWidth.value)}rem`;
          line.style.width = `${px2rem(lineWidth.value)}rem`;
          line.style.flex = `0 0 ${px2rem(lineWidth.value)}rem`;

          if (index === this.maskWidth.length - 1) {
            if (maskWidth.value === 16) {
              this.add = false;
            } else if (maskWidth.value === 0) {
              this.add = true;
            }
          }
        });
      }, 10);
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

//註釋方法為純CSS實現加載動畫，比用JS實現更為方便
// @keyframes line {
//   0%,
//   33% {
//     flex: 0 0 0;
//   }
//   66%,
//   100% {
//     flex: 1;
//   }
// }

// @keyframes mask {
//   0%,
//   33% {
//     flex: 1;
//   }
//   66%,
//   100% {
//     flex: 0 0 0;
//   }
// }

.ebook-loading {
  position: relative;
  z-index: 400;
  width: px2rem(63);
  height: px2rem(40);
  background: transparent;
  border: px2rem(2) solid #d7d7d7;
  border-radius: px2rem(3);
  .ebook-loading-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    .ebook-loading-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(7) 0;
      box-sizing: border-box;
      //   &:nth-child(1) {
      //     .ebook-loading-line-wrapper {
      //       &:nth-child(1) {
      //         .ebook-loading-mask,
      //         .ebook-loading-line {
      //           animation-delay: -0.5s;
      //         }
      //       }
      //       &:nth-child(2) {
      //         .ebook-loading-mask,
      //         .ebook-loading-line {
      //           animation-delay: -0.25s;
      //         }
      //       }
      //       &:nth-child(3) {
      //         .ebook-loading-mask,
      //         .ebook-loading-line {
      //           animation-delay: -0.1s;
      //         }
      //       }
      //     }
      //   }
      //   &:nth-child(2) {
      //     .ebook-loading-line-wrapper {
      //       &:nth-child(2) {
      //         .ebook-loading-mask,
      //         .ebook-loading-line {
      //           animation-delay: 0.2s;
      //         }
      //       }
      //       &:nth-child(3) {
      //         .ebook-loading-mask,
      //         .ebook-loading-line {
      //           animation-delay: 0.4s;
      //         }
      //       }
      //     }
      //   }
      .ebook-loading-line-wrapper {
        flex: 1;
        padding: 0 px2rem(7);
        box-sizing: border-box;
        @include center;
        .ebook-loading-line {
          flex: 0 0 px2rem(16);
          width: px2rem(16);
          //   animation: line 1s linear infinite alternate;
          height: px2rem(2);
          background: #d7d7d7;
        }
        .ebook-loading-mask {
          flex: 0 0 px2rem(0);
          width: 0;
          //   animation: mask 1s linear infinite alternate;
          height: px2rem(2);
        }
      }
    }
    .ebook-loading-center {
      position: absolute;
      left: 50%;
      width: px2rem(2);
      height: 100%;
      background: #d7d7d7;
    }
  }
}
</style>