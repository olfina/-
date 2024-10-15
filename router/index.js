import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView"),
    meta: {
      istrun: true,
      istrun1: true,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
  {
    path: "/classify",
    name: "classify",
    component: () => import("../views/ClassifyView"),
    meta: {
      istrun: true,
      istrun1: true,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
  {
    path: "/detailspage",
    name: "detailspage",
    component: () => import("../views/DetailspageView"),
    meta: {
      istrun: true,
      istrun1: true,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
  {
    path: "/ranking",
    name: "ranking",
    component: () => import("../views/RankingView"),
    meta: {
      istrun: false,
      istrun1: true,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
  {
    path: "/readingpage",
    name: "readingpage",
    component: () => import("../views/ReadingpageView"),
    meta: {
      istrun: false,
      istrun1: false,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/SearchView"),
    meta: {
      istrun: false,
      istrun1: true,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
  {
    path: "/update",
    name: "update",
    component: () => import("../views/UpdateView"),
    meta: {
      istrun: true,
      istrun1: true,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/home/loginCom"),
    meta: {
      istrun: false,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/UserView"),
    meta: {
      istrun: false,
      istrun1: true,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
  {
    path: "/coupon",
    name: "coupon",
    component: () => import("../views/CouponView"),
    meta: {
      istrun: false,
      istrun1: true,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
  {
    path: "/free",
    name: "free",
    component: () => import("../views/FreeView"),
    meta: {
      istrun: false,
      istrun1: true,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
  {
    path: "/discount",
    name: "discount",
    component: () => import("../views/DiscountView"),
    meta: {
      istrun: false,
      istrun1: true,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
  {
    path: "/buypic",
    name: "buypic",
    component: () => import("../views/BuypicView"),
    meta: {
      istrun: false,
      istrun1: true,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
  {
    path: "/collection",
    name: "collection",
    component: () => import("../views/CollectionView"),
    meta: {
      istrun: false,
      istrun1: true,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
  {
    path: "/readhistory",
    name: "readhistory",
    component: () => import("../views/ReadhistoryView"),
    meta: {
      istrun: false,
      istrun1: true,
      keepAlive: true, // 组件缓存
      refresh: false, // activated钩子触发时是否重新加载数据
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'con',
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
