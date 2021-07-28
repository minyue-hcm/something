import React, { useRef, useState, useEffect, useMemo } from "react";
import { debounce } from "../../api/utils";
import { SearchBoxWrapper } from "./style";

const SearchBox = (props) => {
  const queryRef = useRef();
  const [query, setQuery] = useState("");
  // 从父组件热门搜索中拿到的新关键词
  const { newQuery } = props;
  // 父组件针对搜索关键字发请求相关的处理
  const { handleQuery } = props;
  // 根据关键字是否存在决定清空按钮的显示 / 隐藏
  const displayStyle = query ? { display: "block" } : { display: "none" };

  const clearQuery = () => {
    setQuery("");
    queryRef.current.focus();
  };
  //1.进场时 input 框应该出现光标
  useEffect(() => {
    queryRef.current.focus();
  }, []);
  //2.query改变执行回调
  // 监听 input 框的内容
  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
  };

  // 缓存方法
  let handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500);
  }, [handleQuery]);

  useEffect(() => {
    // 注意防抖
    handleQueryDebounce(query);
  }, [query]);
  //父组件点击热门搜索关键字，newQuery更新
  useEffect(() => {
    if (newQuery !== query) {
      setQuery(newQuery);
    }
  }, [newQuery]);
  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => props.back()}>
        &#xe655;
      </i>
      <input
        ref={queryRef}
        className="box"
        placeholder="搜索歌曲、歌手、专辑"
        value={query}
        onChange={handleChange}
      />
      <i
        className="iconfont icon-delete"
        onClick={clearQuery}
        style={displayStyle}
      >
        &#xe600;
      </i>
    </SearchBoxWrapper>
  );
};

export default React.memo(SearchBox);
// 内容改变时要执行父组件传来的回调
// 当父组件点击热门搜索中的关键词时，如果新关键词与现在的 query 不同，则修改 query 并执行回调
