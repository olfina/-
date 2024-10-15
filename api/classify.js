import request from './http'

export function getClassifyData() {
    return request({
        url: "./json/classify.json",
        method: 'get'
    })
}

// 类型
// https://manga.bilibili.com/twirp/comic.v1.Comic/AllLabel
export function getClassifyTypeData() {
    return request({
        url: "/twirp/comic.v1.Comic/AllLabel",
        method: 'post',
        data: {}
    })
}

// 内容
// https://manga.bilibili.com/twirp/comic.v1.Comic/ClassPage
export function getClassifyContentData(query) {
    // console.log(query);
    return request({
        url: "/twirp/comic.v1.Comic/ClassPage",
        method: 'post',
        data: { "style_id": query.query[0], "area_id": query.query[1], "is_finish": query.query[2], "order": query.query[4], "page_num": 1, "page_size": query.query[5], "is_free": query.query[3] }
    })
}