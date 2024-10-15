<script>
import { ImageToken, GetImageIndex } from "@/api/read";
import {
  ref,
  onUpdated,
  onMounted,
  onBeforeUnmount,
  reactive,
  toRefs,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    let path = ref([]);
    let router = useRouter();
    let route = useRoute();
    let id = ref(route.query.id);
    const firstid = ref(null); //第一个id
    const html = document.querySelector("html");
    const value1 = ref(0);
    const ping = ref(true); //章节升序/倒序
    const width = ref(800); //图片宽度
    const screen = ref(100);
    const pic = ref(null);
    const box = ref(null);
    const piw = ref(null);
    const store = useStore();
    const Arr = ref([]); //遍历图片的高度
    const top = ref(0); //图片定位
    const Lists = ref([]); //存章节的
    const Listslength = ref(0); //章节长度
    const color = ref(true); //模式 日间/夜间
    const bg = ref(null); //整个大盒子
    const curent = ref([]); //当前章节
    const title = ref(); //标题
    const open = ref(true); //显示头和脚
    const show = ref(false); //显示目录
    const i = ref(0); //下标
    const dialogVisible = ref(false);
    const dialogVisible1 = ref(false);
    const state = reactive({
      num: 0,
      newTime: null,
      boxId: 1,
      boxnum: 100,
      lists: [
        {
          id: 1,
          num: 100,
          money: 1,
        },
        {
          id: 2,
          num: 600,
          money: 6,
        },
        {
          id: 3,
          num: 3000,
          money: 30,
        },
        {
          id: 4,
          num: 19800,
          money: 198,
        },
        {
          id: 5,
          num: 32800,
          money: 328,
        },
        {
          id: 6,
          num: 64800,
          money: 648,
        },
      ],
      box1: [],
      yu: [],
      wu: [],
      pay: [],
      pay2: []
    });

    const con = ref(false); //
    const con1 = ref(false); //
    const innerVisible1 = ref(false);
    const img = ref(null);
    const total = ref(null)
    const idList = ref(null)
    Lists.value = JSON.parse(localStorage.getItem("read"));
    i.value = Lists.value.findIndex((item) => item.id == id.value); //当前章节的下标
    // money.value = Number(localStorage.getItem("money"));
    // console.log("qqqq", money.value);
    // console.log('iiii',i.value);
    i.value = Lists.value.findIndex(item => item.id == id.value);

    // if(state.wu.arrs[i.value].du){
    //     dialogVisible.value = true;
    //   }
    let current = Lists.value.filter((item) => item.id == id.value); //章节
    curent.value = current[0];
    title.value = localStorage.getItem("title");
    img.value = localStorage.getItem("img")
    total.value = localStorage.getItem("total")
    idList.value = localStorage.getItem("id")
    console.log("章节", curent.value.short_title, title.value);
    Listslength.value = Lists.value.length;
    firstid.value = Lists.value[0].id;
    // console.log('firstid.value',firstid.value);
    // console.log("Lists.value", Lists.value);

    onUpdated(() => {
      // console.log(box.value);
      pic.value.style.width = width.value + "px";
      // console.dir(bg.value);
      // bg.value.style.background = '#fff';
    });

    onMounted(() => {
      // console.dir(all.value);
      // console.dir(window);
      window.onscroll = function () {
        var scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
        // console.log(scrollTop);
        let clientHeight = piw.value.clientHeight;
        let value = Number(((scrollTop / clientHeight) * 100).toFixed(2));
        // console.log(value);
        value1.value = value;
      };
    });
    onBeforeUnmount(() => {
      window.onscroll = null;
    });

    //漫画 数据请求
    const Fun = (id) => {
      path.value = [];
      GetImageIndex(id).then((data) => {
        // console.log("1111", data.data);
        data.data.images.forEach((item) => {
          if (item.path) {
            ImageToken(item.path.replace(".jpg", "")).then((data) => {
              path.value.push(data.data[0]);
              // console.log('1212',path.value);
              // console.log('123',data.data);
            });
          }
        });
      });
    };
    Fun(id.value);
    //全屏
    function fullscreen() {
      // console.log(html);
      html.requestFullscreen();
    }
    //缩小
    function addsmall() {
      if (width.value <= 500) {
        ElMessage.warning({
          message: "不能再小了!!!",
          offset: 50,
        });
      } else {
        width.value -= 100;
        screen.value -= 10;
        pic.value.style.width = width.value + "px";
      }
    }
    //放大
    function addbig() {
      if (width.value >= 1200) {
        ElMessage.warning({
          message: "不能再大了!!!",
          offset: 50,
        });
      } else {
        width.value += 100;
        screen.value += 10;
        pic.value.style.width = width.value + "px";
      }
    }
    //滚动条
    function scroll(value) {
      // console.log(value);
      // console.log(piw.value.clientHeight);
      let clientHeight = piw.value.clientHeight;

      let scrollTop = parseInt((value / 100) * clientHeight);
      // console.log(scrollTop);
      window.scrollTo(0, scrollTop);
    }
    //上一话
    function prev() {
      i.value = Lists.value.findIndex((item) => item.id == id.value); //当前章节的下标
      i.value--;
      if (i.value <= 0) {
        i.value = 0;
      }
      // console.log(Lists.value[i.value].id);
      let ids = Lists.value[i.value].id;
      console.log(ids);
      let current = Lists.value.filter((item) => item.id == ids); //章节
      curent.value = current[0];
      Fun(ids);
      id.value = ids;
      value1.value = 0;

      // let inw = state.yu.arrs.findIndex((item) => item.du == true);
      if (state.wu.arrs[i.value].du) {
        dialogVisible.value = true;
        console.log('1111');
      }
      chapter();
    }
    //下一话
    function next() {
      i.value = Lists.value.findIndex((item) => item.id == id.value); //当前章节的下标
      i.value++;
      if (i.value > Listslength.value) {
        ElMessage.warning({
          message: "已经没有了/(ㄒoㄒ)/~~",
          offset: 50,
        });
      }
      // console.log(Lists.value[i.value].id);
      let ids = Lists.value[i.value].id;
      console.log(ids);
      let current = Lists.value.filter((item) => item.id == ids); //章节
      curent.value = current[0];
      Fun(ids);
      id.value = ids;
      value1.value = 0;

      // let inw = Number(state.wu.arrs.findIndex((item) => item.du == true));
      // console.log('inw',inw);
      if (state.wu.arrs[i.value].du) {
        dialogVisible.value = true;
        console.log('1111');
      }
      chapter();
    }
    //章节升序/倒序
    function qie() {
      ping.value = !ping.value;
      state.wu.arrs = state.wu.arrs.reverse();
    }
    //章节跳转
    function go(ids) {
      // ids = Lists.value[i.value].id;
      let current = Lists.value.filter((item) => item.id == ids); //章节
      curent.value = current[0];
      Fun(ids);

      id.value = ids;
      value1.value = 0;
      i.value = Lists.value.findIndex((item) => item.id == id.value); //当前章节的下标
      if (state.wu.arrs[i.value].du) {
        dialogVisible.value = true;
      }
      // console.log(id.value);
    }
    const history = ref([])
    onBeforeUnmount(() => {

      history.value = JSON.parse(window.localStorage.getItem("historyList"))
      if (history.value == null | history.value == []) {
        let Arr = []
        Arr.push({
          img: img.value,
          total: total.value,
          title: title.value,
          curent: curent.value.short_title,
          id: idList.value,
          ids: curent.value.id
        })
        history.value = Arr
      } else {
        history.value.unshift({
          img: img.value,
          total: total.value,
          title: title.value,
          curent: curent.value.short_title,
          id: idList.value,
          ids: curent.value.id
        })
      }

      const map = new Map()
      history.value = history.value.filter(key => !map.has(key.title) && map.set(key.title, 1)) // 这里对name属性进行去重

      console.log("销毁执行", history.value);
      window.localStorage.setItem("historyList", JSON.stringify(history.value));

    })
    //模式 夜间
    function night() {
      color.value = !color.value;
      bg.value.style.background = "#000000d6";
    }
    //模式 日间
    function sun() {
      color.value = !color.value;
      bg.value.style.background = "#fff";
    }
    //显示头和脚
    function flag() {
      open.value = !open.value;
    }
    //显示目录
    function catalogue() {
      show.value = !show.value;
    }
    //单章购买按钮
    function chapter() {
      con.value = false;
      // console.log(state.num);
      if (state.num < 79) {
        con1.value = true;
      } else {
        con1.value = false;
      }

    }

    //购买全部章节按钮
    function Allchapter() {
      con.value = true;

      if (state.num < 64800) {
        con1.value = true;
      } else {
        con1.value = false;
      }
      // state.yu.arrs = {du:false};
    }
    //充值
    const open1 = () => {
      if (localStorage.token) {
        dialogVisible1.value = false;

        innerVisible1.value = false;
        console.log(state.box1);
        state.box1.unshift({
          num: state.boxnum,
          time: state.newTime,
        });

        state.num = (Number(state.num) + Number(state.boxnum));
        console.log("wwwwww", state.num);
        window.localStorage.setItem("money", state.num);
        window.localStorage.setItem("moneyList", JSON.stringify(state.box1));
        chapter();
      } else {
        dialogVisible1.value = false;
        store.commit("loginFun");
      }
    };
    //页面立即执行
    const mon = () => {
      state.num = Number(window.localStorage.getItem("money"));
      var date = new Date();
      var time =
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      state.newTime = time;
      state.yu = JSON.parse(localStorage.getItem('Lists'));
      let j = state.yu.findIndex(item => item.title = title.value)
      state.wu = state.yu[j];
      i.value = Lists.value.findIndex((item) => item.id == id.value); //当前章节的下标
      console.log(i.value);
      // state.yu.arrs[i.value] = {du:false};
      // console.log('555555',state.yu.arrs);
      // chapter();
      if (state.num < 79) {
        con1.value = true;
      } else {
        con1.value = false;
      }
      console.log('wwwww', state.wu.arrs[i.value].du);
      if (state.wu.arrs[i.value].du) {
        dialogVisible.value = true;
      }
    };
    mon();
    //购买单章
    function once() {
      if (localStorage.token) {
        state.pay = JSON.parse(localStorage.getItem('pay'));
        dialogVisible.value = false;
        state.num = state.num - 79;
        localStorage.setItem('money', state.num);
        i.value = Lists.value.findIndex((item) => item.id == id.value); //当前章节的下标
        state.wu.arrs[i.value] = { du: false, title: state.wu.arrs[i.value].title, id: state.wu.arrs[i.value].id, short_title: state.wu.arrs[i.value].short_title };

        state.yu.unshift(state.wu);
        const map = new Map();
        state.yu = state.yu.filter(
          (key) => !map.has(key.id) && map.set(key.id, 1)
        ); // 这里对name属性进行去重
        console.log('555555', state.wu);
        localStorage.setItem("Lists", JSON.stringify(state.yu));

        // state.pay.push({title:title.value,img:img.value,total:total.value,idList:idList.value});

        if (state.pay == null) {
          state.pay = []
        }
        if (state.pay == []) {
          state.pay.push({ title: title.value, img: img.value, total: total.value, idList: idList.value })
        } else {
          state.pay.unshift({ title: title.value, img: img.value, total: total.value, idList: idList.value })
        }
        console.log(state.pay);
        const map1 = new Map();
        state.pay = state.pay.filter(
          (key) => !map1.has(key.title) && map1.set(key.title, 1)
        ); // 这里对name属性进行去重
        localStorage.setItem('pay', JSON.stringify(state.pay))
        console.log('state.wu.arrs', state.wu.arrs);
      } else {
        dialogVisible.value = false;
        store.commit("loginFun");
      }
    }
    //购买全部章节
    function all() {
      if (localStorage.token) {
        state.pay = JSON.parse(localStorage.getItem('pay'));
        dialogVisible.value = false;
        state.num = state.num - 64800;
        localStorage.setItem('money', state.num);
        i.value = Lists.value.findIndex((item) => item.id == id.value); //当前章节的下标
        state.wu.arrs.forEach(item => {
          item.du = false;
        })
        state.yu.unshift(state.wu);
        const map = new Map();
        state.yu = state.yu.filter(
          (key) => !map.has(key.id) && map.set(key.id, 1)
        ); // 这里对name属性进行去重
        localStorage.setItem("Lists", JSON.stringify(state.yu));
        console.log('state.wu.arrs', state.wu.arrs);

        if (state.pay == null) {
          state.pay = []
        }
        if (state.pay == []) {
          state.pay.push({ title: title.value, img: img.value, total: total.value, idList: idList.value })
        } else {
          state.pay.unshift({ title: title.value, img: img.value, total: total.value, idList: idList.value })
        }
        console.log(state.pay);
        const map1 = new Map();
        state.pay = state.pay.filter(
          (key) => !map1.has(key.title) && map1.set(key.title, 1)
        ); // 这里对name属性进行去重
        localStorage.setItem('pay', JSON.stringify(state.pay))
      } else {
        dialogVisible.value = false;
        store.commit("loginFun");
      }
    }

    return {
      path,
      router,
      html,
      pic,
      width,
      ping,
      value1,
      screen,
      box,
      piw,
      Arr,
      top,
      Lists,
      id,
      Listslength,
      color,
      bg,
      curent,
      title,
      open,
      open1,
      show,
      i,
      firstid,
      dialogVisible,
      dialogVisible1,
      ...toRefs(state),
      con,
      con1,
      innerVisible1,
      //方法
      fullscreen,
      addsmall,
      addbig,
      scroll,
      prev,
      next,
      qie,
      go,
      night,
      sun,
      flag,
      catalogue,
      chapter,
      Allchapter,
      mon,
      once,
      all,
      img,
      total,
      history,
      idList
    };
  },
};
</script>

<template>
  <div class="readpage">
    <!-- 解决图片有反盗链 -->
    <meta name="referrer" content="no-referrer" />
    <!-- <fullscreen :fullscreen.sync="fullscreen"> -->
    <div class="read-item">
      <!-- 头部固定 -->
      <div class="topbox" v-if="open">
        <div class="read-top">
          <div class="menu">
            <router-link to="/home">漫漫看</router-link><span class="">></span><router-link :to="'detailspage?id=' + idList">{{
              title }}</router-link>
          </div>
          <div class="chapter" v-if="curent">
            {{ curent.short_title }} {{ curent.title }}
          </div>
        </div>
      </div>
      <div class="hei"></div>
      <!-- 内容 -->
      <div class="content-box" ref="bg" @click="flag">
        <div class="content" ref="pic" id="pic">
          <div ref="piw" class="piw">
            <el-image v-for="(item, index) in path" :key="index" :src="`${item.url}?token=${item.token}`" lazy />
          </div>
          <div class="next">
            <div class="word" @click="next">下一话</div>
          </div>
        </div>
      </div>
      <!-- 底部固定 -->
      <div class="bottombox" v-if="open">
        <div class="read-bottom">
          <div class="controller">
            <!-- 全屏 -->
            <div class="bot-left">
              <div class="screen" @click="fullscreen">
                <i class="top-left"></i>
                <i class="top-right"></i>
                <i class="bottom-left"></i>
                <i class="bottom-right"></i>
                全屏
              </div>
              <div class="bigorsmall">
                <span class="small" @click="addsmall">-</span>
                <span class="text">{{ screen + "%" }}</span>
                <span class="big" @click="addbig">+</span>
              </div>
            </div>
            <!-- 滑块 -->
            <div class="slider">
              <!-- <span>{{ spantext }}</span> -->
              <div class="slider-demo-block" ref="box">
                <!-- <span class="demonstration">{{1}}</span> -->
                <el-slider :step="0.01" v-model="value1" @input="scroll" :min="0" :max="100" />
              </div>
              <div class="slider-item">
                <p @click="prev" v-if="id != firstid">上一话</p>
              </div>
              <div class="slider-item">
                <p @click="next">下一话</p>
              </div>
            </div>
            <!-- 模式 -->
            <div class="pattern">
              <div class="pattern-list">
                <!-- <div class="pattern-item" v-show="!model" @click="addmodel">
                      <i class="ift-read-sun"></i>
                      <p>日间模式</p>
                    </div> -->
                <!-- <div class="pattern-item">
                      <i class="ift-read-scroll-left-right"></i>
                      <p>左右翻页</p>
                    </div> -->
                <div class="pattern-item" @click="addtimer">
                  <i class="ift-read-scroll-auto"></i>
                  <p @click="catalogue">章节目录</p>
                </div>
                <div class="episode_list" v-if="show">
                  <div class="panel_title">
                    <div class="text">全部章节（{{ Listslength }}）</div>
                    <div class="app_button batch_button" v-show="ping" @click="qie">
                      正序
                    </div>
                    <div class="app_button batch_button" v-show="!ping" @click="qie">
                      倒序
                    </div>
                  </div>
                  <div class="data_list">
                    <button :class="['list_item', id == item.id ? 'select' : '']" v-for="(item, index) in wu.arrs"
                      :key="index">
                      <a class="a">
                        <div class="label" @click="go(item.id)">
                          {{ item.short_title }}-{{ item.title }}
                        </div>
                        <div class="iconfont icon-htmal5icon46" v-show="item.du"></div>
                      </a>
                    </button>
                  </div>
                </div>
                <div class="pattern-item" v-show="color" @click="night">
                  <!-- <i class="ift-read-moon"></i> -->
                  <p>夜间模式</p>
                </div>
                <div class="pattern-item" v-show="!color" @click="sun">
                  <!-- <i class="ift-read-moon"></i> -->
                  <p>日间模式</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" width="32%" title="当前章节为付费章节" :center="true" :show-close="false"
      :close-on-click-modal="false" :align-center="true">
      <div class="low">
        <div class="upper">
          <div class="title">
            <div class="left">购买单章</div>
            <div class="right">购买全部章节</div>
          </div>
          <div class="action-buttons">
            <button :class="[con ? '' : 'con']" @click="chapter">
              <img src="../assets/img/漫币.png" alt="" />
              <div class="price">
                <span>79漫币</span>
              </div>
            </button>
            <button :class="[con ? 'con' : '']" @click="Allchapter">
              <img src="../assets/img/漫币.png" alt="" />
              <div class="price">
                <span>64800漫币</span>
              </div>
            </button>
          </div>
          <div class="mid">
            <div class="one" v-if="!con1">
              <button v-if="!con" @click="once">购买单章</button>
              <button v-if="con" @click="all">购买全部章节</button>
            </div>
            <button v-if="con1" @click="dialogVisible1 = true">
              余额不足请充值
            </button>
          </div>
          <div class="panel-hinter">
            <span class="reset-coin panel-title-item">余额</span>
            <span class="coin-image panel-title-item"></span>
            <span class="reset-number panel-title-item">{{
              num ? num : 0
            }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog v-model="dialogVisible1" title="漫币充值" width="450px" :close-on-click-modal="false">
      <div class="panel-hinter">
        <span class="reset-coin panel-title-item">余额</span>
        <span class="coin-image panel-title-item"></span>
        <span class="reset-number panel-title-item">{{ num }}</span>
      </div>
      <ul class="list-page">
        <li class="list-item" @click="(boxId = item.id), (boxnum = item.num)" :class="{ con: boxId == item.id }"
          v-for="(item, index) in lists" :key="index">
          <div class="gold-amount">
            <img src="../assets/img/漫币.png" alt="" class="v-middle" />
            <span class="gold">{{ item.num }}</span>
          </div>
          <div class="recharge-amount" :class="{ con: boxId == item.id }">
            ￥{{ item.money }}
          </div>
        </li>
      </ul>
      <div class="recharge-summary">
        <span class="title-text">充值漫币：</span>
        <span class="recharge-amount">{{ boxnum }}</span>
      </div>

      <div>
        <button class="submit-btn" @click="innerVisible1 = true">充值</button>
      </div>
    </el-dialog>
    <el-dialog v-model="innerVisible1" width="25%" title="确认要充值吗" center style="margin-top: 256px">
      <div class="dialog-footer1">
        <el-button @click="innerVisible = false">不要，点错了</el-button>
        <el-button type="primary" @click="open1"> 确认支付 </el-button>
      </div>
    </el-dialog>
    <!-- </fullscreen> -->
    <loginCom />
  </div>
</template>

<style lang="scss" scoped>
.read-item {
  width: 100%;
  background-color: #fff;
  z-index: 1;
}

.read-item.con {
  width: 100%;
  background-color: #333;
  z-index: 1;
}

.topbox {
  width: 100%;
  height: 64px;
  background-color: #333333;
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  transition: all 0.5s linear 0s;
  z-index: 999;
}

.topbox.con {
  width: 100%;
  height: 64px;
  background-color: #333333;
  position: fixed;
  top: -64px;
  left: 0;
  right: 0;
  z-index: 10;
  transition: all 0.5s linear 0s;
}

.topbox .read-top {
  width: 1328px;
  height: 64px;
  padding: 0px 8px;
  margin: 0 auto;
  background-color: #333333;
}

.topbox .read-top .menu {
  float: left;
  width: 33%;
  height: 64px;
}

.topbox .read-top .menu a {
  font-size: 14px;
  color: #fff;
  line-height: 64px;
}

.topbox .read-top .menu a:hover {
  font-size: 14px;
  color: #fc6976;
  line-height: 64px;
  cursor: pointer;
}

.topbox .read-top .menu span {
  font-size: 14px;
  color: #fff;
  line-height: 64px;
  padding: 0px 6px;
}

.topbox .read-top .chapter {
  float: left;
  width: 33%;
  height: 64px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  line-height: 64px;
}

.topbox .read-top .personal {
  float: left;
  width: 33%;
  height: 64px;
  color: #fff;
  font-size: 14px;
  line-height: 64px;
  text-align: right;
}

.topbox .read-top .personal .r-box2 {
  display: inline-block;
  padding: 0 6px;
  text-align: center;
  line-height: 56px;
}

.topbox .read-top .personal .Collection {
  display: inline-block;
  padding: 0 6px;
  z-index: 10;
  cursor: pointer;
}

.topbox .read-top .personal .Collection i {
  margin-right: 5px;
}

.topbox .read-top .personal .bookshelf {
  display: inline-block;
  padding: 0 6px;
}

.topbox .read-top .personal .bookshelf i {
  margin-right: 5px;
}

.Coll-twe i {
  color: #fc6976;
}

.bottombox {
  width: 100%;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  bottom: 0px;
  left: 0;
  transition: all 0.5s linear 0s;
}

.bottombox.con {
  width: 100%;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  bottom: -64px;
  left: 0;
  z-index: 10;
  transition: all 0.5s linear 0s;
}

.bottombox .read-bottom {
  width: 1200px;
  height: 64px;
  margin: 0 auto;
}

.bottombox .read-bottom .controller {
  display: flex;
}

.bottombox .read-bottom .bot-left {
  display: flex;
  color: #fff;
  font-size: 14px;
}

.bottombox .read-bottom .bot-left .screen {
  width: 28px;
  height: 26px;
  padding: 0 6px;
  color: #fff;
  font-size: 14px;
  margin: 18px 14px 0 0;
  line-height: 26px;
  position: relative;
  cursor: pointer;
}

.read-bottom .bot-left .screen .top-left {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 10px;
  height: 8px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
}

.read-bottom .bot-left .screen .top-right {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  width: 10px;
  height: 8px;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
}

.read-bottom .bot-left .screen .bottom-right {
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 8px;
  border-bottom: 1px solid #fff;
  border-right: 1px solid #fff;
}

.read-bottom .bot-left .screen .bottom-left {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 10px;
  height: 8px;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #fff;
}

.bigorsmall {
  float: left;
  width: 136px;
  height: 26px;
  margin: 18px 14px 0 0;
  border: 1px solid #fff;
  border-radius: 13px;
  line-height: 26px;
  text-align: center;
  user-select: none;
}

.bigorsmall .small {
  display: inline-block;
  width: 36px;
  height: 26px;
  cursor: pointer;
}

.bigorsmall .big {
  display: inline-block;
  width: 36px;
  height: 26px;
  cursor: pointer;
}

.bigorsmall .text {
  display: inline-block;
  width: 62px;
  height: 26px;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
}

// 滑块
.slider {
  display: flex;
  flex: 1;
  align-items: center;
  height: 64px;
  color: #fff;
  line-height: 64px;

  span {
    font-size: 14px;
  }

  .slider-box {
    flex: 1;
    height: 14px;
    padding: 0 7px;
    margin: 0 10px;
    vertical-align: middle;

    .box-block {
      flex: 1;
      height: 4px;
      background-color: #999;
      border-radius: 2px;
      position: relative;
      margin-top: 5px;

      .box-mb {
        width: 0;
        height: 4px;
        background-color: #000;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
      }

      i {
        display: block;
        width: 16px;
        height: 16px;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: -5px;
        z-index: 20;
        cursor: pointer;
      }
    }
  }

  .slider-item {
    margin-left: 18px;
    cursor: pointer;

    i {
      float: left;
      width: 16px;
      height: 16px;
      line-height: 14px;
      margin-left: 13px;
    }

    p {
      float: left;
      font-size: 14px;
      width: 100%;
      height: 24px;
      line-height: 24px;
    }
  }
}

// 模式
.pattern {
  height: 64px;
  line-height: 16px;
  position: relative;

  .pattern-list {
    .pattern-item {
      display: inline-block;
      width: 56px;
      height: 46px;
      margin-left: 18px;
      text-align: center;
      color: #fff;
      cursor: pointer;

      i {
        display: inline-block;
        width: 16px;
        height: 16px;
      }

      p {
        font-size: 14px;
        width: 100%;
        height: 28px;
        line-height: 28px;
      }
    }
  }
}

// 内容
.content-box {
  width: 100%;
  background: #fff;
}

.content {
  width: 800px;
  margin: 0 auto;
}

.content .piw {
  position: relative;
  top: 0;
}

.content img {
  width: 100%;
}

.content .next {
  margin: 80px auto;
}

.content .next .word {
  margin: 0 auto;
  text-align: center;
  background: #149dff;
  width: 240px;
  height: 48px;
  line-height: 48px;
  color: #fff;
}

.hei {
  height: 64px;
}

// 登录
.r-box2 {
  position: relative;
}

.r-box2:hover .headPortrait {
  width: 80px;
  height: 80px;
  border: 1px solid #fc6c79;
  position: absolute;
  left: 0;
  z-index: 100;
}

.r-box2:hover .catear {
  display: block;
  z-index: 10;
}

.r-box2 .catear {
  width: 248px;
  height: 211px;
  padding: 38px 8px 0px;
  //   background: url(../assets/img/bg-cat-main.png) 0px 0px no-repeat;
  background-size: 100%;
  position: absolute;
  top: 54px;
  left: -90px;
  display: none;
}

.r-box2 .catear .mylogon {
  width: 246px;
  height: 193px;
  padding-top: 16px;
  border: 1px solid #ffb5c3;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: inset 0 1px 4px 0 #ffd1d8;
}

.r-box2 .catear .mylogon h2 {
  width: 100%;
  height: 36px;
  text-align: center;
  line-height: 36px;
  font-size: 14px;
  color: #666;
  font-weight: 400;
}

.r-box2 .catear .mylogon ul {
  width: 210px;
  height: 64px;
  padding: 6px 0px;
  margin: 0 auto;
}

.r-box2 .catear .mylogon ul li {
  float: left;
  width: 105px;
  height: 32px;
  color: #666;
  padding: 0;
  line-height: 32px;
  text-align: left;
}

.r-box2 .catear .mylogon ul li img {
  width: 24px;
  height: 24px;
  margin-right: 2px;
}

.r-box2 .catear .mylogon ul li span {
  display: inline-block;
  font-size: 12px;
  color: #666;
  margin-right: 2px;
}

.r-box2 .catear .mylogon button {
  width: 200px;
  height: 32px;
  line-height: 32px;
  color: #fff;
  font-size: 14px;
  border-radius: 16px;
  margin: 0 auto;
  border: 0;
  background-image: linear-gradient(0deg, #fc6976, #fc4f71 42%, #ffb5c3);
  position: relative;
}

.r-box2 .catear .mylogon button:hover {
  box-shadow: 0 0 10px 2px #ea9ca2;
}

.r-box2 .catear .mylogon button i {
  display: inline-block;
  width: 24px;
  height: 24px;
  //   background: url(../assets/img/cat-stand2.png);
  background-size: 100%;
  position: absolute;
  left: 88px;
  top: -22px;
}

.r-box2 .catear .mylogon .logonid {
  width: 100%;
  height: 36px;
  text-align: center;
  font-size: 14px;
  color: #666;
  font-weight: 400;
}

.r-box2 .catear .mylogon .logonid h2 {
  width: 100%;
  height: 18px;
  line-height: 18px;
}

.r-box2 .catear .mylogon .logonid p {
  width: 100%;
  height: 18px;
  line-height: 18px;
}

// 书架
.bookshelf {
  position: relative;
}

.bookshelf:hover .catear {
  display: block;
  z-index: 10;
}

.bookshelf:hover a {
  color: #fc6976;
}

.bookshelf .catear {
  width: 248px;
  height: 211px;
  padding: 38px 8px 0px;
  //   background: url(../assets/img/bg-cat-main.png) 0px 0px no-repeat;
  background-size: 100%;
  position: absolute;
  top: 49px;
  left: -108px;
  text-align: center;
  display: none;
}

.bookshelf .catear .mylogon {
  width: 222px;
  height: 144px;
  padding: 12px;
  border: 1px solid #ffb5c3;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: inset 0 1px 4px 0 #ffd1d8;
}

.bookshelf .catear .mylogon img {
  width: 80px;
  height: 80px;
  margin: 0px 71px 20px;
}

.bookshelf .catear .mylogon p {
  width: 100%;
  height: 20px;
  color: #999;
  font-size: 12px;
  line-height: 20px;
}

.bookshelf .catear .mylogon a {
  // display: inline-block;
  width: 100%;
  height: 24px;
  color: #fc6976;
  font-size: 14px;
  line-height: 24px;
  vertical-align: top;
}

.slider-demo-block {
  display: flex;
  align-items: center;
  flex: 1;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  // flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}

.episode_list {
  bottom: 100%;
  left: 59.5%;
  margin-left: -140px;
  transform-origin: 50% 100%;
  width: 280px;
  background-color: #303030;
  // border-radius: 3px;
  box-sizing: border-box;
  position: absolute;
  animation: scale-in-ease 0.4s cubic-bezier(0.22, 0.58, 0.12, 0.98);

  .panel_title {
    font-size: 18px;
    text-align: left;
    line-height: 24px;
    color: hsla(0, 0%, 100%, 0.7);
    display: flex;
    align-items: center;
    padding: 24px 12px 12px;

    .text {
      flex: 1;
      padding-left: 12px;
    }

    .batch_button {
      background-color: #ff9b00;
      border-radius: 3px;
      color: #fff;
      font-size: 12px;
      line-height: 24px;
      text-align: center;
      padding: 0 12px;
      border: 0;
      transform-origin: center center;
      cursor: pointer;
    }
  }

  .data_list {
    max-height: 50vh;
    display: flex;
    flex-flow: column nowrap;
    position: relative;
    overflow-y: scroll;
    overflow-anchor: none;
    -ms-overflow-style: none;
    touch-action: auto;
    -ms-touch-action: auto;

    &::-webkit-scrollbar {
      width: 4px;
    }

    .list_item {
      background-color: transparent;
      border: 0;
      transform-origin: center center;
      cursor: pointer;
      min-height: 48px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      color: hsla(0, 0%, 100%, 0.9);
      padding: 0 30px;

      &.select {
        color: #ff0066;
      }

      .a {
        width: 276px;
        height: 48px;
        line-height: 48px;
        text-align: start;
        display: flex;

        .label {
          flex: 1;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}

.low {
  width: 450px;
  position: relative;
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  text-align: center;
  box-sizing: border-box;
  background: #fff;
  border-radius: 2px;
  margin: 0 auto;
}

.low .upper {
  padding: 0 23px 15px;
}

.low .upper .title {
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 24px;
  color: #333;
  display: flex;
  justify-content: space-between;
  width: 297px;
  padding-left: 62px;
}

.low .upper .action-buttons {
  margin-top: 16px;
  display: flex;
  justify-content: space-around;
}

.low .upper .action-buttons button {
  width: 120px;
  height: 45px;
  padding: 20px 0;
  box-sizing: content-box;
  background: #fff;
  border: 1px solid #e0e0e0;

  &.con {
    border: 1px solid #ff8a2c;
    background: #fffaf2;
  }

  img {
    width: 20px;
    height: 20px;
    background-size: 100%;
    margin: auto;
  }

  .price {
    margin-top: 10px;
  }
}

.low .upper .mid {
  margin-top: 30px;
  // display: flex;
}

.low .upper .mid button {
  width: 100%;
  padding: 13px 0;
  background: #ffa015;
  border: 0px;
  color: #fff;
}

.low .upper .money span img {
  width: 14px;
  height: 14px;
}

.low .upper .money span b {
  font-weight: normal;
}

.low .upper .loow {
  margin-top: 10px;
}

.low .upper .loow span {
  padding: 5px 20px;
  color: #fff;
  background: #ffa015;
}

::v-deep .el-dialog__headerbtn {
  top: -6px;
  right: 30px;
}

.panel-hinter {
  margin-bottom: 16px;
  display: flex;
  margin-top: 10px;
  height: 16px;
  line-height: 16px;

  .reset-coin {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.56);
    margin-right: 8px;
    float: left;
  }

  .reset-number {
    font-size: 15px;
    color: rgba(0, 0, 0, 0.56);
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

::v-deep .el-dialog__header {
  padding: var(--el-dialog-padding-primary);
  padding-bottom: 10px;
  margin-right: 16px;
  word-break: break-all;
  width: 90%;
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
    border: 1px solid rgba(0, 0, 0, 0.12);
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
      color: rgba(0, 0, 0, 0.34);
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
    color: rgba(0, 0, 0, 0.56);
    margin-right: 8px;
    float: left;
  }

  .reset-number {
    font-size: 15px;
    color: rgba(0, 0, 0, 0.56);
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

::v-deep .el-dialog__headerbtn {
  top: 0;
  right: -4px;
}

.login_box ::v-deep .el-dialog__headerbtn {
  top: -100px;
  right: -125px;
}

// .slider-demo-block .demonstration + .el-slider {
//   flex: 0 0 70%;
// }
</style>
