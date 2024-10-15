import request from './http'

//阅读页数据
export function getReadData0() {
    return request({
        url: "./json/read.json",
        method: "get",
    })
}

//阅读页数据
export function getReadData(params) {
    return request({
        url: "/mbcomic/GetImageIndex",
        method: "get",
        params
    })
}

export function getReadData1(params) {
    return request({
        url: "/mbcomic/ImageToken",
        method: "get",
        params
    })
}

// https://manga.bilibili.com/twirp/comic.v1.Comic/GetImageIndex?device=pc&platform=web
export function GetImageIndex(data) {
    return request({
        url: "/twirp/comic.v1.Comic/GetImageIndex?device=pc&platform=web",
        method: "post",
        data: { "ep_id": data }
    })
}

// https://manga.bilibili.com/twirp/comic.v1.Comic/ImageToken?device=pc&platform=web
export function ImageToken(path) {
    return request({
        url: "/twirp/comic.v1.Comic/ImageToken?device=pc&platform=web",
        method: "post",
        data: { "urls": "[\"" + path + ".jpg@1100w.jpg\"]" }
        // /bfs/manga/63c83cc150c154ab5f360c6a2aa6f6137862f854.jpg
    })
}

