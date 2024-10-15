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
              <div class="wrap-item con">
                <router-link to="/readhistory">
                  <a href="javascript:;" class="list-item">
                    <div class="item-text">阅读历史</div>
                  </a>
                </router-link>
              </div>
            </div>
          </div>

          <div class="personal ">
            <div class="per">
              <div class="a-fadeinR">
                <span>阅读历史</span>
              </div>

              <div class="rig">
                <button class="app-button a-fadeinT" @click="(flag = false)" v-if="flag"><img src="../assets/img/编辑.svg"
                    alt="">
                  <p>编辑</p>
                </button>

                <div class="view a-fadeinB" v-if="!flag">
                  <div class="let">
                    <el-checkbox v-model="checked1" label="全选" size="large" @change="toggle" class="toggle" />
                    <!-- <p>全选</p> -->
                  </div>
                  <el-button @click="del" type="danger">删除</el-button>
                  <el-button type="primary" @click="primary">完成</el-button>
                </div>

              </div>
            </div>

            <!-- <div class="bg">
              <img src="../assets/img/无.png" alt="">
              </div> -->
            <el-scrollbar max-height="550px" class="a-fadeinB">
              <ul class="re-list">
                <li class="re-item" v-for="item in arr" :key="item">

                  <div class="re-wrap">
                    <div class="locked-hinter" v-if="!flag">
                      <el-checkbox v-model="item.checked" size="large" class="large"
                        @change="handleChecked(item, $event)" />
                    </div>
                    <router-link :to="'/detailspage?id=' + item.id">
                      <div class="re-img">

                        <img :src="item.img" alt="" />

                      </div>
                      <div>
                        <div class="re-text">{{ item.title }}</div>
                      </div>
                      <span class="re-tags">看到 {{ item.curent }} 话 / 更新至 {{ item.total }} 话</span>
                    </router-link>
                  </div>

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


import { reactive, toRefs, ref, onBeforeUnmount } from 'vue'

export default {
  setup() {
    const state = reactive({
      flag: true,
      new: null,
      arr: [],
      list: [


      ]
    })
    const checked1 = ref(false)
    const toggle = (value) => {
      state.arr.map(item => {
        item.checked = value;

      })

    }
    const handleChecked = (item) => {

      if (item.checked == false) {
        checked1.value = false
      }

    }
    const primary = () => {
      state.flag = !state.flag;
      checked1.value = false
      state.arr.map(item => {
        item.checked = checked1.value;

      })
    }
    const sta = () => {

      state.list = JSON.parse(window.localStorage.getItem("historyList"))
      if (state.list == null) {
        state.list = []
      }
      for (var i = 0; i < state.list.length; i++) {
        // state.list.push({
        //   checked:false 
        // })
        state.new = {
          title: state.list[i].title,
          total: state.list[i].total,
          img: state.list[i].img,
          curent: state.list[i].curent,
          id: state.list[i].id,
          checked: false
        }
        state.arr.push(state.new)
      }

      //  console.log(  state.arr);
    }
    const del = () => {
      checked1.value = false
      var arr = [];
      state.arr.map(function (v) {
        if (v.checked == false) {
          arr.push(v);
        }
      });
      state.arr = arr;

      console.log(state.arr);
      window.localStorage.setItem("historyList", JSON.stringify(arr));
    }

    sta()
    onBeforeUnmount(() => {


      // window.localStorage.setItem("historyList", JSON.stringify( state.arr.value));

    })
    return {
      ...toRefs(state),
      checked1,
      toggle,
      sta,
      handleChecked,
      primary,
      del

    }
  },

};
</script>

<style lang="scss" scoped>
@import "../assets/css/personal.css";

::v-deep .el-checkbox__inner {
  border-radius: 10px
}

.view {
  display: flex;


}

.app-button {
  position: absolute;
  right: -130px;
  background-color: transparent;
  border: 0;
  transform-origin: center center;
  cursor: pointer;
  padding: 1px 6px;
}

.let {


  width: 80px;

  .toggle {
    margin-right: 32px;
    margin-top: -3px;
  }

  p {
    font-size: 15px;
    width: 50px;
  }
}

.locked-hinter {
  position: absolute;
  width: 150px;
  height: 200px;
  font-size: 13px;
  color: #ddd;
  background-color: rgba(0, 0, 0, .7);
  animation-duration: .2s;
  z-index: 999;
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
      img {
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
        cursor: pointer;
        width: 150px;
        height: 243px;
        margin: 16px 15px 24px 0;
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
        width: 150px;

        .re-wrap {
          margin: 12px 0;
        }

        .re-img {
          width: 150px;
          height: 200px;
          margin-bottom: 5px;

          img {
            width: 100%;
            height: 100%;
            margin-bottom: 5px;
          }
        }

        .re-text {
          height: 19px;
          line-height: 19px;
          font-size: 14px;
          // width: 300px;
          //宽度一定要有，具体根据自己需求
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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

.per {
  position: relative;
  margin-bottom: 12px;
}

.rig {

  height: 26px;
  width: 70px;
  color: #ff0066;
  position: absolute;
  right: 135px;
  top: 10px;

  img {
    height: 16px;
    width: 16px;
    display: block;
  }

  p {
    font-size: 15px;
    color: #ff0066;
    margin-left: 18px;
    margin-top: -20px;

    display: block;
  }
}
</style>
