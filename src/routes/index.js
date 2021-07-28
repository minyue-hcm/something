import React, { Suspense, lazy } from "react";
//重定向新的url，覆盖当前，to属性实现跳转
import { Redirect } from "react-router-dom";
import Home from "../application/Home";

//懒加载，提升首屏加载速度
const RecommendComponent = lazy(() => import("../application/Recommend/"));
const SingersComponent = lazy(() => import("../application/Singers/"));
const RankComponent = lazy(() => import("../application/Rank/"));
const AlbumComponent = lazy(() => import("../application/Album/"));
const SingerComponent = lazy(() => import("./../application/Singer/"));
const SearchComponent = lazy(() => import("./../application/Search/"));

const SuspenseComponent = (Component) => (props) => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  );
};

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/recommend"} />,
      },
      {
        path: "/recommend",
        component: SuspenseComponent(RecommendComponent),
        routes: [
          {
            path: "/recommend/:id",
            component: SuspenseComponent(AlbumComponent),
          },
        ],
      },
      {
        path: "/singers",
        component: SuspenseComponent(SingersComponent),
        key: "singers",
        routes: [
          {
            path: "/singers/:id",
            component: SuspenseComponent(SingerComponent),
          },
        ],
      },
      {
        path: "/rank",
        component: SuspenseComponent(RankComponent),
        key: "rank",
        routes: [
          {
            path: "/rank/:id",
            component: SuspenseComponent(AlbumComponent),
          },
        ],
      },
      //搜索时：调用显示歌单
      {
        path: "/album/:id",
        exact: true,
        key: "album",
        component: SuspenseComponent(AlbumComponent),
      },
      {
        path: "/search",
        exact: true,
        key: "search",
        component: SuspenseComponent(SearchComponent),
      },
    ],
  },
];
