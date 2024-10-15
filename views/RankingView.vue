<script>
// import ran_con from '@/components/ranking/rankingCom.vue'
import { getRankingData } from '@/api/ranking';
import { getRankComData } from "@/api/ranking_com";
import { ref } from 'vue';

export default {
    setup() {
        const loading = ref(true)
        // let state = reactive({
        //     id: 7
        // })
        // let id = toRef(state, 'id');
        let id = ref(7);
        let list = ref([]);
        let rankTitleData = ref([]);
        let list1 = ref([]);


        // 数据请求
        // 右边 -- 标题
        getRankingData().then(data => {
            console.log(data.data.list);
            list.value = data.data.list;
            loading.value = false;
        })
        // 左边 -- 内容
        getRankComData(id.value).then(data => {
            console.log(data.data.list);
            list1.value = data.data.list;
        })

        // 事件方法
        function change(item_id) {
            loading.value = true;
            id.value = item_id;
            getRankComData(id.value).then(data => {
                list1.value = data.data.list;
                loading.value = false;
                console.log(list1.value);
            })
        }

        return {
            id,
            list,
            rankTitleData,
            list1,
            // 事件方法
            change,
            loading
        }
    }
}
</script>

<template>
    <div class="ranking">
        <div class="container">
            <!-- 解决图片有反盗链 -->
            <meta name="referrer" content="no-referrer" />
            <!-- 导航栏菜单 -- 侧栏 -->
            <div class="nav_bar">
                <div class="nav">
                    <a v-for="(item, index) in list" :key="index" href="javascript:;" :class="[id == item.id ? 'con' : '']"
                        @click="change(item.id)">
                        <span class="nav_name">{{ item.name }}</span>
                        <span class="nav_triangle"></span>
                    </a>
                </div>
            </div>
            <!-- <ran_con /> -->
            <!-- 左边 -- 内容 -->
            <div class="ranking_content">
                <!-- 解决图片有反盗链 -->
                <meta name="referrer" content="no-referrer" />
                <div class="rank_content">
                    <div class="rank_title" v-for="(list, i) in list" :key="i">
                        <h1 class="rank_name" v-if="id == list.id">
                            {{ list.name }}
                        </h1>
                        <span class="rank_description" v-if="id == list.id">
                            {{ list.description }}
                        </span>
                    </div>
                    <div class="rank_wrap" v-loading="loading" style="width: 100%;height: 3236px;"
                        element-loading-text="疯狂加载中......">
                        <div class="rank_item" v-for="(item, index) in list1" :key="index">
                            <div class="rank_num">
                                <!-- <div class="num_item" >
                                                <img src="" alt="">
                                            </div> -->
                                <p>{{ index + 1 < 10 ? '0' + (index + 1) : index + 1 }}</p>
                            </div>
                            <div class="rank_movement"></div>
                            <div class="rank_item_content ">
                                <router-link class="content_img" :to="'/detailspage?id=' + item.comic_id">
                                    <!-- 漫画图片 -->
                                    <div class="content_img_item">
                                        <el-image :src="item.vertical_cover" alt="" lazy />
                                    </div>
                                </router-link>
                                <!-- 漫画信息 -->
                                <div class="content_title">
                                    <router-link class="content_img" :to="'/detailspage?id=' + item.comic_id">
                                        <p class="manga_text">{{ item.title }}</p>
                                    </router-link>
                                    <div class="manga_info">
                                        <p title="" class="author_text">
                                            {{ item.author[0] }} {{ item.author[1] }}</p>
                                        <p title="" class="style_text" v-for="(i, k) in item.styles" :key="k">{{ i.name
                                        }}</p>
                                        <a class="show_status_text">更新至 {{ item.total }} 话</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-backtop :right="100" :bottom="100" />
    </div>
</template>



<style lang="scss" scoped>
::v-deep .el-loading-spinner {
    top: 10%;
    margin-top: calc((0px - var(--el-loading-spinner-size))/ 2);
    width: 100%;
    text-align: center;
    position: absolute;
}

.ranking {
    padding-top: 16px;
}

.ranking>.container {
    display: flex;
}

.nav_bar {
    width: 79px;
    min-height: calc(100vh - 422px);
}

.nav {
    width: 79px;
    display: flex;
    font-size: 15px;
    line-height: 40px;
    margin-bottom: 8px;
    flex-direction: column;
    border-right: 1px solid #e0e0e0;

    a:hover {
        color: #ff0066;
    }

    a.con {
        color: #ff0066;
        position: relative;

        span.nav_triangle::after {
            content: "";
            position: absolute;
            top: 17px;
            left: 50px;
            border: 4px solid transparent;
            border-left: 4px solid #ff0066;
            transform: translateX(0%);
        }
    }
}

.ranking_content {
    padding-top: 8px;
    width: calc(100% - 79px);
    margin-left: 34px;
}

.rank_content {
    .rank_wrap {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: -32px;
        margin-top: 9px;
    }

    .rank_title {
        width: 100%;

        .rank_name {
            margin: 0;
            font-size: 24px;
            color: rgba(0, 0, 0, .87);
            font-weight: 400;
            display: inline-block;
        }

        .rank_description {
            font-size: 12px;
            color: rgba(0, 0, 0, .34);
            letter-spacing: 0;
            margin-left: 12px;
            display: inline-block;
        }
    }
}

.rank_item {
    width: 31%;
    height: 156px;
    margin: 0 16px 32px 0;
    padding: 20px 0 0 46px;
    position: relative;
    box-sizing: border-box;

    .rank_num {
        position: absolute;
        top: 14px;
        left: 14px;

        .num_item {
            // display: inline-block;
            width: 40px;
            height: 64px;
            background: no-repeat 50%;
            background-size: contain;
        }

    }

    .rank_movement {
        width: 24px;
        height: 24px;
        position: absolute;
        left: 14px;
        bottom: 0;
        background: url('../assets/img/rank/num/上升.png') no-repeat 50%;
        background-size: cover;

    }

    .rank_item_content {
        position: relative;
        height: 136px;

        &>.content_img {
            display: block;
            width: 102px;
            // height: 100%;
            float: left;

            .content_img_item {
                width: 100%;
                height: 100%;
                border-radius: 4px;
                overflow: hidden;
                position: relative;
            }
        }

        .content_title {
            width: calc(100% - 102px);
            padding-left: 16px;
            font-size: 12px;
            color: rgba(0, 0, 0, .34);
            letter-spacing: 0;
            line-height: 24px;
            float: left;
            box-sizing: border-box;
            position: relative;
            height: 100%;
            // overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;

            .manga_text {
                font-size: 18px;
                color: #000;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .manga_info {
                position: absolute;
                bottom: 0;
                left: 0;

                .author_text,
                .style_text,
                .show_status_text {
                    padding-left: 16px;
                    margin: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>