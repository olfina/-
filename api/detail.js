import request from "./http";

export function getDetailData(params) {
  return request({
    url: "/mbcomic/ComicDetail",
    method: "get",
    params,
  });
}

export function getDetailData1() {
  return request({
    url: "mbcomic/reply",
    method: "get",
    params: {
      oid: 25717,
    },
  });
}

//详情页
//https://manga.bilibili.com/twirp/comic.v1.Comic/ComicDetail
export function getDetailsData(data) {
  return request({
    url: "/twirp/comic.v1.Comic/ComicDetail?device=pc&platform=web",
    method: "post",
    data: { comic_id: data },
  });
}

//详情页 推荐漫画
//https://manga.bilibili.com/twirp/comic.v1.Comic/MoreRecommend
export function getRecommendData(data) {
  return request({
    url: "/twirp/comic.v1.Comic/MoreRecommend",
    method: "post",
    data: { comic_id: data },
  });
}

//评论
// https://api.bilibili.com/x/v2/reply?jsonp=jsonp&type=22&oid=27915&sort=2
// export function getCommentData() {
//   return request({
//     url: "/x/v2/reply?jsonp=jsonp&type=22&oid=27915&sort=2",
//     method: "get",
//     // params:{
//     //     type:22,
//     //     oid:27915,
//     //     sort:2
//     // }
//   });
// }

// https://api.bilibili.com/x/v2/reply?type=22&oid=27915&sort=2oid=27915&sort=2
export function getCommentData(data) {
  return request({
    url: "/x/v2/reply?type=22&oid="+data+"&sort=2",
    method: "get",
  });
}

//https://api.bilibili.com/x/v2/reply?type=22&oid=27915&sort=0
// export function getCommentData(data) {
//   return request({
//     url: "/x/v2/reply?type=22&oid="+data+"&sort=0",
//     method: "get",
//   });
// }