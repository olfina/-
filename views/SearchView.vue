<script>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { SearchResult } from "@/api/search";

export default {
  setup() {
    const route = useRoute();
    const keyArr = ref("");

    const keyword = ref("");

    keyword.value = route.query.keyword;

    console.log(route);

    onMounted(() => {
      SearchResult(keyword.value).then((data) => {
        keyArr.value = data.data.list;
        // console.log('搜索',keyArr.value);
      });
    });

    return {
      keyArr,
      keyword,
    };
  },
  watch: {
    $route() {
      location.reload();
    },
  },
};
</script>

<template>
  <div class="search">
    <meta name="referrer" content="no-referrer" />
    <div class="container">
      <div class="search_list">
        <div class="keyword_hinter">
          <span class="keyword">{{ keyword }}</span>
          <span>的搜索结果</span>
        </div>
        <div class="data_list">
          <div class="data_item" v-for="(item, index) in keyArr" :key="index">
            <router-link :to="'/detailspage?id=' + item.id">
              <div role="img" class="manga_cover">
                <el-image :src="item.vertical_cover" alt="" lazy />
              </div>
            </router-link>
            <div class="text_section">
              <a href="javascript:;">
                <h2 :title="item.org_title" class="manga_title" v-html="item.title"></h2>
              </a>
              <div class="footer_text">
                <div class="text" v-html="item.author_name.join(',')"></div>
                <div title="" class="text">{{ item.styles.join(",") }}</div>
                <div title="连载中" class="text">连载中</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search_list {
  .keyword_hinter {
    margin: 32px 0;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.87);

    .keyword {
      color: #ff0066;
    }
  }

  .data_list {
    .data_item {
      width: 33.33%;
      margin-bottom: 32px;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: top;
      position: relative;

      .manga_cover {
        width: 35%;
        // padding-top: 46.666666666666664%;
        background-color: #eee;
      }

      .text_section {
        width: 65%;
        padding: 0 16px;
        top: 0;
        left: 35%;
        box-sizing: border-box;
        height: 100%;
        position: absolute;

        .manga_title {
          margin: 0;
          font-size: 18px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.87);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          & ::v-deep em.keyword {
            color: #ff0066;
            font-style: normal;
          }
        }

        .footer_text {
          padding: 0 16px;
          left: 0;
          bottom: 0;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.3);
          line-height: 1.6;
          box-sizing: border-box;
          width: 100%;
          position: absolute;

          .text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            & ::v-deep em.keyword {
              color: #ff0066;
              font-style: normal;
            }
          }
        }
      }
    }
  }
}
</style>
