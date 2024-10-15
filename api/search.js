import request from './http'

//搜索结果
//https://manga.bilibili.com/twirp/comic.v1.Comic/Search
export function SearchResult(key_word) {
    return request({
        url: "/twirp/comic.v1.Comic/Search",
        method: 'post',
        data: { "key_word": key_word, "page_num": 1, "page_size": 9 }
    })
}

// 搜索提示列表
// https://manga.bilibili.com/twirp/comic.v1.Comic/SearchSug
export function SearchSuggest(term) {
    return request({
        url: "/twirp/comic.v1.Comic/SearchSug",
        method: 'post',
        data: { "term": term, "num": 20 }
    })
}

// https://manga.bilibili.com/twirp/comic.v1.Comic/Recommend?device=pc&platform=web
export function Recommend() {
    return request({
        url: "/twirp/comic.v1.Comic/Recommend?device=pc&platform=web",
        method: 'post',
        data: { "JsonData": "[{\"pool_id\":100002,\"num\":5}]" }
    })
}