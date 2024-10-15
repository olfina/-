import request from './http'

export function getHomeData() {
    return request({
        url: "./json/home.json",
        method: 'get'
    })
}
//轮播图
// https://manga.bilibili.com/twirp/comic.v1.Comic/Banner?device=pc&platform=web
export function getBannerData() {
    return request({
        url: '/twirp/comic.v1.Comic/Banner?device=pc&platform=web',
        method: 'post',
        data: { "platform": "pc" },
    })

}
//为你推荐
export function getRecommendData() {
    return request({
        url: "/twirp/comic.v1.Comic/HomeRecommend?device=pc&platform=web",
        method: "post",
        data: { "page_num": 1, "seed": "0" },


    })
}
//热门速递 小标题
// https://manga.bilibili.com/twirp/comic.v1.Comic/GetClassPageLayout
export function getHottitleData() {
    return request({
        url: '/twirp/comic.v1.Comic/GetClassPageLayout',
        method: 'post',
        data: { "tab_id": 271 }
    })
}
//热门速递 内容
// https://manga.bilibili.com/twirp/comic.v1.Comic/GetClassPageSixComics
export function getHotData(data_id, page_num) {
    return request({
        url: '/twirp/comic.v1.Comic/GetClassPageSixComics',
        method: 'post',
        data: { "id": data_id, "isAll": 0, "page_num": page_num, "page_size": 8 },
    })
}
//都市生活
//https://manga.bilibili.com/twirp/comic.v1.Comic/ClassPage
export function getUrbanData() {
    return request({
        url: '/twirp/comic.v1.Comic/ClassPage',
        method: 'post',
        data: { "style_id": 1002, "area_id": -1, "is_finish": -1, "order": 0, "page_num": 7, "page_size": 6, "is_free": -1 },
    })
}
//奇异异界
//https://manga.bilibili.com/twirp/comic.v1.Comic/ClassPage
export function getStrangeData() {
    return request({
        url: '/twirp/comic.v1.Comic/ClassPage',
        method: 'post',
        data: { "style_id": 998, "area_id": -1, "is_finish": -1, "order": 0, "page_num": 1, "page_size": 6, "is_free": -1 },
    })
}
//古风恋爱
//https://manga.bilibili.com/twirp/comic.v1.Comic/ClassPage
export function getArchaicData() {
    return request({
        url: '/twirp/comic.v1.Comic/ClassPage',
        method: 'post',
        data: { "style_id": 997, "area_id": -1, "is_finish": -1, "order": 0, "page_num": 8, "page_size": 6, "is_free": -1 },
    })
}