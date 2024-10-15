<script>
import { getHomeData } from '@/api/home';
import { onUpdated, ref } from 'vue';
import { SearchSuggest, Recommend } from '@/api/search';//搜索关键字 搜索框的内容
import { useRouter, useRoute } from 'vue-router'
import loginCom from '../home/loginCom.vue';
import { useStore } from 'vuex'

export default {
    setup() {
        const dialogVisible = ref(false)
        const loginShow = ref(false);

        const userFlag = ref(false);
        const historyFlag = ref(false);
        const cartoonFlag = ref(false);
        const money = ref(0);
        const reading = ref(0);
        const free = ref(0);
        const discount = ref(0);

        // 路由
        const router = useRouter();
        let route = useRoute();

        //Vuex
        const store = useStore();

        // 接收关键字
        let keyword = ref("");
        // 接收头部导航栏的数据
        let navtab = ref([]);
        // 存放搜索的数据
        let searchLists = ref({});
        // 搜索列表
        let placeholder_list = ref([])
        // 接收下标
        let id = ref(0);
        // 元素
        let search_bar_bg = ref(null);
        // 元素高度
        let height = ref(0);

        let collectionLists = ref([]);
        let historyLists = ref([]);

        onUpdated(() => {
            if (route.meta.istrun1) {
                search_bar_bg.value.style.height = height.value + 'px'
            }
            if (localStorage.getItem('token')) {
                // console.log(1);
                let flag = JSON.parse(localStorage.getItem('loginShow'));
                loginShow.value = flag;
            }
            // money.value = store.state.Login.money;
        })

        // 请求数据
        Recommend().then(data => {
            // console.log(data.data);
            placeholder_list.value = data.data
        })

        getHomeData().then(data => {
            // console.log(data.navtab);
            navtab.value = data.navtab;
        })

        // 事件方法
        // 类名切换
        function change(index) {
            id.value = index
        }

        // 搜索
        const search = () => {
            // console.log(keyword.value);

            // 判断是否有关键字
            if (keyword.value != '') {
                // console.log('关键字', keyword.value);
                SearchSuggest(keyword.value).then(data => {
                    console.log(data.data);
                    searchLists.value = data.data;
                    height.value = 32 * 5;
                    search_bar_bg.value.style.overflowX = 'hidden';
                    search_bar_bg.value.style.overflowY = 'scroll';
                    // console.log(searchLists.value.length, height.value);
                })
            } else if (keyword.value == '') {
                searchLists.value = {};
                height.value = 0;
            } else {
                height.value = 0;
            }
        }
        // 获取关键字跳转搜索页
        const goSearch = (index) => {
            console.log(router.query);
            router.push({ path: '/search', query: { keyword: searchLists.value[index] } })
            console.log(index);
            keyword.value = "";
            height.value = 0;
        }

        // 回车跳转
        const onEnter = (e) => {
            // if (text.value == "") {
            //     if (e.keyCode == 13) {
            //         text.value = '航海王';
            //     }
            // } else {
            if (e.keyCode == 13) {
                router.push({ path: '/search', query: { keyword: keyword.value } })

                keyword.value = "";
                // height.value = 0*searchLists.value.length;
            }
            height.value = 32;
            // }


        }

        const historyEnter = () => {
            store.commit('Head/EnterFun', ['historyFlag']);
            if (localStorage.getItem('historyList')) {
                historyLists.value = JSON.parse(localStorage.getItem('historyList'));
            }
        }

        const cartoonEnter = () => {
            store.commit('Head/EnterFun', ['cartoonFlag']);
            if (localStorage.getItem('collection')) {
                collectionLists.value = JSON.parse(localStorage.getItem('collection'));
            }
        }

        const userEnter = () => {
            store.commit('Head/EnterFun', ['userFlag']);
        }

        const historyLeave = () => {
            store.commit('Head/LeaveFun', ['historyFlag']);
        }

        const cartoonLeave = () => {
            store.commit('Head/LeaveFun', ['cartoonFlag']);
        }

        const userLeave = () => {
            store.commit('Head/LeaveFun', ['userFlag']);
        }

        // 点击跳转详情页
        const historyGo = () => {
            setTimeout(() => {
                location.reload();
            }, 500)
        }

        const collectionGo = () => {
            setTimeout(() => {
                location.reload();
            }, 500)
        }


        // 点击登录
        const loginData = () => {
            // console.log(store.state.Login);
            store.commit('Login/loginFun');
            loginShow.value = JSON.parse(localStorage.getItem('loginShow'));
            // console.log(loginShow.value,'<==');
        }

        if (localStorage.getItem('loginShow')) {
            let tokenLists = JSON.parse(localStorage.getItem('token'));
            money.value = tokenLists[0].money;
            reading.value = tokenLists[0].reading;
            free.value = tokenLists[0].free;
            discount.value = tokenLists[0].discount;
            // console.log(tokenLists[0].money);
        }

        //点击退出
        const logout = () => {
            // localStorage.removeItem('token');
            // localStorage.removeItem('loginShow');

            localStorage.clear();

            window.location.reload();
        }

        return {
            navtab,
            id,
            keyword,
            searchLists,
            search_bar_bg,
            height,
            placeholder_list,
            dialogVisible,
            loginShow,
            userFlag,
            cartoonFlag,
            historyFlag,
            collectionLists,
            historyLists,
            money,
            reading,
            free,
            discount,
            // 事件方法
            change,//切换类名
            SearchSuggest,//接收搜索数据
            onEnter,//回车跳转
            search,//实时搜索
            goSearch,
            loginData,//登录
            logout,//退出登录
            historyEnter,//用户头像经过事件
            cartoonEnter,
            userEnter,
            userLeave,
            cartoonLeave,
            historyLeave,
            historyGo,
            collectionGo
        }
    },
    components: {
        loginCom
    }
}
</script>


<template>
    <div class="headCom" v-if="$route.meta.istrun1">
        <header>
            <div class="head_wrap">
                <div class="container">
                    <div class="nav">
                        <a href="javascript:;">
                            <div class="logo">
                                <img src="@/assets/img/home/logo.png" alt="漫漫看">
                                <span>漫漫看漫画</span>
                            </div>
                        </a>
                        <!-- 头部左边 -->
                        <div class="nav_left">
                            <div class="nav_wrap">
                                <ul class="nav_list clearfix">
                                    <!-- <li class="nav_item">
                                                        <a href="javascript:;">
                                                            <img src="@/assets/img/home/下载.png" alt="哔哩哔哩">
                                                            主站
                                                        </a>

                                                    </li> -->
                                    <li class="nav_item" @click="change(index)" v-for="(item, index) in navtab"
                                        :key="index">
                                        <router-link :to="item.toUrl">
                                            {{ item.title }}
                                        </router-link>
                                    </li>
                                </ul>
                                <ul class="nav_list clearfix">
                                    <li class="nav_item"><a href="javascript:;">冒险</a>
                                    </li>
                                    <li class="nav_item"><a href="javascript:;">热血</a></li>
                                    <li class="nav_item"><a href="javascript:;">搞笑</a></li>
                                    <li class="nav_item"><a href="javascript:;">恋爱</a></li>
                                    <li class="nav_item"><a href="javascript:;">少女</a></li>
                                    <li class="nav_item"><a href="javascript:;">分类</a></li>
                                    <li class="nav_item"><a href="javascript:;">更新</a></li>
                                </ul>
                            </div>
                        </div>
                        <!-- 头部右边 -->
                        <div class="nav_right">
                            <!-- 搜索 -->
                            <div class="search_bar">
                                <div class="search_bar_bg" ref="search_bar_bg">
                                    <div class="search_suggestion">
                                        <div class="data_list">
                                            <div class="suggestion_item" v-for="(item, index) in searchLists" :key="index"
                                                :title="item.title">
                                                <a @click="go(index)">
                                                    {{ item }}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form @submit.prevent>
                                    <div class="vertical_center">
                                        <div class="dp_table_cell">
                                            <div class="placeholder_list">
                                                <!-- <div class="placeholder_item" v-for="(item, index) in placeholder_list"
                                                                                                                            :key="index">
                                                                                                                            {{ item.title }}
                                                                                                                        </div> -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="vertical_center re">
                                        <div class="dp_table_cell" @keydown="onEnter">
                                            <input title="人……人家才不想让你搜索呢！哼！╰（‵□′）╯" v-model="keyword" @input="search($event)"
                                                class="search_input" placeholder="请搜索">
                                            <button type="submit" class="confirm_btn">
                                                <div class="iconfont icon-sousuo3"></div>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <!-- 下载 -->
                            <button class="download">
                                <span>下载APP</span>
                                <div class="download_content">
                                    <div class="tip"></div>
                                    <div class="qrcode"></div>
                                    <div class="line first">
                                        <div class="icon"></div><span>下载APP</span>
                                    </div>
                                    <div class="line second">
                                        <span class="hl">免费解锁</span>
                                        <span>更多章节</span>
                                    </div>

                                </div>
                            </button>

                            <!-- 历史 -->
                            <div class="history " v-show="loginShow" @mouseenter="historyEnter" @mouseleave="historyLeave">
                                <div class="drop_list">
                                    <div class="lens_transition a-fadeinT" v-show="$store.state.Head.historyFlag">
                                        <div class="size_ruler">
                                            <div class="data_list">
                                                <div class="list_container ">
                                                    <router-link :to="'/detailspage?id=' + item.id" @click="historyGo"
                                                        class="data_item" v-for="(item, index) in historyLists"
                                                        :key="index">
                                                        <a target="_blank">
                                                            <div role="img" :title="item.title" class="manga_cover">
                                                                <img :src="item.img">
                                                            </div>
                                                        </a>
                                                        <div class="text_section">
                                                            <a target="_blank">
                                                                <div :title="item.title"
                                                                    class="multi_line_text manga_title">
                                                                    {{ item.title }}
                                                                </div>
                                                            </a>
                                                            <div class="footer_text">
                                                                <div :title='`更新至 ${item.total} 话`' class="text">更新至
                                                                    {{ item.total }} 话</div>
                                                                <a href="" target="_blank" class="read_progress">
                                                                    <div :title='`阅读至 ${item.curent} 话`' class="text">阅读至
                                                                        {{ item.curent }} 话</div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </router-link>
                                                </div>
                                            </div>
                                            <div class="more_btn_container">
                                                <router-link to="/readhistory">
                                                    <button class="more_button">查看全部</button>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <router-link to="/readhistory">
                                    <button>历史</button>
                                </router-link>
                            </div>

                            <!-- 追漫 -->
                            <div class="cartoon" v-show="loginShow" @mouseenter="cartoonEnter" @mouseleave="cartoonLeave">
                                <div class="drop_list">
                                    <div class="lens_transition  a-fadeinT" v-show="$store.state.Head.cartoonFlag">
                                        <div class="size_ruler">
                                            <div class="data_list">
                                                <div class="list_container">
                                                    <router-link :to="'/detailspage?id=' + item.id" @click="collectionGo"
                                                        class="data_item" v-for="(item, index) in collectionLists"
                                                        :key="index">
                                                        <a target="_blank">
                                                            <div role="img" :title="item.title" class="manga_cover">
                                                                <img :src="item.img">
                                                            </div>
                                                        </a>
                                                        <div class="text_section">
                                                            <a target="_blank">
                                                                <div :title="item.title"
                                                                    class="multi_line_text manga_title">
                                                                    {{ item.title }}
                                                                </div>
                                                            </a>
                                                            <div class="footer_text">
                                                                <div :title='`更新至 ${item.total} 话`' class="text">
                                                                    更新至 {{ item.total }} 话
                                                                </div>
                                                                <!-- <a class="read_progress">
                                                                                                                                            <div :title='`阅读至 ${item.curent} 话`' class="text">阅读至 {{item.curent}} 话</div>
                                                                                                                                        </a> -->
                                                            </div>
                                                        </div>
                                                    </router-link>
                                                </div>
                                            </div>
                                            <div class="more_btn_container">
                                                <router-link to="/collection">
                                                    <button class="more_button">查看全部</button>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <router-link to="/collection">
                                    <button>追漫</button>
                                </router-link>
                            </div>

                            <!-- 头像 -->
                            <div class="user_panel" v-show="loginShow" @mouseenter="userEnter" @mouseleave="userLeave">
                                <div class="drop_list">
                                    <div class="lens_transition  a-fadeinT" v-show="$store.state.Head.userFlag">
                                        <div class="size_ruler">
                                            <div class="user_info_panel">
                                                <div title="哀" class="user_name">哀</div>
                                                <a href="#" target="_blank">
                                                    <div class="info_item">
                                                        <img src="../../assets/img/漫币.png" class="item_icon">
                                                        <span class="item_text">漫币</span>
                                                        <span class="item_num">{{ money }}</span>
                                                    </div>
                                                </a>
                                                <a href="#" target="_blank">
                                                    <div class="info_item">
                                                        <img src="../../assets/img/漫读券.png" class="item_icon">
                                                        <span class="item_text">漫读券</span>
                                                        <span class="item_num">{{ reading }}</span>
                                                    </div>
                                                </a>
                                                <a href="#" target="_blank">
                                                    <div class="info_item">
                                                        <img src="../../assets/img/限免卡.png" class="item_icon">
                                                        <span class="item_text">限免卡</span>
                                                        <span class="item_num">{{ free }}</span>
                                                    </div>
                                                </a>
                                                <a href="#" target="_blank">
                                                    <div class="info_item">
                                                        <img src="../../assets/img/打折卡.png" class="item_icon">
                                                        <span class="item_text">打折卡</span>
                                                        <span class="item_num">{{ discount }}</span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="logout_btn_container" @click="logout">
                                                <button class="logout_button">退出登录</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <router-link to="/user">
                                    <div role="img" class="user_avatar">
                                        <img src="../../assets/img/touxiang.jpg" alt="哀">
                                    </div>
                                </router-link>
                            </div>

                            <!-- 登录注册 -->
                            <div class="login_register" v-show="!loginShow">
                                <div class="login">
                                    <el-button text @click="loginData">登录</el-button>
                                </div>
                                <span>|</span>
                                <div class="register">
                                    <el-button text>注册</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="head_box"></div>
            <loginCom />
        </header>
    </div>
</template>

<style lang="scss" scoped>
@import '../../assets/css/homecom.css';
@import '../../assets/css/personal.css';

// 搜索记录
.search_bar {
    height: 32px;
    margin-top: 9px;
    padding: 3px 8px;
    position: relative;
    box-sizing: border-box;

    .search_bar_bg {
        background-color: #f4f4f4;
        width: 92%;
        position: absolute;
        left: 8px;
        top: 23px;
        transition: all .4s cubic-bezier(.22, .58, .12, .98);

        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-track {
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            // background-color: #00aff0;
            display: none;
        }

        &::-webkit-scrollbar-thumb:hover {
            background-color: #00aff0;
            display: block;
        }

        &::-webkit-scrollbar-thumb:active {
            background-color: #00aff0;
        }

        .search_suggestion {
            left: 0;
            top: 0;
            padding: 0 10px;
            overflow: hidden;
            box-sizing: border-box;
            width: 100%;
            position: absolute;

            .data_list {
                height: 100%;
                position: relative;
                overflow: hidden !important;
                overflow-anchor: none;
                touch-action: auto;
                white-space: nowrap;
                text-overflow: ellipsis;


                .suggestion_item {
                    padding: 7px 0;
                    font-size: 13px;
                    cursor: pointer;
                    box-sizing: border-box;
                    animation: move-in-bottom .4s cubic-bezier(.22, .58, .12, .98);
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }

    form {
        background-color: #f4f4f4;
        position: relative;
        width: 100%;
        box-sizing: content-box;
        border-radius: 6px;

        .vertical_center {
            display: table;
            height: 100%;
            margin: 0 auto;

            &.re {
                position: relative;
            }

            .dp_table_cell {
                display: table-cell;
                vertical-align: middle;

                .placeholder_list {
                    padding: 0 8px;
                    overflow: hidden;
                    box-sizing: border-box;
                    height: 100%;
                    width: 100%;
                    top: 0;
                    left: 0;
                    position: absolute;

                    @keyframes rotate {
                        0% {
                            transform: rotateX(0deg) rotateY(0deg);
                        }

                        50% {
                            transform: translate(0, -50px);
                        }

                        100% {
                            transform: translate(0, -100px);
                        }
                    }

                    .placeholder_item {
                        width: 130px;
                        height: 26px;
                        font-size: 12px;
                        line-height: 26px;
                        color: #aaa;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        // transition: all .4s ease-in-out;
                        animation: rotate 5s infinite ease-in-out;
                    }
                }

                .search_input {
                    margin: 0 8px;
                    border: 0;
                    font-size: 12px;
                    background-color: transparent;
                    vertical-align: middle;
                    transition: all .2s cubic-bezier(.22, .58, .12, .98);
                }

                .confirm_btn {
                    // display: none;
                    padding: 5px;
                    vertical-align: middle;
                    background-color: transparent;
                    border: 0;
                    transform-origin: center center;
                    cursor: pointer;

                    .iconfont {
                        font-size: 16px;
                    }
                }
            }
        }
    }
}

.history {
    height: 100%;
    position: relative;

    &>.drop_list {
        width: 270px;
        position: absolute;
        top: 100%;
        left: 50%;
        // overflow: hidden;
        background-color: #fff;
        border-radius: 0 0 10px 10px;
        transform: translate(-50%);
        box-shadow: 0 10px 10px 0 rgb(0 0 0 / 16%);

        .lens_transition {
            width: 0;
            height: 0;
            transition: all .5s cubic-bezier(.22, .58, .12, .98);

            .size_ruler {
                width: 270px;
                background-color: #fff;
                animation-duration: .2s;

                .data_list {
                    padding: 24px;
                    box-sizing: border-box;

                    .list_container {
                        max-height: 313px;
                        overflow: hidden;
                        box-sizing: border-box;
                        position: relative;
                        overflow: hidden scroll;

                        &::-webkit-scrollbar {
                            width: 4px;
                        }

                        &::-webkit-scrollbar-track {
                            background-color: transparent;
                        }

                        &::-webkit-scrollbar-thumb {
                            // background-color: #00aff0;
                            display: none;
                        }

                        &::-webkit-scrollbar-thumb:hover {
                            background-color: #00aff0;
                            display: block;
                        }

                        &::-webkit-scrollbar-thumb:active {
                            background-color: #00aff0;
                        }

                        .data_item {
                            margin-bottom: 20px;
                            position: relative;
                            display: block;

                            .manga_cover {
                                width: 68px;
                                padding-top: 91px;
                                background-color: #eee;
                                position: relative;

                                img {
                                    width: 100%;
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                }
                            }
                        }

                        .text_section {
                            width: calc(100% - 68px);
                            padding-left: 16px;
                            top: 0;
                            left: 68px;
                            height: 100%;
                            box-sizing: border-box;
                            position: absolute;

                            .multi_line_text {
                                margin: 0;
                                font-size: 14px;
                                font-weight: 400;
                                color: rgba(0, 0, 0, .87);
                                text-align: left;
                                position: relative;
                                padding-right: 1em;
                                overflow: hidden;
                                white-space: normal;
                                margin-right: -1em;
                                line-height: 1.2em;
                                // text-align: justify;
                                // max-height: 2.6em;
                                // line-height: 1.3;

                                &:hover {
                                    color: #ff0066;
                                }
                            }

                            .footer_text {
                                padding: 0 16px;
                                left: 0;
                                bottom: 0;
                                font-size: 12px;
                                color: rgba(0, 0, 0, .3);
                                line-height: 1.6;
                                width: 100%;
                                box-sizing: border-box;
                                position: absolute;

                                .text {
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }

                                .read_progress {
                                    color: rgba(0, 0, 0, .3);

                                    .text {
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .more_btn_container {
            background-color: #f4f4f4;

            button {
                padding: 12px 0;
                color: rgba(0, 0, 0, .56);
                background-color: transparent;
                border: 0;
                transform-origin: center center;
                cursor: pointer;
                width: 100%;
            }
        }
    }

    &>a {
        button {
            height: 50px;
            padding: 0 15px;
            border: 0;
            font-size: 14px;
            background-color: transparent;
            color: rgba(0, 0, 0, .87);
            transform-origin: center center;
            cursor: pointer;

            &:hover {
                color: #ff0066;
            }
        }
    }
}

// 追漫
.cartoon {
    height: 100%;
    position: relative;

    &>.drop_list {
        width: 270px;
        position: absolute;
        top: 100%;
        left: 50%;
        // overflow: hidden;
        background-color: #fff;
        border-radius: 0 0 10px 10px;
        transform: translate(-50%);
        box-shadow: 0 10px 10px 0 rgb(0 0 0 / 16%);

        .lens_transition {
            width: 0;
            height: 0;
            transition: all .5s cubic-bezier(.22, .58, .12, .98);

            .size_ruler {
                width: 270px;
                background-color: #fff;
                animation-duration: .2s;

                .data_list {
                    padding: 24px;
                    box-sizing: border-box;

                    .list_container {
                        max-height: 313px;
                        overflow: hidden scroll;
                        box-sizing: border-box;
                        position: relative;

                        &::-webkit-scrollbar {
                            width: 4px;
                        }

                        &::-webkit-scrollbar-track {
                            background-color: transparent;
                        }

                        &::-webkit-scrollbar-thumb {
                            // background-color: #00aff0;
                            display: none;
                        }

                        &::-webkit-scrollbar-thumb:hover {
                            background-color: #00aff0;
                            display: block;
                        }

                        &::-webkit-scrollbar-thumb:active {
                            background-color: #00aff0;
                        }

                        .data_item {
                            margin-bottom: 20px;
                            position: relative;
                            display: block;

                            .manga_cover {
                                width: 68px;
                                padding-top: 91px;
                                background-color: #eee;
                                position: relative;

                                img {
                                    width: 100%;
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                }
                            }
                        }

                        .text_section {
                            width: calc(100% - 68px);
                            padding-left: 16px;
                            top: 0;
                            left: 68px;
                            height: 100%;
                            box-sizing: border-box;
                            position: absolute;

                            .multi_line_text {
                                margin: 0;
                                font-size: 14px;
                                font-weight: 400;
                                color: rgba(0, 0, 0, .87);
                                text-align: left;
                                position: relative;
                                padding-right: 1em;
                                overflow: hidden;
                                white-space: normal;
                                margin-right: -1em;
                                line-height: 1.2em;

                                &:hover {
                                    color: #ff0066;
                                }
                            }

                            .footer_text {
                                padding: 0 16px;
                                left: 0;
                                bottom: 0;
                                font-size: 12px;
                                color: rgba(0, 0, 0, .3);
                                line-height: 1.6;
                                width: 100%;
                                box-sizing: border-box;
                                position: absolute;

                                .text {
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }

                                .read_progress {
                                    color: rgba(0, 0, 0, .3);

                                    .text {
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .more_btn_container {
            background-color: #f4f4f4;

            button {
                padding: 12px 0;
                color: rgba(0, 0, 0, .56);
                background-color: transparent;
                border: 0;
                transform-origin: center center;
                cursor: pointer;
                width: 100%;
            }
        }
    }

    &>a {
        button {
            height: 50px;
            padding: 0 15px;
            border: 0;
            font-size: 14px;
            background-color: transparent;
            color: rgba(0, 0, 0, .87);
            transform-origin: center center;
            cursor: pointer;

            &:hover {
                color: #ff0066;
            }
        }
    }
}

// 头像
.user_panel {
    margin: 0 -20px 0 -5px;
    position: relative;

    &>.drop_list {
        width: 180px;
        position: absolute;
        left: 50%;
        top: 100%;
        background-color: #fff;
        border-radius: 0 0 10px 10px;
        transform: translate(-50%);
        box-shadow: 0 10px 10px 0 rgb(0 0 0 / 16%);
        transition-duration: .2s;

        .lens_transition {
            width: 0;
            height: 0;
            transition: all .5s cubic-bezier(.22, .58, .12, .98);

            .size_ruler {
                width: 180px;
                background-color: #fff;
                animation-duration: .2s;

                .data_list {
                    width: 0;
                    height: 0;
                }

                .user_info_panel {
                    padding: 35px 20px 20px;
                    top: 100%;
                    left: 50%;
                    box-sizing: border-box;
                    animation: move-in-bottom .4s cubic-bezier(.22, .58, .12, .98);

                    .user_name {
                        font-size: 16px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        text-align: center;
                    }

                    a {
                        .info_item {
                            margin: 20px 0 10px;
                            font-size: 12px;
                            color: rgba(0, 0, 0, .56);
                            display: flex;
                            align-items: center;

                            .item_icon {
                                width: 14px;
                                height: 14px;
                                margin-right: 4px;
                            }

                            .item_text {
                                flex: 1;
                                line-height: 1;
                            }

                            .item_num {
                                line-height: 1;
                            }
                        }
                    }
                }

                .logout_btn_container {
                    background-color: #f4f4f4;

                    .logout_button {
                        padding: 12px 0;
                        color: rgba(0, 0, 0, .56);
                        background-color: transparent;
                        border: 0;
                        transform-origin: center center;
                        cursor: pointer;
                        width: 100%;
                    }
                }
            }
        }
    }

    &>a {
        .user_avatar {
            width: 34px;
            height: 34px;
            margin: 8px 20px;
            background-color: #e5e9ef;
            border-radius: 50%;
            overflow: hidden;
        }
    }
}
</style>