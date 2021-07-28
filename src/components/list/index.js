import React from "react";
import { ListWrapper, ListItem, List } from "./style";
import { getCount } from "../../api/utils";
import LazyLoad from "react-lazyload";
//一个组件包裹进Route里面, 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中
//某个东西不是一个Router, 但是我们要依靠它去跳转一个页面
import { withRouter } from "react-router-dom";

function RecommendList(props) {
  const enterDetail = (id) => {
    props.history.push(`/recommend/${id}`);
  };
  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {props.recommendList.map((item, index) => {
          return (
            <ListItem key={item.id} onClick={() => enterDetail(item.id)}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                {/* 加此参数可以减小请求的图片资源大小 */}
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require("./music.png")}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.picUrl + "?param=300x300"}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          );
        })}
      </List>
    </ListWrapper>
  );
}

export default React.memo(withRouter(RecommendList));
