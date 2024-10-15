import request from './http'

// https://manga.bilibili.com/twirp/comic.v1.Comic/GetRankInfo
export function getRankComData(ids) {
    return request({
        url: "/twirp/comic.v1.Comic/GetRankInfo",
        method: 'post',
        data: { "id": ids }
    })
}