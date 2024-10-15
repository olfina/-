<template>
  <div class="user">
    <main>
      <meta name="referrer" content="no-referrer" />
      <div class="container">
        <div class="nav clearfix">
          <div class="wrap">
            <div class="wrap-list">
              <div class="wrap-item con">
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
            <h1>账户信息</h1>
            <div class="user-info-component user-info">
              <div class="left-part">
                <div class="user-avatar">
                  <img :src="HeadPortrait" alt="" />
                </div>
                <el-dialog v-model="flag1" title="漫币充值" width="450px">
                  <div class="panel-hinter">
                    <span class="reset-coin panel-title-item">余额</span>
                    <span class="coin-image panel-title-item"></span>
                    <span class="reset-number panel-title-item">{{ num }}</span>
                  </div>
                  <ul class="list-page">
                    <li class="list-item " @click="(boxId = item.id), (boxnum = item.num)"
                      :class="{ con: boxId == item.id }" v-for="(item, index) in lists" :key="index">
                      <div class="gold-amount">
                        <img src="../assets/img/漫币.png" alt="" class="v-middle">
                        <span class=" gold">{{ item.num }}</span>
                      </div>
                      <div class="recharge-amount " :class="{ con: boxId == item.id }">￥{{ item.money }}</div>
                    </li>
                  </ul>
                  <div class="recharge-summary">
                    <span class="title-text">充值漫币：</span>
                    <span class="recharge-amount">{{ boxnum }}</span>
                  </div>
                  <div>
                    <button class="submit-btn" @click="RechargeData">
                      充值
                    </button>
                  </div>
                </el-dialog>
                <el-dialog v-model="flag2" width="25%" title="确认要充值吗" center style="  margin-top:256px ;">

                  <div class="dialog-footer1">
                    <el-button @click="innerVisible = false">不要，点错了</el-button>
                    <el-button type="primary" @click="open">
                      确认支付
                    </el-button>
                  </div>

                </el-dialog>
                <div class="user-info">
                  <span class="nickname">{{ UserName }}</span>
                  <span class="uid"> UID:505258359 </span>
                </div>
              </div>
              <div class="right-part">
                <div class="coin-info">
                  <div class="info-item">
                    <img src="../assets/img/漫币.png" class="coin-icon" />
                    <span class="b-coin">漫币：</span>
                    <span class="coin-remain-count">{{ money }}</span>
                  </div>
                  <button class="recharge-btn app-button pointer" @click="OpenFun">
                    立即充值
                  </button>
                  <div class="info-item">
                    <img src="../assets/img/漫读券.png" class="coin-icon" />
                    <span class="b-coin">漫读券：</span>
                    <span class="coin-remain-count">{{ reading }}</span>
                  </div>
                  <div class="info-item">
                    <img src="../assets/img/限免卡.png" class="coin-icon" />
                    <span class="b-coin">限免卡：</span>
                    <span class="coin-remain-count"> {{ free }}</span>
                  </div>
                  <div class="info-item">
                    <img src="../assets/img/打折卡.png" class="coin-icon" />
                    <span class="b-coin">打折卡：</span>
                    <span class="coin-remain-count">{{ discount }}</span>
                  </div>
                </div>
                <div class="unuseable">
                  <span class="text-content">
                    <span class="unuseable-text"> IOS漫币: </span>
                    <span class="unuseable-gold">{{ 0 }}(不可用)</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="pivot_component data_list_component data_list">


              <ul class="pivot_headers">
                <li class="pivot_header_item selected">充值记录</li>
                <li class="pivot_header_item">漫币消费</li>
                <li class="pivot_header_item">漫读券消费</li>
                <li class="pivot_header_item">限免卡使用</li>
                <li class="pivot_header_item">打折卡使用</li>
              </ul>

              <div class="pivot_body">
                <div class="recharge_history">

                  <div class="items_control">
                    <div class="pre">
                      <el-scrollbar max-height="350px">
                        <ul>
                          <li class="list_item" v-for="(item, index) in box" :key="index">
                            <div class="text_info">
                              <div class="recharge_icon we_chat">
                                <img src="../assets/img/微信支付.png" alt="" />
                              </div>
                              <div class="ib">
                                <div class="display_text">微信</div>
                                <div class="recharge_date">{{ item.time }}</div>
                              </div>
                            </div>
                            <div class="coin_info">
                              <div class="vertical_center">
                                <div class="tc">
                                  <div class="recharge_count">+{{ item.num }}</div>
                                  <img src="../assets/img/漫币.png" class="coin_icon" />
                                </div>
                              </div>
                            </div>
                          </li>

                        </ul>


                        <div class="status_controls">
                          <span style="display: none">载入中... ●ω●</span>
                          <span>木有更多惹 ʅ（´◔౪◔）ʃ</span>
                        </div>
                      </el-scrollbar>
                      <div class="status_controls" style="display: none">
                        <div class="error_hinter a_move_in_left">
                          <p>数据载入失败，非常抱歉 (´；ω；`)</p>
                          <p>您可以点击下方按钮进行重试喔 (●'◡'●)ﾉ♥</p>
                          <button class="manga_button error">重试</button>
                        </div>
                      </div>
                    </div>
                    <div class="pivot_foot" style="display: none">
                      <div>
                        <div class="empty_hinter">
                          <div class="vertical_center">
                            <div class="dp_table_cell">
                              <img src="../assets/img/无.png" />
                              <p class="supporting_text">
                                什么都没有 (´；ω；`)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="status_controls" style="display: none">
                        载入中... ヽ(✿ﾟ▽ﾟ)ノ
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import { useStore } from 'vuex'

// import { ElMessage,  } from 'element-plus'
export default {
  setup() {
    const state = reactive({
      id: 0,
      // newTime: null,
      boxId: 1,
      boxnum: 100,
      lists: [
        {
          id: 1,
          num: 100,
          money: 1
        },
        {
          id: 2,
          num: 600,
          money: 6

        },
        {
          id: 3,
          num: 3000,
          money: 30
        },
        {
          id: 4,
          num: 19800,
          money: 198
        },
        {
          id: 5,
          num: 32800,
          money: 328
        },
        {
          id: 6,
          num: 64800,
          money: 648
        },
      ],
      box: null
    })
    const flag1 = ref(false);
    const flag2 = ref(false);

    const money = ref(0);
    const reading = ref(0);
    const free = ref(0);
    const discount = ref(0);

    const time = ref(null);

    const store = useStore();

    const HeadPortrait = ref(null);
    const UserName = ref(null);

    const recharge = (() => {

      if (localStorage.getItem('token')) {
        let tokenLists = JSON.parse(localStorage.getItem('token'));
        money.value = tokenLists[0].money;
        reading.value = tokenLists[0].reading;
        free.value = tokenLists[0].free;
        discount.value = tokenLists[0].discount;
      }

      store.commit('User/DateFun');
      // 获取当前时间
      time.value = store.state.User.date_time;
    })()

    const open = () => {
      store.commit('User/RechargeFun', state.boxnum)
      money.value = (Number(money.value) + Number(state.boxnum));

      flag1.value = store.state.User.dialogVisible;
      flag2.value = store.state.User.innerVisible;

      if (localStorage.getItem('box')) {
        state.box = JSON.parse(localStorage.getItem('box'));
      }
      // console.log(state.box);
    }

    if (localStorage.getItem('token')) {
      let arr = JSON.parse(localStorage.getItem('token'));
      // console.log(arr, '---', arr[0].imgurl);
      HeadPortrait.value = arr[0].imgurl;
      UserName.value = arr[0].username;
    }

    if (localStorage.getItem('box')) {
      state.box = JSON.parse(localStorage.getItem('box'));
    }

    const chang = (k) => {
      state.id = k
    }

    const OpenFun = () => {
      store.commit('User/openFun', [1]);

      flag1.value = store.state.User.dialogVisible;

      // console.log(flag1.value);
    }

    const RechargeData = () => {
      store.commit('User/openFun', [2]);

      flag2.value = store.state.User.innerVisible;
    }
    return {
      ...toRefs(state),
      money,
      reading,
      free,
      discount,
      time,
      chang,
      flag1,
      flag2,
      open,
      HeadPortrait,
      UserName,
      recharge,
      OpenFun,
      RechargeData,
    }
  },

};
</script>

<style lang="scss" scoped>
@import "../assets/css/personal.css";

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

::v-deep .el-dialog__header {
  padding: var(--el-dialog-padding-primary);
  padding-bottom: 10px;
  margin-right: 16px;
  word-break: break-all;
  width: 90%;
}

.recharge-summary {
  margin: 26px 0 0;
  height: 19px;
  line-height: 19px;

  .title-text {
    font-size: 14px;
    color: #222;
    vertical-align: middle;
  }

  .recharge-amount {
    font-size: 20px;
    font-family: Arial-BoldMT;
    color: rgba(0, 0, 0, .87);
  }
}

.submit-btn {
  width: 100%;
  height: 48px;
  background-color: #ffa015;
  font-size: 18px;
  color: #fff;
  border-radius: 3px;
  margin-top: 26px;
  border: 1px solid;
}

button {
  cursor: pointer;

}

.gold-amount {
  vertical-align: middle;
  font-size: 14px;
  line-height: 16px;
  height: 16px;
  margin-top: 10px;
}

.gold {
  font-size: 10px;
}

.list-page {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .list-item {
    padding-left: 40px;
    width: 120px;
    height: 60px;
    margin-bottom: 12px;
    border: 1px solid rgba(0, 0, 0, .12);
    border-radius: 3px;
    cursor: pointer;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;

    .v-middle {
      vertical-align: middle;
      margin-right: 3px;
      position: relative;
      top: 2px;
      width: 12px;
      float: left;
    }

    .recharge-amount {
      font-size: 12px;
      line-height: 16px;
      height: 16px;
      color: rgba(0, 0, 0, .34);
      margin-top: 2px;
      margin-left: 6px;
      text-align: left;

    }

    .con {
      border-color: #ffa015;
      color: #ffa015;
    }
  }

  .con {
    border-color: #ffa015;
    color: #ffa015;
  }

  .list-item:nth-of-type(3n - 1) {
    margin: 0 12px 12px;
  }
}

.panel-hinter {
  margin-bottom: 16px;

  height: 16px;
  line-height: 16px;

  .reset-coin {
    font-size: 12px;
    color: rgba(0, 0, 0, .56);
    margin-right: 8px;
    float: left;
  }

  .reset-number {
    font-size: 15px;
    color: rgba(0, 0, 0, .56);
    line-height: 16px;
    margin: 0 8px 0 4.5px;
  }
}

.coin-image {
  width: 15.5px;
  height: 15.5px;
  background: url("../assets/img/漫币.png");
  background-size: contain;
  float: left;
}

.dialog-footer1 button:first-child {
  margin-left: 0px;
  margin-right: 10px;


}

.dialog-footer1 button:last-child {
  margin-right: 0px;
  float: right;

}

.data_list {
  height: calc(100% - 146px);
  padding-top: 25px;
  box-sizing: border-box;

  .pivot_headers {
    height: 52px;
    margin: 0 15px 0 0;
    padding: 0;
    border-bottom: 1px solid #ddd;
  }

  .pivot_header_item {
    padding: 16px 24px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.56);
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    transition: all 0.2s cubic-bezier(0.22, 0.58, 0.12, 0.98);

    &:active {
      color: #ff0066;
    }

    &:first-child {
      padding-left: 0;
    }

    &.selected {
      color: #ff0066;
    }
  }

  .pivot_body {
    height: calc(100% - 52px);
    position: relative;

    .recharge_history {
      height: 100%;
      position: relative;

      .fixed {
        z-index: 1;
        position: fixed;

        .dropbox_component {
          width: 100px;
          height: 32px;
          position: relative;
          border: 1px solid #e3e8ec;
          font-size: 12px;
          background-color: #fff;
          cursor: pointer;
          border-radius: 4px;
          transform: translate(680%, -125%);
          animation-duration: 0.2s;
          animation: fade-in 0.4s linear;

          .current {
            padding-left: 8px;
            height: 32px;
            line-height: 32px;
            color: #646c7a;
          }

          .triangle {
            display: block;
            width: 32px;
            height: 32px;
            position: absolute;
            text-align: center;
            line-height: 32px;
            top: 0;
            right: 0;
            transition: all 0.4s cubic-bezier(0.22, 0.58, 0.12, 0.98);

            .iconfont {
              font-size: 12px;
            }
          }

          .data_list {
            position: absolute;
            top: 32px;
            left: -1px;
            width: 100%;
            max-height: 160px;
            padding: 0;
            margin: 0;
            font-size: inherit;
            border: 1px solid #ddd;
            border-top: 0;
            background: #fff;
            overflow-y: auto;
            box-shadow: 0 1px 2px 0 rgb(105 115 133 / 22%);
            border-radius: 0 0 4px 4px;

            li {
              padding: 10px 0 10px 8px;
              color: #999;
            }
          }
        }
      }

      .items_control {
        padding-right: 20px;
        box-sizing: border-box;
        height: 100%;
        position: relative;
        overflow: hidden !important;
        overflow-anchor: none;
        touch-action: auto;

        .pre {
          position: relative;

          .list_item {
            width: 98%;
            display: flex;
            padding: 15px 0;
            margin-right: 15px;
            border-bottom: 1px solid #ddd;
            position: relative;
            animation: move-in-top 0.4s cubic-bezier(0.22, 0.58, 0.12, 0.98);
            align-items: center;
            justify-content: space-between;

            .text_info {
              display: flex;

              .recharge_icon {
                width: 36px;
                height: 36px;
                margin-right: 12px;
              }

              .ib {
                display: inline-block;
                vertical-align: middle;

                .display_text {
                  margin-bottom: 5px;
                  font-size: 14px;
                  color: rgba(0, 0, 0, 0.87);
                }

                .recharge_date {
                  font-size: 12px;
                  color: rgba(0, 0, 0, 0.34);
                }
              }
            }

            .coin_info {
              width: 84px;
              // height: 68px;
              // position: absolute;
              // right: 0;
              // top: 47px;

              .vertical_center {
                width: 100%;
                display: table;
                height: 100%;
                margin: 0 auto;

                .tc {
                  // display: table-cell;
                  // vertical-align: middle;
                  display: flex;
                  line-height: 1;
                  align-items: center;
                  justify-content: flex-end;

                  .recharge_count {
                    font-size: 18px;
                    color: rgba(0, 0, 0, 0.87);
                    display: inline-block;
                    vertical-align: middle;
                    box-sizing: border-box;
                  }

                  .coin_icon {
                    width: 18px;
                    height: 18px;
                    // top: -1px;
                    vertical-align: middle;
                    // position: relative;
                  }
                }
              }
            }
          }

          .status_controls {
            padding: 20px 0;
            color: #777;
            text-align: center;
            padding-top: 40px !important;

            sapn {
              padding: 20px 0;
              color: #777;
              text-align: center;
            }
          }

          .pivot_foot {
            height: calc(100% - 146px);
            padding-top: 25px;
            box-sizing: border-box;

            &>div {
              position: relative;

              .empty_hinter {
                animation: move-in-left 0.4s cubic-bezier(0.22, 0.58, 0.12, 0.98);

                &>div {
                  display: table;
                  height: 100%;
                  margin: 0 auto;
                }

                .dp_table_cell {
                  display: table-cell;
                  vertical-align: middle;

                  img {
                    width: 240px;
                  }

                  .supporting_text {
                    font-size: 14px;
                    color: #999;
                    text-align: center;
                  }
                }
              }
            }

            .status_controls {
              padding: 20px 0;
              color: #777;
              text-align: center;
              padding-top: 40px !important;
            }
          }
        }
      }
    }
  }
}
</style>
