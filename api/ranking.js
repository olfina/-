import request from './http'
// 
// https://manga.bilibili.com/twirp/comic.v1.Comic/ListRank
export function getRankingData() {
    return request({
        url: "/twirp/comic.v1.Comic/ListRank",
        method: 'post',
        data: {}
    })
}

