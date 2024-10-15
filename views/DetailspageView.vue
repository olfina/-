<template>
  <div class="details">
    <div class="container">
      <meta name="referrer" content="no-referrer" />
      <!-- 详情页 头部 -->
      <div class="details_head">
        <div class="manga_cover">
          <!-- <img src="https://i0.hdslb.com/bfs/manga-static/a89fd50845db680951846c2bcae13d6a10198fa2.jpg" alt=""> -->
          <el-image :src="details.vertical_cover" alt="" lazy />
        </div>
        <div class="manga_info">
          <!-- 漫画标题 -->
          <h1 class="manga_title">{{ details.title }}</h1>
          <!-- 作者 -->
          <h2 class="author_name">
            <span v-for="e in details.author_name" :key="e">{{ e }}</span>
          </h2>
          <!-- 类型 更新时间 漫画话数 -->
          <div class="manga_type">
            <div class="tag_list">
              <img src="../assets/img/svg/漫画类型.svg" alt="" />
              <span v-if="details.styles">{{ details.styles[0] }}</span>
            </div>
            <div class="last_update">
              <img src="../assets/img/svg/漫画话数.svg" alt="" />
              <span>更新至 {{ details.total }}话</span>
            </div>
            <div class="update_schedule">
              <img src="../assets/img/svg/更新时间.svg" alt="" />
              <span>{{ details.renewal_time }}</span>
            </div>
          </div>
          <!-- 漫画介绍 -->
          <div class="manga_introduce">
            <div class="introduce">
              <div class="introduce_text">
                {{ details.classic_lines }}
              </div>
              <div class="develop" style="display: none">...</div>
            </div>
            <button class="expand_button" style="display: none">
              <span class="open">展开</span>
              <span class="iconfont icon-xialaxiao"></span>
            </button>
          </div>
          <!-- 开始阅读 追漫 -->
          <div class="action_buttons">
            <button class="manga_button read" v-if="!his">
              <router-link :to="'/readingpage?id=' + firstlist">开始阅读 第 001 话</router-link>
            </button>
            <button class="manga_button read" v-if="his">
              <router-link :to="'/readingpage?id=' + history.ids">继续阅读 第 {{ history.curent }} 话</router-link>
            </button>
            <button class="manga_button favourite" v-show="immersive" @click="add">
              <div class="favourite_content">
                <div class="content">
                  <div class="collection_add">
                    <span class="iconfont icon-shoucang add"></span>
                    <span class="">追漫</span>
                  </div>
                </div>
              </div>
            </button>
            <button class="manga_button favourite" v-show="!immersive" @click="cancel">
              <div class="favourite_content">
                <div class="content">
                  <div class="collection_cancel">
                    <span class="iconfont icon-shoucangtianchong cancel"></span>
                    <span class="">已追</span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <!-- 详情页 主体 -->
      <div class="details_body">
        <!-- 章节列表 -->
        <div class="chapterlist">
          <!-- 章节列表 标题 -->
          <div class="chapterlist_title">
            <div class="title">章节列表</div>
            <!-- <div class="discount_hinter">
                          <div class="text">正在参与限时免费活动，距离结束：</div>
                          <div class="countdown">147:47:44</div>
                        </div> -->
          </div>
          <!-- 章节列表 章节 -->
          <div class="chapterlist_chapter">
            <div class="chapter_list" v-loading="loading" style="width: 100%" element-loading-text="疯狂加载中......">
              <div class="list_header">
                <button :class="['header_item', id1 == index ? 'selected' : '']" @click="change(index)"
                  v-for="(item, index) in header_item" :key="index">
                  {{ item.a }}-{{ item.b }}
                </button>
              </div>
              <div class="list_data">
                <button class="list_item" v-for="(item, index1) in one[id1]" :key="index1">
                  <router-link :to="'/readingpage?id=' + item.id" class="a">
                    <div class="short-title">{{ item.short_title }}</div>
                    <div class="title">{{ item.title }}</div>
                    <div class="tag iconfont icon-htmal5icon46" v-if="item.du"></div>
                  </router-link>
                </button>
              </div>
            </div>
          </div>
          <!-- 评论区  -->
          <div class="comment">
            <h2 class="comment_title">评论</h2>
            <div class="comment_contnet">
              <div class="comment_mounter">
                <div class="commentMounter">
                  <div class="reply_notice"></div>
                  <!-- 评论区头部 -->
                  <div class="comment_header clearfix">
                    <div class="comment_tabs">
                      <ul class="clearfix">
                        <li class="default_sort" style="display: none">
                          全部评论
                        </li>
                        <li class="hot_sort con">按热度排序</li>
                        <li class="new_sort">按时间排序</li>
                      </ul>
                    </div>
                    <div class="header_interaction"></div>
                  </div>
                  <!-- 评论框 -->
                  <div :class="[flag ? 'comment_send' : 'comment_send no_login']">
                    <div class="user_face">
                      <div class="bili_avatar">
                        <img v-if="!flag" class="bili_avatar_img" src="../assets/img/noface.gif" alt="" />
                        <img v-else-if="flag" :src="HeadPortrait" alt="哀" />
                        <span class=""> </span>
                      </div>
                    </div>
                    <div class="textarea_container">
                      <div class="baffle_wrap">
                        <div class="baffle">
                          请先<a class="login" @click="loginData">登录</a>后发表评论 (・ω・)
                        </div>
                      </div>
                      <i class="ipt_arrow"></i>
                      <textarea cols="80" v-model="value" name="msg" rows="5" placeholder="发一条友善的评论"
                        class="ipt_txt"></textarea>
                      <button type="submit" class="comment_submit" @click="submit">
                        发表评论
                      </button>
                    </div>
                    <div class="comment_emoji">
                      <i class="face"></i>
                      <span class="text">表情</span>
                    </div>
                  </div>

                  <div class="comment_list">
                    <div class="list_item" v-for="(m, n) in comment" :key="n">
                      <div class="user_face">
                        <a href="javaScript:;">
                          <div class="bili_avatar">
                            <img class="bili_avatar_img" :src="m.member.avatar" alt="" />
                            <span class="bili_avatar_icon"></span>
                          </div>
                        </a>
                      </div>
                      <div class="con">
                        <div class="user">
                          <a href="javaScript:;" class="name">{{
                            m.member.uname
                          }}</a>
                          <span class="stick up" style="width: 16px" v-if="false">
                            <div class="tinyfont">UP</div>
                          </span>
                        </div>
                        <p class="text">
                          {{ m.content.message }}
                        </p>
                        <div class="info">
                          <span class="time_location">
                            <span class="reply_time">
                              {{ new Date(m.ctime * 1000).toLocaleString() }}
                            </span>
                          </span>
                          <span class="like" @click="like(n)" ref="likes">
                            <i class="iconfont icon-dianzan" v-if="m.action == 0"></i>
                            <i class="iconfont icon-dianzan_kuai" v-if="m.action == 1"></i>
                            <span>{{ m.like }}</span>
                          </span>
                          <span class="hate">
                            <i></i>
                          </span>
                          <span class="reply btn_hover">回复</span>
                          <div class="operation more_operation">
                            <span class="iconfont icon-more_android_light spot"></span>
                            <div class="opera_list">
                              <ul>
                                <li class="blacklist">加入黑名单</li>
                                <li class="report">举报</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="reply_box">
                          <div class="list_item_1" v-for="(q, w) in m.replies" :key="w">
                            <div class="user_face_1">
                              <a href="javaScript:;">
                                <div class="bili_avatar">
                                  <img class="bili_avatar_img" :src="q.member.avatar" alt="" />
                                  <span class="bili_avatar_icon"></span>
                                </div>
                              </a>
                            </div>
                            <div class="con_1">
                              <div class="user_1">
                                <a href="javaScript:;" class="name">{{
                                  q.member.uname
                                }}</a>
                                <i class="gap"></i>
                                <span class="stick up" style="width: 16px" v-if="false">
                                  <div class="tinyfont">UP</div>
                                </span>
                              </div>
                              <p class="text_1">
                                {{ q.content.message }}
                              </p>
                              <div class="info_1">
                                <span class="time_location">
                                  <span class="reply_time">
                                    {{
                                      new Date(q.ctime * 1000).toLocaleString()
                                    }}
                                  </span>
                                </span>
                                <span class="like" @click="like1(n, w)" ref="likes">
                                  <i class="iconfont icon-dianzan" v-if="q.action == 0"></i>
                                  <i class="iconfont icon-dianzan_kuai" v-if="q.action == 1"></i>
                                  <span>{{ q.like }}</span>
                                </span>
                                <span class="hate">
                                  <i></i>
                                </span>
                                <span class="reply btn_hover">回复</span>
                                <div class="operation more_operation" v-show="false">
                                  <span class="iconfont icon-more_android_light spot"></span>
                                  <div class="opera_list">
                                    <ul>
                                      <li class="blacklist">加入黑名单</li>
                                      <li class="report">举报</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- <div class="view-more">
                                                                    共<b>68</b>条回复,
                                                                    <a class="btn-more">点击查看</a>
                                                                </div> -->
                        </div>
                        <div class="paging_box"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 推荐漫画 -->
        <div class="recommend_manga">
          <div class="recommendManga">
            <div class="recommend_title">
              <div class="title">推荐漫画</div>
              <router-link to="/home" class="more">
                <div>更多<span class="iconfont icon-gengduo"></span></div>
              </router-link>
            </div>
            <div class="recommend_content">
              <router-link :to="'/detailspage?id=' + item.id" v-for="item in recommend" :key="item">
                <div class="list_item" @click="go(item.id)">
                  <div class="comic_img">
                    <img :src="item.vertical_cover" alt="" />
                  </div>
                  <div class="comic_detail">
                    <div :title="item.title" class="comic_title">
                      {{ item.title }}
                    </div>
                    <div class="comic_info">
                      <div title="sungmoo Youngkwang Huik Ain Ant Studio" class="comic_author">
                        <span v-for="(el, i) in item.authors" :key="i">{{
                          el.cname
                        }}</span>
                      </div>
                      <div title="游戏竞技" class="comic_category" v-if="item.styles[0]">
                        {{ item.styles[0].name }}
                      </div>
                      <div title="更新至 121 话" class="comic_update_info">
                        更新至 {{ item.total }} 话
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script>
import { ref, toRaw, reactive, toRefs } from "vue";
import {
  getDetailsData,
  getRecommendData,
  getCommentData,
} from "../api/detail";
import { useRouter } from "vue-router";
import { ElLoading } from "element-plus";
import { useStore } from "vuex";

export default {
  setup() {
    let loading = ref(true);
    let details = ref([]); //详情页数据
    let router = useRouter();
    let ep_list = ref([]); //章节还没反转
    let eplists = ref([]); //章节反转
    let one = ref([]); //装切割的章节
    let id1 = ref(0); //下标
    let firstlist = ref(); //第一话
    let comment = ref([]); //评论
    let recommend = ref([]); //推荐漫画
    let onelist = ref(); //
    const store = useStore();
    let header_item = ref([]);
    let flag = ref(false);
    let user = [];
    let userImg = [];
    let value = ref("");
    let oid = ref([]);
    let commentList = ref([]);
    let his = ref(false);
    let pin = ref([]); //放评论的
    const immersive = ref(true);
    const likes = ref(null);
    const likeFlag = ref(true);
    const likeId = ref(-1);
    const replies = ref([]);

    const loading1 = ElLoading.service({
      lock: true,
      text: "疯狂加载中......",
    });
    const state = reactive({
      history: [],
      collection: [],
      cot: [],
      aoe: [],
      aoe1: [],
      arr: null,
      arr1: null,
      Lists: [],
      agg: [],
    });
    const HeadPortrait = ref(null);

    // 点击追漫
    const add = () => {
      if (localStorage.getItem("token")) {
        immersive.value = false;
        // let cot=[];
        if (his.value == true) {
          state.collection.push({
            title: details.value.title,
            total: details.value.total.toString(),
            id: id.value,
            curent: state.history.curent,
            immersive: immersive.value,
            img: details.value.vertical_cover,
          });
        } else {
          state.collection.push({
            title: details.value.title,
            total: details.value.total.toString(),
            id: id.value,
            curent: "001",
            immersive: immersive.value,
            img: details.value.vertical_cover,
          });
        }
        window.localStorage.setItem(
          "collection",
          JSON.stringify(state.collection)
        );
      } else {
        ElMessage({
          message: "请在登录后在进行操作喔",
          type: "warning",
        });
        setTimeout(() => {
          store.commit("loginFun");
        }, 1000);
      }

      // console.log("++", state.collection, immersive.value);/
    };

    // 点击取消追漫
    const cancel = () => {
      immersive.value = true;
      if (state.collection != null) {
        let index = state.collection.findIndex((item) => item.id == id.value);
        state.collection.splice(index, 1);
        window.localStorage.setItem(
          "collection",
          JSON.stringify(state.collection)
        );
      }
      // console.log("--", state.collection);
    };

    // 漫画id
    let id = ref(toRaw(router).currentRoute._rawValue.query.id);

    /* 判断是否登录，登录显示可评论 */
    if (localStorage.getItem("token")) {
      user.value = JSON.parse(localStorage.getItem("token"))[0];
      console.log(user.value.imgurl);
      flag.value = true;
      // userImg.value = user.value;
      HeadPortrait.value = user.value.imgurl;
    } else {
      flag.value = false;
    }

    // console.log(flag.value);

    // 切换当前的章数
    const change = (index) => {
      id1.value = index;
    };

    //推荐漫画 跳转
    const go = () => {
      setTimeout(() => {
        location.reload();
      }, 500);
    };

    pin.value =
      JSON.parse(localStorage.getItem("commentList")) == null
        ? []
        : JSON.parse(localStorage.getItem("commentList"));

    //获取评论数据
    const CommentFun = () => {
      state.collection = JSON.parse(window.localStorage.getItem("collection"));
      // console.log("immersive.value", immersive.value);
      if (state.collection == null) {
        state.collection = [];
      }
      if (state.collection !== []) {
        let index = state.collection.findIndex((item) => item.id == id.value);
        if (index >= 0) {
          state.cot = state.collection[index];
          immersive.value = state.cot.immersive;
        }
      }
      // console.log("immersive.value", immersive.value);
      state.history = JSON.parse(window.localStorage.getItem("historyList"));
      if (state.history != null) {
        let index = state.history.findIndex((item) => item.id == id.value);
        // console.log("index", index);
        if (index >= 0) {
          his.value = true;
          state.history = state.history[index];
        }
      }

      // console.log(state.history);

      getCommentData(id.value).then((data) => {
        commentList.value = pin.value;
        // console.log(data.data);
        let index = pin.value.findIndex((itme) => itme.id == id.value);
        // console.log(index);
        if (index == -1) {
          comment.value = data.data.replies;
        } else {
          comment.value = pin.value[index].commit;
        }
        // console.log(comment.value);
      });
    };
    CommentFun();

    // 点击评论
    const submit = () => {
      let data = new Date().getTime() / 1000;
      if (value.value == '') {
        ElMessage.warning({
          message: '你还没有评论'
        })
      } else {
        comment.value.unshift({
          oid: id.value,
          member: {
            mid: "6910931",
            uname: "哀",
            sex: "男",
            sign: "",
            avatar:
              "https://i0.hdslb.com/bfs/face/3b3a5d2d20d33772179370a156333927b2a138bd.jpg",
          },
          content: {
            message: value.value,
          },
          ctime: data,
        });
      }

      commentList.value.push({
        id: id.value,
        commit: comment.value,
      });
      value.value = '';
      localStorage.setItem("commentList", JSON.stringify(commentList.value));
    };

    // 点击登录
    const loginData = () => {
      store.commit("Login/loginFun");
    };

    //详情页数据
    getDetailsData(id.value).then((data) => {

      // console.log(data.data);
      details.value = data.data;
      ep_list.value = data.data.ep_list;
      // console.log(ep_list.value);
      eplists.value = ep_list.value.reverse();
      // console.log("eplists.value", eplists.value);
      firstlist.value = eplists.value[0].id; //第一话
      localStorage.setItem("read", JSON.stringify(eplists.value));
      localStorage.setItem("title", details.value.title);
      localStorage.setItem("img", details.value.vertical_cover);
      localStorage.setItem("total", details.value.total);
      localStorage.setItem("id", id.value);
      loading.value = false;
      loading1.close();

      state.agg = JSON.parse(localStorage.getItem('Lists'));
      bdd();
      if (state.agg == null) {
        state.agg = [];
      }
      let is = state.agg.findIndex(item => item.id == id.value);
      // console.log('state.agg', state.agg);

      if (is != -1) {
        state.aoe = state.agg[is].arrs;
      }

      // console.log('eplists.value', eplists.value);
      let num = Math.ceil(state.aoe.length / 50); // 将章节的目录数据，切割成50条一组
      // console.log(num);//
      let a = 0;
      let b = 50;
      for (let i = 0; i < num; i++) {
        one.value.push(state.aoe.slice(a, b));
        //    console.log('one=>',one.value);
        header_item.value.push({
          list: state.aoe.slice(a, b),
          a: a,
          b: b,
        });
        a += 50;
        b += 50;
        // console.log('222222222',header_item.value);
      }
      const map = new Map();
      state.Lists = JSON.parse(localStorage.getItem("Lists"));

      if (state.Lists == null) {
        state.Lists = [];
      }

      if (state.Lists == []) {
        state.Lists.push({
          title: details.value.title,
          total: details.value.total,
          arrs: state.aoe,
          id: id.value,
          img: details.value.vertical_cover
        });
      } else {
        state.Lists.unshift({
          title: details.value.title,
          total: details.value.total,
          arrs: state.aoe,
          id: id.value,
          img: details.value.vertical_cover
        });
      }
      state.Lists = state.Lists.filter(
        (key) => !map.has(key.id) && map.set(key.id, 1)
      ); // 这里对name属性进行去重
      localStorage.setItem("Lists", JSON.stringify(state.Lists));

    });

    //推荐漫画
    getRecommendData(id.value).then((data) => {
      recommend.value = data.data.recommend_comics;
      // console.log(recommend.value);
    });

    // 点击点赞
    const like = (n) => {
      if (comment.value[n].action == 0) {
        for (let i = 0; i < comment.value.length; i++) {
          if (i == n) {
            comment.value[i].action = "1";
            comment.value[i].likeFlag += 1;
          }
        }
      } else if (comment.value[n].action == 1) {
        for (let i = 0; i < comment.value.length; i++) {
          if (i == n) {
            comment.value[i].action = "0";
            comment.value[i].like -= 1;
          }
        }
      }
      if (commentList.value == []) {
        commentList.value.push({
          id: id.value,
          commit: comment.value,
        });
      } else {
        commentList.value.unshift({
          id: id.value,
          commit: comment.value,
        });
      }
      const map = new Map();
      commentList.value = commentList.value.filter(
        (key) => !map.has(key.id) && map.set(key.id, 1)
      ); // 这里对name属性进行去重
      // console.log(" commentList.value", commentList.value);
      localStorage.setItem("commentList", JSON.stringify(commentList.value));
    };

    // 点击点赞
    const like1 = (n, w) => {
      if (comment.value[n].replies[w].action == 0) {
        for (let i = 0; i < comment.value[n].replies.length; i++) {
          if (i == n) {
            comment.value[i].replies[w].action = "1";
            comment.value[i].replies[w].likeFlag += 1;
          }
        }
      } else if (comment.value[n].replies[w].action == 1) {
        for (let i = 0; i < comment.value[n].replies.length; i++) {
          if (i == n) {
            comment.value[i].replies[w].action = "0";
            comment.value[i].replies[w].like -= 1;
          }
        }
      }
      if (commentList.value == []) {
        commentList.value.push({
          id: id.value,
          commit: comment.value,
        });
      } else {
        commentList.value.unshift({
          id: id.value,
          commit: comment.value,
        });
      }
      const map = new Map();
      commentList.value = commentList.value.filter(
        (key) => !map.has(key.id) && map.set(key.id, 1)
      ); // 这里对name属性进行去重
      // console.log(" commentList.value", commentList.value);
      localStorage.setItem("commentList", JSON.stringify(commentList.value));
    };

    const bdd = () => {
      //   console.log('wwwwww',eplists.value);
      // let po = state.Lists.findIndex(item=>item.id == id.value);
      // console.log('po',po);   
      // id.value//当前页面的id
      // if(po<0){
      for (var i = 20; i < eplists.value.length; i++) {
        state.arr = {
          du: true,
          id: eplists.value[i].id,
          title: eplists.value[i].title,
          short_title: eplists.value[i].short_title
        };
        state.aoe.push(state.arr);
      }
      // }

      state.aoe1 = eplists.value.slice(0, 20);
      state.aoe = state.aoe1.concat(state.aoe);
      // console.log("99999", state.aoe);
    };

    return {
      details,
      ep_list,
      header_item,
      id,
      id1,
      one,
      recommend,
      comment,
      onelist,
      firstlist,
      flag,
      user,
      userImg,
      value,
      oid,
      commentList,
      pin,
      likes,
      likeFlag,
      likeId,
      replies,
      HeadPortrait,
      //方法
      change,
      go,
      loading,
      loading1,
      submit,
      CommentFun,
      add,
      cancel,
      immersive,
      ...toRefs(state),
      his,
      loginData,
      like,
      like1,
      bdd,
    };
  },
};
</script>

<style lang="scss" scoped>
.aaa {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 20;

  img {
    width: 124px;
    height: 124px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -62px;
    margin-left: -62px;
  }
}

.icon-zan {
  font-size: 14px;
  margin-right: 5px;
  vertical-align: bottom;
}

.details {
  // width: 100%;
  height: 100%;
  border: 1px solid transparent;
  background-color: #fafafa;

  .details_head {
    width: 1120px;
    height: 320px;
    padding: 20px;
    display: flex;
    margin-top: 20px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 1px 3px 0 rgb(106 115 133 / 8%);

    // 漫画封面
    .manga_cover {
      width: 240px;
      height: 100%;
      display: inline-block;
    }

    // 漫画信息
    .manga_info {
      width: calc(100% - 320px);
      min-height: 320px;
      padding-left: 28px;
      box-sizing: border-box;
      position: relative;

      .manga_title {
        margin: 0 0 11px;
        font-size: 28px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.87);
      }

      .author_name {
        margin: 0;
        font-size: 16px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.56);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        span {
          padding-right: 6px;
        }
      }
    }

    .manga_type {
      margin-top: 14px;
      font-size: 14px;
      line-height: 2;
      color: rgba(0, 0, 0, 0.34);

      .tag_list {
        display: flex;
        align-items: center;

        img {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }

        span {
          white-space: nowrap;
          width: 780px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
        }
      }

      .last_update {
        display: flex;
        align-items: center;

        img {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }

        span {
          white-space: nowrap;
          width: 780px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
        }
      }

      .update_schedule {
        display: flex;
        align-items: center;

        img {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }

        span {
          white-space: nowrap;
          width: 780px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
        }
      }
    }

    .manga_introduce {
      margin-top: 8px;
      font-size: 14px;
      white-space: normal;
      color: rgba(0, 0, 0, 0.56);
      position: relative;

      .introduce {
        height: 76px;
        overflow: hidden;
        position: relative;

        .develop {
          padding-left: 1px;
          right: 13px;
          bottom: 0;
          background-color: #fff;
          position: absolute;
        }
      }

      .expand_button {
        font-size: inherit;
        color: inherit;
        right: 5px;
        bottom: -25px;
        background-color: transparent;
        border: 0;
        transform-origin: center center;
        cursor: pointer;
        position: absolute;

        span.iconfont {
          font-size: 16px;
          margin-left: 4px;
          margin-top: 2px;
        }
      }
    }

    .action_buttons {
      margin-top: 21px;

      .manga_button {
        padding: 10px 20px;
        font-size: 14px;
        border-radius: 3px;
        border: 1px solid transparent;
        cursor: pointer;
        box-sizing: border-box;
      }

      .read {
        width: 200px;
        height: 44px;
        margin-right: 16px;
        font-size: 16px;
        color: #fff;
        background-color: #3af;
      }

      .favourite {
        width: 144px;
        height: 44px;
        font-size: 16px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        line-height: 22px;
        color: rgba(0, 0, 0, 0.7);
        border: 1px solid rgba(0, 0, 0, 0.12);
        background-color: #fff;

        .favourite_content {
          overflow: hidden;
          height: 100%;
          position: relative;

          .content {
            transition: all 0.4s cubic-bezier(0.22, 0.58, 0.12, 0.98);

            span.iconfont {
              margin-right: 8px;
            }

            span.iconfont.cancel {
              color: #ffa015;
            }
          }
        }
      }
    }
  }

  .details_body {
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    // 章节列表
    .chapterlist {
      width: 880px;
      box-sizing: border-box;
      background-color: #fff;
      padding: 20px;
      box-shadow: 0 0 3px 0 rgb(106 115 133 / 8%);

      // 章节列表 标题
      .chapterlist_title {
        display: flex;
        align-items: center;
        font-size: 24px;
        color: rgba(0, 0, 0, 0.87);
        height: 30px;

        .title {
          line-height: 1;
        }

        .discount_hinter {
          height: 24px;
          display: flex;
          align-items: center;
          background-color: #fffaec;
          border: 1px solid #f9e6bf;
          border-radius: 3px;
          font-size: 12px;
          color: #f9a018;
          margin-left: 10px;

          .text {
            padding-left: 12px;
            line-height: 1;
          }

          .countdown {
            padding-right: 12px;
            line-height: 1;
          }
        }
      }

      // 章节列表 章节
      .chapterlist_chapter {
        .chapter_list {
          margin-top: 20px;

          .list_header {
            .header_item {
              width: 80px;
              height: 32px;
              padding: 0;
              margin-right: 12px;
              margin-bottom: 14px;
              border-radius: 16px;
              font-size: 13px;
              background: #f5f7f8;
              color: rgba(0, 0, 0, 0.56);
              border: 0;
              transform-origin: center center;
              cursor: pointer;
              display: inline-block;
              transition: all 0.2s cubic-bezier(0.22, 0.58, 0.12, 0.98);
            }

            .selected {
              background: rgba(50, 170, 255, 0.16) !important;
              color: #ff0066 !important;
            }
          }

          .list_data {
            margin-top: 12px;
            display: flex;
            flex-flow: row wrap;
            animation: move-in-left 0.4s cubic-bezier(0.22, 0.58, 0.12, 0.98);

            .list_item {
              position: relative;

              width: 198px;
              height: 42px;
              padding: 0 12px;
              margin-bottom: 16px;
              margin-right: 12px;
              font-size: 14px;
              line-height: 1.5;
              color: rgba(0, 0, 0, 0.87);
              text-align: left;
              border: 1px solid rgba(0, 0, 0, 0.12);
              border-radius: 3px;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              overflow: visible;
              background-color: transparent;
              transform-origin: center center;
              cursor: pointer;

              .a {
                display: flex;
                width: 100%;
                height: 100%;
                align-items: center;
              }

              .short-title {
                padding-right: 8px;
              }

              .title {
                flex: 1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }

      // 评论区
      .comment {
        margin-top: 20px;

        .comment_title {
          margin: 0 0 24px;
          font-size: 24px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.87);
        }

        .comment_contnet {
          .comment_mounter {
            position: relative;
            width: 100%;
            box-sizing: border-box;

            .commentMounter {
              font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif;
              font-size: 0;
              zoom: 1;
              min-height: 100px;
              background: #fff;
              box-sizing: content-box;

              .reply_notice {
                margin-bottom: 10px;
              }

              // 评论区头部
              .comment_header {
                margin: 0 0 24px 0;
                border-bottom: 1px solid #e5e9ef;

                .comment_tabs {
                  float: left;
                  margin-bottom: -1px;

                  ul {
                    .default_sort {
                      background-color: transparent;
                      border-radius: 0;
                      border: 0;
                      padding: 8px 0;
                      margin-right: 16px;
                      border-bottom: 1px solid transparent;
                      position: relative;
                      float: left;
                      cursor: pointer;
                      line-height: 20px;
                      height: 20px;
                      font-size: 14px;
                      font-weight: bold;
                      color: #222;
                    }

                    .hot_sort {
                      background-color: transparent;
                      border-radius: 0;
                      border: 0;
                      padding: 8px 0;
                      margin-right: 16px;
                      border-bottom: 1px solid transparent;
                      position: relative;
                      float: left;
                      cursor: pointer;
                      line-height: 20px;
                      height: 20px;
                      font-size: 14px;
                      font-weight: bold;
                      color: #222;
                    }

                    .new_sort {
                      background-color: transparent;
                      border-radius: 0;
                      border: 0;
                      padding: 8px 0;
                      margin-right: 16px;
                      border-bottom: 1px solid transparent;
                      position: relative;
                      float: left;
                      cursor: pointer;
                      line-height: 20px;
                      height: 20px;
                      font-size: 14px;
                      font-weight: bold;
                      color: #222;
                    }

                    li.con {
                      border-bottom: 1px solid #00a1d6;
                      color: #00a1d6;
                    }

                    li:last-child {
                      margin: 0 16px;
                    }
                  }
                }
              }

              // 评论框
              .comment_send {
                position: relative;
                margin: 10px 0;
                padding-top: 15px;

                // 头像
                .user_face {
                  position: absolute;
                  width: 82px;
                  height: 65px;

                  .bili_avatar {
                    width: 48px;
                    height: 48px;
                    transform: translate(0px, 0px);
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    border-radius: 50%;
                    margin: auto;
                  }
                }

                .textarea_container {
                  position: relative;
                  margin-left: 85px;
                  margin-right: 80px;

                  // 输入框
                  .ipt_txt {
                    font-size: 12px;
                    display: inline-block;
                    box-sizing: border-box;
                    background-color: #f4f5f7;
                    border: 1px solid #e5e9ef;
                    overflow: auto;
                    border-radius: 4px;
                    color: #555;
                    width: 100%;
                    height: 65px;
                    transition: 0s;
                    padding: 5px 10px;
                    line-height: normal;
                    outline: none;
                  }

                  // 发布按钮
                  .comment_submit {
                    width: 70px;
                    height: 64px;
                    position: absolute;
                    right: -80px;
                    top: 0;
                    padding: 4px 15px;
                    font-size: 14px;
                    color: #fff;
                    border-radius: 4px;
                    text-align: center;
                    min-width: 60px;
                    vertical-align: top;
                    cursor: pointer;
                    background-color: #00a1d6;
                    border: 1px solid #00a1d6;
                    transition: 0.1s;
                    user-select: none;
                    outline: none;
                  }
                }

                .comment_emoji {
                  padding: 0;
                  width: 66px;
                  height: 24px;
                  color: #99a2aa;
                  border: 1px solid #e5e9ef;
                  border-radius: 4px;
                  position: relative;
                  font-size: 12px;
                  text-align: center;
                  line-height: 23px;
                  margin-left: 86px;
                  margin-top: 3px;
                  cursor: pointer;
                  display: inline-block;
                  box-shadow: 0px 1px 10px 0 rgb(106 115 133 / 25%);

                  .face {
                    display: inline-block;
                    vertical-align: middle;
                    line-height: 1;
                    width: 16px;
                    height: 16px;
                    margin-right: 5px;
                    background: url(//s1.hdslb.com/bfs/seed/jinkela/commentpc/static/img/icons-comment.2f36fc5.png) no-repeat -408px -24px;
                  }

                  .text {
                    display: inline-block;
                    vertical-align: middle;
                    line-height: 1;
                    font-size: 12px !important;
                  }
                }
              }

              .no_login .comment_emoji {
                background-color: #e5e9ef;
              }

              .no_login .comment_submit {
                cursor: default;
                background-color: #e5e9ef !important;
                border-color: #e5e9ef !important;
                color: #b8c0cc !important;
              }

              // 头像
              .no_login .baffle {
                display: block;
                position: absolute;
                width: 100%;
                top: 0;
                line-height: 64px;
                font-size: 12px;
                border-radius: 4px;
                text-align: center;
                color: #777;
                background-color: #e5e9ef;
                overflow: hidden;

                .login {
                  padding: 4px 9px;
                  margin: 0 3px;
                  color: #fff;
                  background-color: #00a1d6;
                  border-radius: 4px;
                  border: 0;
                  cursor: pointer;
                }
              }

              .comment_list {
                padding-top: 20px;

                .list_item {
                  .user_face {
                    margin: 24px 0 0 0px;
                    position: absolute;
                    width: 82px;

                    .bili_avatar {
                      width: 48px;
                      height: 48px;
                      margin: auto;

                      img {
                        border-radius: 50%;
                      }
                    }
                  }

                  .con {
                    position: relative;
                    margin-left: 85px;
                    padding: 22px 0 14px 0;
                    border-top: 1px solid #e5e9ef;

                    .user {
                      font-size: 12px;
                      font-weight: bold;
                      line-height: 18px;
                      padding-bottom: 4px;
                      display: block;
                      word-wrap: break-word;
                      position: relative;
                      z-index: 3;

                      .name {
                        color: #6d757a;
                      }

                      .gap {
                        margin-right: 20px;
                      }

                      .stick {
                        min-width: 30px;
                        display: inline-block;
                        text-align: center;
                        font-size: 12px;
                        color: #ff81aa;
                        font-weight: normal;
                        line-height: 18px;
                        height: 18px;
                        border: 1px solid #ff81aa;
                        border-radius: 3px;
                        margin-right: 5px;
                      }

                      .stick.up {
                        vertical-align: middle;
                        min-width: 0px;
                        width: 18px;
                        margin-right: 0px;
                        margin-left: 8px;
                        line-height: 11px;
                        height: 10px;
                        font-size: 9px;
                        border-radius: 1px;
                        background-color: #fb7299;
                        color: #fff;
                        border-color: #fb7299;

                        .tinyfont {
                          width: 200%;
                          height: 200%;
                          font-weight: 400;
                          transform-origin: center;
                          transform: scale(0.5) translate(-50%, -50%);
                          font-size: 20px;
                          line-height: 20px;
                        }
                      }
                    }

                    .text {
                      position: relative;
                      z-index: 2;
                      line-height: 20px;
                      padding: 2px 0;
                      font-size: 14px;
                      text-shadow: none;
                      overflow: hidden;
                      word-wrap: break-word;
                      word-break: break-word;
                      white-space: pre-wrap;

                      .stick {
                        min-width: 30px;
                        display: inline-block;
                        text-align: center;
                        font-size: 12px;
                        color: #ff81aa;
                        font-weight: normal;
                        line-height: 18px;
                        height: 18px;
                        border: 1px solid #ff81aa;
                        border-radius: 3px;
                        margin-right: 5px;
                      }

                      img {
                        vertical-align: text-bottom;
                        padding: 0 1px;
                        width: 50px;
                        height: 50px;
                      }

                      img.small {
                        width: 20px;
                        height: 20px;
                      }
                    }

                    .info {
                      color: #99a2aa;
                      line-height: 14px;
                      margin-top: 6px;
                      font-size: 12px;

                      &>span {
                        margin-right: 20px;
                        cursor: pointer;
                      }

                      .hate {
                        cursor: pointer;
                        margin-right: 15px;
                      }

                      .btn_hover {
                        padding: 0 5px;
                        border-radius: 4px;
                        margin-right: 15px;
                        cursor: pointer;
                        display: inline-block;
                      }

                      .btn_hover:hover {
                        color: #00a1d6;
                        background: #e5e9ef;
                      }

                      .operation {
                        position: relative;
                        width: 18px;
                        float: right;
                        margin-top: 5px;
                        margin-right: 0;

                        .opera_list {
                          display: none;
                          position: absolute;
                          width: 120px;
                          right: 0;
                          top: 20px;
                          z-index: 10;
                          background: #fff;
                          box-shadow: 0 0 5px rgb(0 0 0 / 20%);
                          border-radius: 4px;
                          color: #222;
                          font-size: 14px;
                          padding: 10px 0;
                          z-index: 999;

                          li {
                            padding: 0px 15px;
                            cursor: pointer;
                            height: 36px;
                            line-height: 36px;
                            transition: all 0.3s;
                          }
                        }
                      }
                    }
                  }
                }

                .reply_box {
                  .list_item_1 {
                    .user_face_1 {
                      margin: 24px 0 0 0px;
                      position: absolute;
                      width: 82px;

                      .bili_avatar {
                        width: 24px;
                        height: 24px;
                        margin: auto;

                        img {
                          border-radius: 50%;
                        }
                      }
                    }

                    .con_1 {
                      position: relative;
                      margin-left: 85px;
                      padding: 10px 0;

                      .user_1 {
                        font-size: 12px;
                        font-weight: bold;
                        line-height: 18px;
                        padding-bottom: 4px;
                        display: block;
                        word-wrap: break-word;
                        position: relative;
                        z-index: 3;
                        display: inline-block;

                        .name {
                          color: #6d757a;
                        }

                        .gap {
                          margin-right: 20px;
                        }

                        .stick {
                          min-width: 30px;
                          display: inline-block;
                          text-align: center;
                          font-size: 12px;
                          color: #ff81aa;
                          font-weight: normal;
                          line-height: 18px;
                          height: 18px;
                          border: 1px solid #ff81aa;
                          border-radius: 3px;
                          margin-right: 5px;
                        }

                        .stick.up {
                          vertical-align: middle;
                          min-width: 0px;
                          width: 18px;
                          margin-right: 0px;
                          margin-left: 8px;
                          line-height: 11px;
                          height: 10px;
                          font-size: 9px;
                          border-radius: 1px;
                          background-color: #fb7299;
                          color: #fff;
                          border-color: #fb7299;

                          .tinyfont {
                            width: 200%;
                            height: 200%;
                            font-weight: 400;
                            transform-origin: center;
                            transform: scale(0.5) translate(-50%, -50%);
                            font-size: 20px;
                            line-height: 20px;
                          }
                        }
                      }

                      .text_1 {
                        width: 80%;
                        position: relative;
                        z-index: 2;
                        line-height: 20px;
                        padding: 2px 0;
                        font-size: 14px;
                        display: inline-block;
                        top: 9px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;

                        .stick {
                          min-width: 30px;
                          display: inline-block;
                          text-align: center;
                          font-size: 12px;
                          color: #ff81aa;
                          font-weight: normal;
                          line-height: 18px;
                          height: 18px;
                          border: 1px solid #ff81aa;
                          border-radius: 3px;
                          margin-right: 5px;
                        }

                        img {
                          vertical-align: text-bottom;
                          padding: 0 1px;
                          width: 50px;
                          height: 50px;
                        }

                        img.small {
                          width: 20px;
                          height: 20px;
                        }
                      }

                      .info_1 {
                        color: #99a2aa;
                        line-height: 14px;
                        margin-top: 6px;
                        font-size: 12px;

                        &>span {
                          margin-right: 20px;
                          cursor: pointer;
                        }

                        .hate {
                          cursor: pointer;
                          margin-right: 15px;
                        }

                        .btn_hover {
                          padding: 0 5px;
                          border-radius: 4px;
                          margin-right: 15px;
                          cursor: pointer;
                          display: inline-block;
                        }

                        .btn_hover:hover {
                          color: #00a1d6;
                          background: #e5e9ef;
                        }

                        .operation {
                          position: relative;
                          width: 18px;
                          float: right;
                          margin-top: 5px;
                          margin-right: 0;

                          .opera_list {
                            display: none;
                            position: absolute;
                            width: 120px;
                            right: 0;
                            top: 20px;
                            z-index: 10;
                            background: #fff;
                            box-shadow: 0 0 5px rgb(0 0 0 / 20%);
                            border-radius: 4px;
                            color: #222;
                            font-size: 14px;
                            padding: 10px 0;
                            z-index: 999;

                            li {
                              padding: 0px 15px;
                              cursor: pointer;
                              height: 36px;
                              line-height: 36px;
                              transition: all 0.3s;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    // 漫画推荐
    .recommend_manga {
      width: 268px;

      .recommendManga {
        background-color: #fff;
        padding: 20px;
        box-shadow: 0 1px 3px 0 rgb(106 115 133 / 8%);

        .recommend_title {
          height: 34px;
          line-height: 34px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .title {
            font-size: 24px;
          }

          .more {
            color: rgba(0, 0, 0, 0.54);
            font-size: 14px;
            display: flex;
            align-items: center;

            span.iconfont {
              font-size: 14px;
            }
          }
        }

        .recommend_content {
          .list_item {
            margin-top: 16px;
            min-width: 232px;
            min-height: 106px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .comic_img {
              width: 80px;
              height: 100%;
            }

            .comic_detail {
              width: 140px;
              padding: 4px 0;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .comic_title {
                height: 20px;
                font-size: 16px;
                color: rgba(0, 0, 0, 0.87);
                text-align: left;
                box-sizing: border-box;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }

            .comic_info {
              height: 60px;
              display: flex;
              font-size: 12px;
              flex-direction: column;
              justify-content: space-between;
              color: rgba(0, 0, 0, 0.34);

              .comic_author {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                span {
                  padding-right: 6px;
                }
              }
            }

            .comic_category {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }

          .comic_update_info {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
