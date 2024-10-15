<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import { getBannerData, getRecommendData, getHottitleData, getHotData, getUrbanData, getStrangeData, getArchaicData } from '../../api/home';
import { getClassifyTypeData } from '../../api/classify'

export default {
    setup() {
        // 路由

        const router = useRouter();

        // 加载
        const loading = ref(true)
        const loading2 = ref(true)
        const loading3 = ref(true)
        const loading4 = ref(true)
        const loading5 = ref(true)
        // 黑色头部分类
        const nav = ref([])

        // 接收轮播图的数据
        let bannerLists = ref([]);

        // 接收为你推荐的数据
        let RecommendLists = ref([]);
        // 接收为你推荐的12条数据
        let recommend_lists = ref([]);
        let firstnum = ref(0);
        let lastnum = ref(12);

        // 接收热门速递的小标题数据
        let hotTitle = ref([]);
        // 热门速递的小标题的下标
        let data_type = ref(0);
        let data_id = ref(1042);
        let hot_lists = ref([]);
        let page_num = ref(1);
        //都市生活
        let urbanLists = ref([]);
        //奇幻异界
        let fantasyLists = ref([]);
        //古风恋爱
        let ancientLists = ref([]);

        // 轮播图
        getBannerData().then(data => {

            bannerLists.value = data.data;

            if (bannerLists.value.length < 3) {
                bannerLists.value.push(bannerLists.value[0]);
                // console.log(bannerLists.value[0]);
            }
        })
        // 黑色分类nav
        getClassifyTypeData().then(data => {
            // console.log(" ",data.data);
            nav.value = data.data.styles
            // console.log("na",nav.value);
        })
        // 为你推荐
        // 封装数据
        const huan = () => {
            getRecommendData().then(data => {
                // console.log(data.data.list.length);
                RecommendLists.value = data.data.list;
                if (RecommendLists.value.length > 12) {
                    // console.log(RecommendLists.value.slice(0, 12));
                    recommend_lists.value = RecommendLists.value.slice(firstnum.value, lastnum.value)
                    loading.value = false;
                }
                // console.log(RecommendLists.value.length);
                // console.log("1");
            })
        }
        huan()
        let set = () => {
            loading.value = true;
            firstnum.value += 12;
            lastnum.value += 12;
            if (firstnum.value >= RecommendLists.value.length | lastnum.value >= RecommendLists.value.length) {
                firstnum.value = 0;
                lastnum.value = 12;
                huan()
            } else {
                huan()
            }

            console.log(2);
        }

        // 热门速递的小标题
        getHottitleData().then(data => {
            // 剪切数组里需要的两条对象
            // console.log(data.data.layout);
            hotTitle.value = data.data.layout.slice(1, 3);
        })

        // 热门速递
        getHotData(data_id.value, page_num.value).then(data => {
            // console.log(data_id.value);
            // console.log('热门速递',data.data.roll_six_comics);
            hot_lists.value = data.data.roll_six_comics;
            loading2.value = false;

        })
        //都市生活
        getUrbanData().then(data => {
            // console.log(data);
            urbanLists.value = data.data;
            loading3.value = false;

            // console.log('都市生活', urbanLists.value);
        })
        //奇幻异界
        getStrangeData().then(data => {
            // console.log(data.data);
            fantasyLists.value = data.data;
            loading4.value = false;

            // console.log('奇幻异界',fantasyLists.value);
        })
        //古风恋爱
        getArchaicData().then(data => {
            // console.log(data.data);
            ancientLists.value = data.data;
            loading5.value = false;

            // console.log('古风恋爱',ancientLists.value);
        })
        // 事件方法
        function titleChange(index, id) {
            loading2.value = true;
            data_type.value = index;
            data_id.value = id;
            // console.log(data_id.value);
            getHotData(data_id.value, page_num.value).then(data => {
                // console.log(data_id.value);
                // console.log(data.data.roll_six_comics);
                hot_lists.value = data.data.roll_six_comics;
                loading2.value = false;
            })
        }
        // 路由跳转传参
        const go = () => {
            router.push({ name: "classify" })

        }

        const goNav = (item) => {

            localStorage.setItem('classifyJson', item.id);
            router.push({
                name: "classify",
            })

            // console.log("id", item.id);
        }

        // 热门速递点击换一换
        const hotchange = () => {
            page_num.value += 1;

            getHotData(data_id.value, page_num.value).then(data => {
                // console.log(data_id.value);
                // console.log('热门速递',data.data.roll_six_comics);
                hot_lists.value = data.data.roll_six_comics;
                loading2.value = false;

            })
        }

        const ur_more = () => {
            localStorage.setItem('classifyJson', '1002');
            router.push({
                name: "classify",
            })
        }

        const fan_more = () => {
            localStorage.setItem('classifyJson', '998');
            router.push({
                name: "classify",
            })
        }

        const an_more = () => {
            localStorage.setItem('classifyJson', '997');
            router.push({
                name: "classify",
            })
        }

        return {
            loading, loading2, loading3, loading4, loading5,
            bannerLists,
            RecommendLists,
            recommend_lists,
            hotTitle,
            data_type,
            hot_lists,
            firstnum,
            lastnum,
            data_id,
            urbanLists,
            fantasyLists,
            ancientLists,
            // 事件方法
            titleChange,
            nav,
            go,
            goNav,
            set,
            huan,
            hotchange,
            ur_more,
            fan_more,
            an_more,
        }
    },
}
</script>


<template>
    <div class="head_content">
        <!-- 解决图片有反盗链 -->
        <meta name="referrer" content="no-referrer" />
        <header>
            <!-- 轮播图 -->
            <nav>
                <div class="banner">
                    <el-carousel :interval="4000" type="card" height="380px" :initial-index="1" indicator-position="none">
                        <el-carousel-item v-for="(item, index) in bannerLists" :key="index">
                            <img :src="item.img" alt="">
                            <!-- {{ item }} -->
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </nav>
            <!-- 导航栏 -->
            <div class="head-nav">
                <ul class="head-nav-list">
                    <li class="head-nav-item" @click="goNav(item)" v-for="(item, index) in nav" :key="index">
                        <!-- <router-link :to="{name:'classify',params:{id:item.id}}"> -->
                        {{ item.name }}
                        <!-- </router-link> -->
                    </li>
                    <li class="head-nav-item" @click="go">全部<span class="iconfont icon-gengduo"></span></li>
                </ul>
            </div>
        </header>

        <main>
            <div class="container">
                <!-- 为你推荐 -->
                <div class="recommend">
                    <div class="re-title">
                        <div class="title-left">
                            <h2>为你推荐</h2>
                        </div>
                        <div class="title-right" @click="set">
                            <p class="change">
                                <span class="iconfont icon-shuaxin1"></span>
                                <span class="font">换一换</span>
                            </p>
                        </div>
                    </div>
                    <ul class="re-list" v-loading="loading" style="width: 100%;height:652px;"
                        element-loading-text="疯狂加载中......">
                        <li class="re-item" v-for="(item, index) in recommend_lists" :key="index">
                            <a>
                                <router-link :to="'/detailspage?id=' + item.comic_id" class="re-wrap">
                                    <div class="re-img">
                                        <el-image :src="item.vertical_cover" alt="" lazy />
                                        <!-- {{ item }} -->
                                    </div>
                                    <div>
                                        <div class="re-text">{{ item.title }}</div>
                                    </div>
                                    <span class="re-tags" v-for="(i, k) in item.styles" :key="k">{{ i.name }}</span>
                                </router-link>
                            </a>
                            <!-- <a>
                                    <div class="re-wrap">
                                        <div class="re-img">
                                            <img :src="item.vertical_cover" alt="">
                                        </div>
                                        <div>
                                            <div class="re-text">{{ item.title }}</div>
                                        </div>
                                        <span class="re-tags" v-for="(i, k) in item.styles" :key="k">{{ i.name }}</span>
                                    </div>
                                </a> -->
                        </li>
                    </ul>
                </div>
                <!-- 热门速递 -->
                <div class="hot">
                    <div class="hot-title">
                        <div class="title-left">
                            <h2>热门速递</h2>
                            <div class="title-tabs">
                                <p :class="data_type == index ? 'con' : ''" v-for="(item, index) in hotTitle" :key="index"
                                    @click="titleChange(index, item.id)">{{ item.name }}</p>
                            </div>
                        </div>
                        <div class="title-right" @click="hotchange">
                            <p class="change"><span class="iconfont icon-shuaxin1"></span>换一换</p>
                        </div>
                    </div>
                    <ul class="hot-list" v-loading="loading2" style="width: 100%;height:484px;"
                        element-loading-text="疯狂加载中......">

                        <li class="hot-item" v-for="(item, index) in hot_lists" :key="index">
                            <router-link :to="'/detailspage?id=' + item.comic_id">

                                <div class="hot-wrap">
                                    <div class="hot-img">
                                        <div class="hot_img">
                                            <el-image :src="item.horizontal_cover" alt="" lazy />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="hot-text">{{ item.title }}</div>
                                    </div>
                                    <span class="hot-tags">{{ item.recommendation }}</span>
                                </div>

                            </router-link>
                        </li>
                    </ul>
                </div>
                <!-- 都市生活 -->
                <div class="urban">
                    <div class="ur-title">
                        <div class="title-left">
                            <h2>都市生活</h2>
                        </div>
                        <div class="title-right" @click="ur_more">
                            <router-link to="/classify">
                                <p class="change">更多<span class="iconfont icon-gengduo"></span></p>
                            </router-link>
                        </div>
                    </div>
                    <ul class="ur-list" v-loading="loading3" style="width: 100%;height:326px;"
                        element-loading-text="疯狂加载中......">
                        <li class="ur-item" v-for="(item, index) in urbanLists" :key="index">
                            <router-link :to="'/detailspage?id=' + item.season_id">
                                <div class="ur-wrap">
                                    <div class="ur-img">
                                        <div class="re_img">
                                            <el-image :src="item.vertical_cover" lazy />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="ur-text">{{ item.title }}</div>
                                    </div>
                                    <p class="ur-tags">
                                        <span class="ur_indent">{{ item.bottom_info }}</span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <!-- 奇幻异界 -->
                <div class="fantasy">
                    <div class="fan-title">
                        <div class="title-left">
                            <h2>奇幻异界</h2>
                        </div>
                        <div class="title-right" @click="fan_more">
                            <router-link to="/classify">
                                <p class="change">更多<span class="iconfont icon-gengduo"></span></p>
                            </router-link>
                        </div>
                    </div>
                    <ul class="fan-list" v-loading="loading4" style="width: 100%;height:326px;"
                        element-loading-text="疯狂加载中......">
                        <li class="fan-item" v-for="(item, index) in fantasyLists" :key="index">
                            <router-link :to="'/detailspage?id=' + item.season_id">
                                <div class="fan-wrap">
                                    <div class="fan-img">
                                        <div class="re-img">
                                            <el-image :src="item.vertical_cover" alt="" lazy />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="fan-text">{{ item.title }}</div>
                                    </div>
                                    <p class="fan-tags">
                                        <span>更新</span>
                                        <span>至</span>
                                        <span class="fan_indent">{{ item.total }}</span>
                                        <span class="fan_indent">话</span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <!-- 古风恋爱 -->
                <div class="ancient">
                    <div class="an-title">
                        <div class="title-left">
                            <h2>古风恋爱</h2>
                        </div>
                        <div class="title-right" @click="an_more">
                            <router-link to="/classify">
                                <p class="change">更多<span class="iconfont icon-gengduo"></span></p>
                            </router-link>
                        </div>
                    </div>
                    <ul class="an-list" v-loading="loading5" style="width: 100%;height:326px;"
                        element-loading-text="疯狂加载中......">
                        <li class="an-item" v-for="(item, index) in ancientLists" :key="index">
                            <router-link :to="'/detailspage?id=' + item.season_id">
                                <div class="an-wrap">
                                    <div class="an-img">
                                        <div class="re-img">
                                            <el-image :src="item.vertical_cover" alt="" lazy />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="an-text">{{ item.title }}</div>
                                    </div>
                                    <p class="an-tags">
                                        <span>更新</span>
                                        <span>至</span>
                                        <span class="an_indent">{{ item.total }}</span>
                                        <span class="an_indent">话</span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>

            </div>
            <!-- <div class="tooop"></div> -->
        </main>
    </div>
</template>


<style lang="scss" scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}


.banner .container {
    width: 3480px;
    height: 380px;
}

.banner .container ::v-deep .banner ::v-deep .el-carousel__item {
    width: 1160px !important;
    margin: 0 auto;
}

/* 内容导航栏 */
.head-nav {
    width: 100%;
    background-color: #212121;
}

.head-nav-list {
    cursor: pointer;
    width: 1200px;
    height: 20px;
    display: flex;
    padding: 26px 0;
    margin: 0 auto;
    color: #fff;
    justify-content: space-evenly;
}

/* main部分 */
main {
    width: 100%;
    margin-bottom: 60px;
}

/* 为你推荐 */
.recommend {
    width: 100%;
}

/* 标题 */
.recommend .re-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px 0 16px;
}

/* 标题的左边 */
.re-title .title-left {
    display: flex;
    flex-direction: row;
    align-items: center;
}


/* 标题内容 */
.re-title .title-left h2 {
    height: 56px;
    line-height: 56px;
    font-weight: 400;
    font-size: 32px;
    padding-right: 15px;
}

/* 换一换 */
.re-title .title-right {
    width: 58px;
    height: 12px;
    color: #ff0066;
    font-size: 12px;
    line-height: 12px;
    padding: 11px 16px;
    border-radius: 16px;
    background-color: #def1ff;
    cursor: pointer;
}

// 换一换字体图标
.re-title .title-right span.iconfont {
    font-size: 12px;
}

.re-title .title-right span.font {
    margin-left: 8px;
    cursor: pointer;
}

.recommend .re-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
}

.recommend .re-list .re-item {
    width: 180px;
    height: 326px;
    padding: 0px 8px;
}

.recommend .re-list .re-item:nth-child(1),
.recommend .re-list .re-item:nth-child(7) {
    padding-left: 0px;
}

.recommend .re-list .re-item:nth-child(6),
.recommend .re-list .re-item:nth-child(12) {
    padding-right: 0px;
}

.recommend .re-item a {
    display: block;
    width: 180px;
}

.re-item a .re-wrap {
    margin: 12px 0;
}

.re-item a .re-img {
    width: 180px;
    height: 240px;
    margin-bottom: 5px;
}

.re-item a .re-img img {
    width: 100%;
    height: 100%;
    margin-bottom: 5px;
}

.re-item a .re-text {
    height: 32px;
    line-height: 32px;
    font-size: 18px;
    // width: 300px; //宽度一定要有，具体根据自己需求
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
    text-overflow: ellipsis;
    /*超出部分文字以...显示*/

}

.re-item a .re-tags {
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    color: #999999;
}

/* 热门速递 */
.hot {
    width: 100%;
}

/* 标题 */
.hot .hot-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px 0 16px;
}

/* 标题的左边 */
.hot-title .title-left {
    display: flex;
    flex-direction: row;
    align-items: center;
}


/* 标题内容 */
.hot-title .title-left h2 {
    height: 56px;
    line-height: 56px;
    font-weight: 400;
    font-size: 32px;
    padding-right: 15px;
}

/* 标题的tabs选项卡 */
.hot-title .title-left .title-tabs {
    width: 258px;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
}

/* 标题的tabs选项卡的内容 */
.title-left .title-tabs p {
    font-size: 14px;
    color: #707070;
    padding: 0px 14px;
}

/* 标题的tabs选项卡的内容，鼠标经过内容高亮 */
.title-left .title-tabs p:hover {
    font-size: 14px;
    color: #000;
    cursor: pointer;
}

/* 标题的tabs选项卡的内容，被选中内容高亮 */
.title-left .title-tabs p.con {
    color: #ff0066;
    position: relative;
}

/* 标题的tabs选项卡的内容下的下划线 */
.title-left .title-tabs p.con::after {
    content: '';
    width: 8px;
    height: 3px;
    background-color: #ff0066;
    border-radius: 1px;
    position: absolute;
    bottom: 0px;
    left: 48%;
}

/* 换一换 */
.hot-title .title-right {
    width: 58px;
    height: 12px;
    font-size: 12px;
    color: #ff0066;
    line-height: 12px;
    padding: 11px 16px;
    border-radius: 16px;
    background-color: #def1ff;
    cursor: pointer;
}

/* 换一换字体图标 */
.hot-title .title-right span.iconfont {
    font-size: 12px;
}

.hot .hot-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.hot .hot-list .hot-item {
    width: 278px;
    height: 242px;
    padding: 14px 0;
    /* border: 1px solid; */
    box-sizing: border-box;
}

.hot .hot-list .hot-item a {
    display: block;
    width: 100%;
    height: 100%;
}

.hot-item .hot-img {
    width: 278px;
    height: 156px;
    margin-bottom: 6px;
}

.hot-img .hot_img {
    width: 100%;
    height: 100%;
}

.hot-item a .hot-text {
    width: 100%;
    height: 32px;
    line-height: 32px;
    font-size: 18px;
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
    text-overflow: ellipsis;
    /*超出部分文字以...显示*/

}

.hot-tags {
    display: block;
    width: 270px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    color: #999999;

    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
    text-overflow: ellipsis;
    /*超出部分文字以...显示*/
}

/* 都市生活 */
.urban {
    width: 100%;
}

/* 标题 */
.urban .ur-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px 0 16px;
}

/* 标题的左边 */
.ur-title .title-left {
    display: flex;
    flex-direction: row;
    align-items: center;
}

/* 标题内容 */
.ur-title .title-left h2 {
    height: 56px;
    line-height: 56px;
    font-weight: 400;
    font-size: 32px;
    padding-right: 15px;
}

/* 更多 */
.ur-title .title-right {
    width: 40px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
    padding: 11px 18px;
    border-radius: 16px;
    color: #ff0066;
    background-color: #def1ff;
}

/* 更多字体图标 */
.ur-title .title-right span.iconfont {
    font-size: 12px;
}

.urban .ur-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
}

.urban .ur-list .ur-item {
    width: 180px;
    height: 326px;
    padding: 0px 8px;
}

.urban .ur-list .ur-item:nth-child(1),
.urban .ur-list .ur-item:nth-child(7) {
    padding-left: 0px;
}

.urban .ur-list .ur-item:nth-child(6),
.urban .ur-list .ur-item:nth-child(12) {
    padding-right: 0px;
}

.urban .ur-item a {
    display: block;
    width: 180px;
}

.ur-item a .ur-wrap {
    margin: 12px 0;
}

.ur-item a .ur-img {
    width: 180px;
    height: 240px;
    margin-bottom: 5px;
}

.ur-img .re-img {
    width: 100%;
    height: 100%;
}

.ur-item a .ur-text {
    height: 32px;
    line-height: 32px;
    font-size: 18px;
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
    text-overflow: ellipsis;
    /*超出部分文字以...显示*/

}

.ur-item .ur-tags {
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    color: #999999;
}

// .ur-tags .ur_indent {
//     // margin-left: 5px;
// }

/* 奇幻异界 */


/* 奇幻异界 */
.fantasy {
    width: 100%;
}

/* 标题 */
.fantasy .fan-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px 0 16px;
}

/* 标题的左边 */
.fan-title .title-left {
    display: flex;
    flex-direction: row;
    align-items: center;
}


/* 标题内容 */
.fan-title .title-left h2 {
    height: 56px;
    line-height: 56px;
    font-weight: 400;
    font-size: 32px;
    padding-right: 15px;
}

/* 更多 */
.fan-title .title-right {
    width: 40px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
    padding: 11px 18px;
    border-radius: 16px;
    color: #ff0066;
    background-color: #def1ff;
}

/* 更多字体图标 */
.fan-title .title-right span.iconfont {
    font-size: 12px;
}

.fantasy .fan-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
}

.fantasy .fan-list .fan-item {
    width: 180px;
    height: 326px;
    padding: 0px 8px;
}

.fantasy .fan-list .fan-item:nth-child(1),
.fantasy .fan-list .fan-item:nth-child(7) {
    padding-left: 0px;
}

.fantasy .fan-list .fan-item:nth-child(6),
.fantasy .fan-list .fan-item:nth-child(12) {
    padding-right: 0px;
}

.fantasy .fan-item a {
    display: block;
    width: 180px;
}

.fan-item a .fan-wrap {
    margin: 12px 0;
}

.fan-item a .fan-img {
    width: 180px;
    height: 240px;
    margin-bottom: 5px;
}

.fan-img .re-img {
    width: 100%;
    height: 100%;
}

.fan-item a .fan-text {
    height: 32px;
    line-height: 32px;
    font-size: 18px;
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
    text-overflow: ellipsis;
    /*超出部分文字以...显示*/

}

.fan-item .fan-tags {
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    color: #999999;
}

/* 古风恋爱 */


/* 古风恋爱 */
.ancient {
    width: 100%;
}

/* 标题 */
.ancient .an-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px 0 16px;
}

/* 标题的左边 */
.an-title .title-left {
    display: flex;
    flex-direction: row;
    align-items: center;
}


/* 标题内容 */
.an-title .title-left h2 {
    height: 56px;
    line-height: 56px;
    font-weight: 400;
    font-size: 32px;
    padding-right: 15px;
}

/* 更多 */
.an-title .title-right {
    width: 40px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
    padding: 11px 18px;
    border-radius: 16px;
    color: #ff0066;
    background-color: #def1ff;
}

/* 更多字体图标 */
.an-title .title-right span.iconfont {
    font-size: 12px;
}

.ancient .an-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
}

.ancient .an-list .an-item {
    width: 180px;
    height: 326px;
    padding: 0px 8px;
}

.ancient .an-list .an-item:nth-child(1),
.ancient .an-list .an-item:nth-child(7) {
    padding-left: 0px;
}

.ancient .an-list .an-item:nth-child(6),
.ancient .an-list .an-item:nth-child(12) {
    padding-right: 0px;
}

.ancient .an-item a {
    display: block;
    width: 180px;
}

.an-item a .an-wrap {
    margin: 12px 0;
}

.an-item a .an-img {
    width: 180px;
    height: 240px;
    margin-bottom: 5px;
}

.an-img .re-img {
    width: 100%;
    height: 100%;
}

.an-item a .an-text {
    height: 32px;
    line-height: 32px;
    font-size: 18px;
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
    text-overflow: ellipsis;
    /*超出部分文字以...显示*/

}

.an-item .an-tags {
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    color: #999999;
}
</style>