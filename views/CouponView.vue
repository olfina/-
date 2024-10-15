<template>
  <div class="coupon">
    <main>
      <meta name="referrer" content="no-referrer" />
      <div class="container">
        <div class="nav clearfix">
          <div class="wrap">
            <div class="wrap-list">
              <div class="wrap-item ">
                <router-link to="/user">
                  <a href="javascript:;" class="list-item">
                    <div class="item-text">账户信息</div>
                  </a>
                </router-link>
              </div>
              <div class="wrap-item con">
                <router-link to="/coupon">
                  <a href="javascript:;" class="list-item">
                    <div class="item-text">我的漫读券</div>
                  </a>
                </router-link>
              </div>
              <div class="wrap-item">
                <router-link to="/free">
                  <a href="javascript:;" class="list-item">
                    <div class="item-text">我的限免卡</div>
                  </a>
                </router-link>
              </div>
              <div class="wrap-item">
                <router-link to="/discount">
                  <a href="javascript:;" class="list-item">
                    <div class="item-text">我的打折卡</div>
                  </a>
                </router-link>
              </div>
              <div class="wrap-item">
                <router-link to="/buypic">
                  <a href="javascript:;" class="list-item">
                    <div class="item-text">已购漫画</div>
                  </a>
                </router-link>
              </div>
              <div class="wrap-item">
                <router-link to="/collection">
                  <a href="javascript:;" class="list-item">
                    <div class="item-text">我的追漫</div>
                  </a>
                </router-link>
              </div>
              <div class="wrap-item">
                <router-link to="/readhistory">
                  <a href="javascript:;" class="list-item">
                    <div class="item-text">阅读历史</div>
                  </a>
                </router-link>
              </div>
            </div>
          </div>

          <div class="personal">
            <span>我的漫读券<i>0张</i></span>
            <div class="ycoupon">漫读券可以用于阅读相关的付费漫画</div>
            <div class="bg">
            <img src="../assets/img/无.png" alt="">
            </div>
            <div class="loow">
              <!-- <span>载入中... ヽ(✿ﾟ▽ﾟ)ノ</span> -->
              <!-- <span>木有更多惹 ◐▽◑</span> -->
              <span>这里空空如也 (´；ω；`)</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      lists: [
        "账户信息",
        "我的漫读券",
        "我的限免卡",
        "我的打折卡",
        "已购漫画",
        "我的收藏",
        "阅读历史",
      ],
    };
  },
  methods: {
    chang(k) {
      this.id = k;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/personal.css";
.coupon {
   .personal {
    span {
      font-size: 24px;
      i {
        font-style: normal;
        font-size: 14px;
      }
    }
    .ycoupon {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.34);
      margin-top: 20px;
    }

    .bg {
      img{
        width: 240px;
        height: 200px;
        background-size: 100%;
        margin: 0 auto;
      }
    
    }
    .loow {
        text-align: center;
        padding: 20px 0;
        color: #777;
        span{
            font-size: 12px;
        }
    }
  }
}
</style>
