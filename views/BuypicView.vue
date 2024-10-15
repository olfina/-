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
              <div class="wrap-item">
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
              <div class="wrap-item con">
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

          <div class="personal a-fadeinR">
            <span>已购漫画</span>
            <!-- <div class="bg">
            <img src="../assets/img/无.png" alt="">
            </div> -->
            <el-scrollbar max-height="550px">
              <ul class="re-list">
                <li class="re-item" v-for="item in list" :key="item">
                  <router-link :to="'/detailspage?id='+item.idList">
                    <div class="re-wrap">

                      <div class="re-img">

                        <img :src="item.img" alt="" />
                        <div class="ree-text">
                          <div class="re-text">{{ item.title }}</div>
                          <div class="bom">
                            <span class="re-tags">更新至 {{item.total}} 话</span>
                          <!-- <div class="re-tags">{{ item.mon }}</div> -->
                          </div>
                         
                        </div>

                      </div>

                    </div>
                  </router-link>
                </li>

              </ul>
              <div class="loow">
                <!-- <span>载入中... ヽ(✿ﾟ▽ﾟ)ノ</span> -->
                <!-- <span>木有更多惹 ◐▽◑</span> -->
                <span>这里空空如也 (´；ω；`)</span>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>


import { reactive, toRefs, } from 'vue'

export default {
  setup() {
    const state = reactive({
      new: null,
      arr: [],
      list: [
       

      ]
    })



    const sta = () => {

      state.list = JSON.parse(localStorage.getItem('pay'))
      console.log( state.list);

      if(state.list==null){
        state.list = [];
      }
      console.log( state.list);
    }

    sta()

    return {
      ...toRefs(state),


      sta,



    }
  },

};
</script>

<style lang="scss" scoped>
@import "../assets/css/personal.css";

.bom{
  bottom: 0;
  position: absolute;
}

.ree-text {
  width: 146px;
  height: 128px;
  padding-right: 18px;
  margin-left: 12px;
  vertical-align: top;
  position: relative;
}


.coupon {
  .personal {
    position: relative;

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
     mon {
        width: 150px;
        height: 200px;
        background-size: 100%;
        margin: 0 auto;
      }
    }

    .re-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;

      .re-item {
        width: 270px;
        height: 128px;
        margin: 16px 0 32px 0;
      }
    }

    .re-item:nth-child(5n+5) {
      margin-right: 0;
    }

    .re-list .re-item:nth-child(1),
    .re-list .re-item:nth-child(7) {
      padding-left: 0px;
    }

    .re-list .re-item:nth-child(6),
    .re-list .re-item:nth-child(12) {
      padding-right: 0px;
    }

    .re-item {
      a {
        display: block;
        width: 270px;
        height: 128px;

        .re-wrap {
          margin: 12px 0;
        }

        .re-img {
          width: 270px;
          height: 128px;
          margin-bottom: 5px;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;

          img {
            width: 96px;
            height: 128px;
            margin-bottom: 5px;
            display: block;
          }
        }

        .re-text {
          padding-right: 16px;
          // width: 144px;
          height: 40px;
          line-height: 1.3;
          font-size: 16px;
          // width: 300px;
          //宽度一定要有，具体根据自己需求
          overflow: hidden;
          white-space: normal;
          text-overflow: ellipsis;
          text-align: justify;
          position: relative;
        }

        .re-text:before {
          content: "...";
          position: absolute;
          right: 0;
          bottom: 0;
        }

        .re-text:after {
          content: "";
          position: absolute;
          right: 0;
          width: 20px;
          height: 40px;
          margin-top: 5px;
          background: #fff;
        }

        .re-tags {
          height: 26px;
          line-height: 26px;
          font-size: 12px;
          color: #999999;
        }
      }
    }

    .loow {
      text-align: center;
      padding: 20px 0;
      color: #777;

      span {
        font-size: 12px;
      }
    }
  }
}
</style>
