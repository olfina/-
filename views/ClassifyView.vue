<script>
import { ref, } from 'vue';
import { getClassifyTypeData, getClassifyContentData } from '../api/classify'
import { ElLoading } from 'element-plus'

export default {
    setup() {
        const loading1 = ElLoading.service({
            lock: true,
            text: '疯狂加载中......',

        })
        const loading = ref(true)
        let typeLists = ref([]);
        // 接收类型的对应下标
        let style_id = ref(null);     //题材 
        let areas_id = ref(-1);     //地区 
        let status_id = ref(-1);    //进度 
        let prices_id = ref(-1);    //收费 
        let orders_id = ref(0);     //排序 
        let page_size = ref(18);
        let classifyLists = ref([]);
        // 无限滚动
        const onLoad = () => {
            page_size.value += 6
            console.log(page_size.value);
            classify()
        }

        const func = () => {
            // localStorage.setItem('indexJson',1);
            style_id.value = localStorage.getItem('classifyJson');
            localStorage.removeItem('classifyJson');
            console.log("id==", style_id.value);
            // 如果id=null 就默认id为-1
            if (style_id.value == null) {
                style_id.value = -1
            }
        }
        // 立刻调用获取id
        func()

        getClassifyTypeData().then(data => {
            console.log(" ", data.data);
            typeLists.value = data.data;
            typeLists.value.styles.unshift({
                id: -1,
                name: "全部"
            })
            typeLists.value.areas.unshift({
                id: -1,
                name: "全部"
            })
            typeLists.value.status.unshift({
                id: -1,
                name: "全部"
            })
            typeLists.value.prices.unshift({
                id: -1,
                name: "全部"
            })
        })

        // 封装引用数据
        const classify = () => {
            getClassifyContentData(
                {
                    query: [
                        style_id.value,     //题材  style_id
                        areas_id.value,     //地区  area_id
                        status_id.value,    //进度  is_finish
                        prices_id.value,    //收费  is_free
                        orders_id.value,    //排序  order
                        page_size.value,
                    ]
                }
            ).then(data => {
                // console.log('数据', data.data);
                classifyLists.value = data.data;
                loading1.close();
                loading.value = false;

            })
        }
        classify()

        // 事件方法
        function style_selected(id) {
            page_size.value = 18
            loading.value = true;
            console.log(" style_id=>", id);
            style_id.value = id;
            getClassifyContentData(
                {
                    query: [
                        style_id.value,
                        areas_id.value,
                        status_id.value,
                        prices_id.value,
                        orders_id.value,
                        page_size.value,
                    ]
                }
            ).then(data => {
                // console.log('数据', data);
                classifyLists.value = data.data;
                loading.value = false;

            })
        }

        function areas_selected(id) {
            page_size.value = 18
            loading.value = true;
            console.log(id);
            areas_id.value = id;
            getClassifyContentData(
                {
                    query: [
                        style_id.value,
                        areas_id.value,
                        status_id.value,
                        prices_id.value,
                        orders_id.value,
                        page_size.value,
                    ]
                }
            ).then(data => {
                // console.log('数据', data);
                classifyLists.value = data.data;
                loading.value = false;
            })
        }

        function status_selected(id) {
            page_size.value = 18
            loading.value = true;
            console.log(id);
            status_id.value = id;
            getClassifyContentData(
                {
                    query: [
                        style_id.value,
                        areas_id.value,
                        status_id.value,
                        prices_id.value,
                        orders_id.value,
                        page_size.value,
                    ]
                }
            ).then(data => {
                // console.log('数据', data);
                classifyLists.value = data.data;
                loading.value = false;
            })
        }

        function prices_selected(id) {
            page_size.value = 18
            loading.value = true;
            console.log(id);
            prices_id.value = id;
            getClassifyContentData(
                {
                    query: [
                        style_id.value,
                        areas_id.value,
                        status_id.value,
                        prices_id.value,
                        orders_id.value,
                        page_size.value,
                    ]
                }
            ).then(data => {
                // console.log('数据', data);
                classifyLists.value = data.data;
                loading.value = false;
            })
        }

        function order_selected(id) {
            page_size.value = 18
            // console.log(id);
            loading.value = true;
            orders_id.value = id;
            getClassifyContentData(
                {
                    query: [
                        style_id.value,
                        areas_id.value,
                        status_id.value,
                        prices_id.value,
                        orders_id.value,
                        page_size.value,
                    ]
                }
            ).then(data => {
                // console.log('数据', data);
                classifyLists.value = data.data;
                loading.value = false;
                // console.log('11',classifyLists.value);
            })
        }

        return {
            typeLists,
            style_id,
            areas_id,
            status_id,
            prices_id,
            orders_id,
            classifyLists,
            loading,
            //事件方法
            style_selected,
            areas_selected,
            status_selected,
            prices_selected,
            order_selected,
            onLoad,
            loading1

        }
    },

}
</script>

<template>
    <div class="classify">
        <main>
            <meta name="referrer" content="no-referrer" />
            <div class="container">
                <div class="classfix">
                    <div class="style-section">
                        <div class="tag-block">
                            <div class="block-title">题材</div>
                            <div class="tag-containers" ref="style">
                                <div ref="style" :class="['style-tag', style_id == item.id ? 'selected' : '']" :id="item.id"
                                    v-for="(item, index) in typeLists.styles" :key="index" @click="style_selected(item.id)">
                                    {{ item.name }}
                                </div>

                            </div>
                        </div>
                        <div class="tag-block">
                            <div class="block-title">地区</div>
                            <div class="tag-containers">
                                <div ref="areas" :class="['style-tag', areas_id == item.id ? 'selected' : '']" :id="item.id"
                                    v-for="(item, index) in typeLists.areas" :key="index" @click="areas_selected(item.id)">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                        <div class="tag-block">
                            <div class="block-title">进度</div>
                            <div class="tag-containers">
                                <div ref="status" :class="['style-tag', status_id == item.id ? 'selected' : '']"
                                    :id="item.id" v-for="(item, index) in typeLists.status" :key="index"
                                    @click="status_selected(item.id)">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                        <div class="tag-block">
                            <div class="block-title">收费</div>
                            <div class="tag-containers">
                                <div ref="prices" :class="['style-tag', prices_id == item.id ? 'selected' : '']"
                                    :id="item.id" v-for="(item, index) in typeLists.prices" :key="index"
                                    @click="prices_selected(item.id)">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                        <div class="tag-block">
                            <div class="block-title">排序</div>
                            <div class="tag-containers">
                                <div ref="orders" :class="['style-tag', orders_id == item.id ? 'selected' : '']"
                                    :id="item.id" v-for="(item, index) in typeLists.orders" :key="index + 1"
                                    @click="order_selected(item.id)">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="list-section" id="list_section" ref="manga" v-loading="loading" v-infinite-scroll="onLoad"
                        infinite-scroll-distance="500" style="width: 100%;height:100%;" element-loading-text="疯狂加载中......">
                        <div class="data-list clearfix">
                            <div class="manga-card-vertical list-item" v-for="(item, index) in classifyLists" :key="index">
                                <router-link :to="'/detailspage?id=' + item.season_id">
                                    <div class="manga-cover-section">
                                        <a class="manga_cover_abox" href="javascript:;">
                                            <div class="manga-cover" role="img" :title="item.title">
                                                <div class="cover-image">
                                                    <el-image :src="item.vertical_cover" alt="" lazy />

                                                </div>
                                            </div>
                                        </a>
                                        <div class="locked-hinter" style="display: none;">
                                            <div class="dp-table">
                                                <div class="dp-table-cell">
                                                    <p>已下线</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                                <div class="text-info-section">
                                    <a href="javascript:;">
                                        <div :title="item.title" class="manga-title">
                                            {{ item.title }}
                                        </div>
                                    </a>
                                    <div :title="'更新至' + item.total + '话'" class="supporting-text">更新至 {{
                                        item.total
                                    }}
                                        话
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </main>
        <el-backtop :right="100" :bottom="100" />
    </div>
</template>

<style lang="scss" scoped>
::v-deep .el-loading-spinner {
    top: 20%;

}

.example-showcase .el-loading-mask {
    z-index: 9;
}

.infinite-list {
    height: auto;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list::-webkit-scrollbar {
    height: 0 !important;
}

.infinite-list .infinite_item {
    height: 906px;
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}
</style>

<style lang="scss" scoped>
main {
    width: 100%;
}

.style-section {
    padding: 24px 0;
    line-height: 2;
    display: flex;
    flex-direction: column;
}

.style-section .tag-block {
    margin-bottom: 10px;
    font-size: 14px;
    white-space: nowrap;
}

.style-section .tag-block .block-title {
    margin-right: 14px;
    color: rgba(0, 0, 0, .34);
    float: left;
}

.style-section .tag-block .tag-containers {
    white-space: normal;
}

.style-section .tag-block .tag-containers .style-tag {
    padding: 0 10px;
    margin: 0 4px;
    color: rgba(0, 0, 0, .87);
    border-radius: 5px;
    cursor: pointer;
    float: left;
}

.style-section .tag-block .tag-containers .style-tag.selected {
    color: #ff0066 !important;
}

.list-item:not(:nth-of-type(6n+6)) {
    margin-right: 15px;
}

.list-section .data-list .list-item {
    width: calc(16.66667% - 13px);
    margin-bottom: 24px;
    float: left;
}

.manga-card-vertical .manga-cover-section .manga-cover {
    width: 100%;
    margin-bottom: 6px;
    padding-top: 133%;
    background-color: #e7e7e7;
    border-radius: 2px;
    position: relative;
}

.manga_cover_abox {
    display: block;
}

.manga-card-vertical .manga-cover-section .manga-cover .cover-image {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
}

.manga-cover-section .manga-cover .cover-image img {
    width: 100%;
    height: 100%;
}

.manga-card-vertical .text-info-section .manga-title {
    margin-bottom: 2px;
    font-size: 14px;
    color: rgba(0, 0, 0, .87);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.manga-card-vertical .text-info-section .supporting-text {
    font-size: 12px;
    color: rgba(0, 0, 0, .34);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

