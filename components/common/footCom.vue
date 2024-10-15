<template>
    <div class="footCom" v-if='$route.meta.istrun'>
        <footer>
            <div class="container">
                <div class="foot_top">
                    <div class="foot_left">
                        <div class="foot_logo">
                            <img src="../../assets/img/home/logo.png" alt="">
                            <h2>哔哩哔哩漫画</h2>
                        </div>
                        <div class="foot_wrap">
                            <ul class="foot_list">
                                <li class="foot_item">关于我们</li>
                                <li class="foot_item">联系我们</li>
                                <li class="foot_item">友情链接</li>
                                <li class="foot_item">加入我们</li>
                            </ul>
                        </div>
                    </div>
                    <div class="foot_middle"></div>
                    <div class="foot_right">
                        <ul class="clearfix">
                            <li>
                                <a href="javascript:;">
                                    <img src="../../assets/img/svg/b站官号.svg" alt="">
                                    <p>B站官号</p>
                                    <div class="follow">
                                        关注即送券
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src="../../assets/img/svg/微博.png" alt="">
                                    <p>新浪微博</p>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src="../../assets/img/svg/下载.png" alt="">
                                    <p> 下载 bilibili 漫画客户端</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="foot_bottom">
                    <div class="logo_list clearfix">
                        <img src="../../assets/img/svg/合作机构.png" class="logo_img">
                        <img src="../../assets/img/svg/看看新闻.png" class="logo_img">
                    </div>
                    <div class="text_info">
                        <p>
                            互联网 ICP 备案：沪 ICP17039440 号 - 1 | 网络文化经营许可证：沪网文 [2020]5452-371 号
                        </p>
                        <p>全国网安备案号:31011002003092 | 增值电信业务经营许可证 沪 B2-20190879</p>
                        <p>
                            <a href="https://jbts.mct.gov.cn">
                                12345 政务服务便民热线
                            </a>
                            <span>|</span>
                            <a href="http://www.shjbzx.cn">
                                上海市互联网违法和不良信息举报中心
                            </a>
                        </p>
                        <p>
                            上海呵呵呵文化传播有限公司 | 地址:上海市杨浦区政立路485号 | 电话:021-25099888
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>


<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/footcom.css';
</style>