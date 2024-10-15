<template>
  <div class="update">
    <div class="container">
      <div class="update_recommend">
        <div class="update_top">
          <h2>更新推荐</h2>
          <ul class="update_lists">
            <li :class="['update_item', id == index ? 'com' : '']" v-for="(item, index) in arr" :key="item"
              @click="gun(index)">
              {{ tiem(item, index) }}
            </li>
          </ul>
        </div>
        <div class="update_content">
          <!-- 解决图片有反盗链的报错 -->
          <meta name="referrer" content="no-referrer" />
          <!-- 更新内容 -->
          <div class="content" v-loading="loading" style="width: 100%;height:459px;" element-loading-text="疯狂加载中......">
            <!-- 内容 -->

            <div class="content_list" v-for="(item, index) in updataLists" :key="index">
              <router-link :to="'/detailspage?id=' + item.comic_id">
                <!-- 图片 -->
                <div class="content_img">
                  <el-image :src="item.url" alt="" lazy />
                </div>
                <div class="content_text">
                  <p class="title">{{ item.title }}</p>
                  <p class="short_title">
                    更新至<span>{{ item.short_title }}</span>话
                  </p>
                </div>
              </router-link>
            </div>
          </div>
          <div class="tooop"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { getRenewData } from "../api/update";
export default {
  setup() {
    const loading = ref(true)
    //
    let updataLists = ref([]); //更新推荐
    let nowDate = ref(new Date()); //当前时间
    let date = ref([]); //时间
    let oneday = ref(86400000);//一天的时间戳
    let dayDate = ref(""); //时间
    let nowWeek = ref(nowDate.value.getDay()); //周几 5
    let arr = ref(["周日", "周一", "周二", "周三", "周四", "周五", "周六"]);
    let id = ref(0);
    // console.log(nowWeek.value);
    let day = () => {
      date.value = reactive({
        year: nowDate.value.getFullYear(), //年
        month: nowDate.value.getMonth() + 1, //月
        day: nowDate.value.getDate(), //日
      });
      dayDate.value =
        date.value.year + "-" + (date.value.month < 10 ? '0' + date.value.month : date.value.month) + "-" + (date.value.day < 10 ? '0' + date.value.day : date.value.day);
      // console.log(dayDate.value);
    };
    day();
    // console.log(day());

    function tiem(value, index) {
      // console.log(value);
      if (nowWeek.value == index) {
        return "今天";
      } else if (nowWeek.value - 1 == index) {
        return "昨天";
      } else {
        return value;
      }
    }

    //点周几更新周几的内容
    function gun(index) {
      loading.value = true;
      //点周几更新周几的内容
      id.value = index;
      let dy = nowDate.value.getDate();
      // console.log(dy);
      let oe = new Date().getTime() - (oneday.value) * dy;
      // console.log(new Date(oe).getDate());
      // console.log('111',new Date(oe).getMonth());
      // console.log('111',new Date(oe).getDate());
      let day = () => {
        date.value = reactive({
          year: nowDate.value.getFullYear(), //年
          month: new Date(oe).getMonth() + 1, //月
          day: new Date(oe).getDate() - index, //日
        });
        dayDate.value =
          date.value.year + "-" + (date.value.month < 10 ? '0' + date.value.month : date.value.month) + "-" + (date.value.day < 10 ? '0' + date.value.day : date.value.day);
        // console.log('2222',nowDate.value.getDate());
        // console.log('2222',dayDate.value);
      };
      day();
      getRenewData(dayDate.value).then((data) => {
        //   console.log(data.data.list);
        updataLists.value = data.data.list;
        loading.value = false;
        // console.log(updataLists.value);
      });
    }

    getRenewData(dayDate.value).then((data) => {
      // console.log(data.data.list);
      updataLists.value = data.data.list;
      loading.value = false;

    });

    return {
      loading,
      updataLists,
      oneday,
      //方法
      nowDate,
      dayDate,
      date,
      day,
      nowWeek,
      arr,
      gun,
      id,
      tiem,
    };
  },
};
</script>

<style lang="scss" scoped>
.update {
  width: 100%;
  height: auto;
}

// 更新推荐
.update_recommend {
  width: 100%;
  margin-top: 14px;

  .update_top {
    width: 100%;
    height: 58px;
    display: flex;
    line-height: 58px;

    h2 {
      color: #000;
      font-size: 24px;
      font-weight: bold;
    }

    .update_lists {
      width: 40%;
      color: #6e6e6e;
      margin-left: 24px;

      .update_item {
        float: left;
        padding: 0 10px;
        cursor: pointer;

        &.com {
          color: #ff0066;
          position: relative;

          &::after {
            content: "";
            width: 8px;
            height: 3px;
            border-radius: 1px;
            background-color: #ff0066;
            position: absolute;
            bottom: 16px;
            left: 48%;
            margin-left: -4px;
          }
        }
      }
    }
  }
}

.update_content {
  min-height: calc(100vh - 422px);

  .content {
    display: flex;
    flex-wrap: wrap;

    .content_list {
      width: 24%;
      margin-top: 14px;
      margin-right: 11px;

      .content_text {
        margin-top: 10px;

        .title {
          font-size: 18px;
          line-height: 25px;
          margin-bottom: 6px;
        }

        .short_title {
          font-size: 12px;
          color: #a5a5a5;
          line-height: 18px;
        }
      }
    }
  }

  .tooop {
    height: 60px;
  }
}
</style>
