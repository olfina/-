import request from './http'

export function getUpdateData() {
    return request({
        url: "./json/update.json",
        method: 'get'
    })
}

//更新推荐
//https://manga.bilibili.com/twirp/comic.v1.Comic/GetDailyPush
export function getRenewData(date) {
    return request({
        url: "/twirp/comic.v1.Comic/GetDailyPush",
        method: 'post',
        data:{"date":date,"page_num":1,"page_size":8}
    })
}