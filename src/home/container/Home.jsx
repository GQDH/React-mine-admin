import React from 'react';
import HomeUi from '../ui/HomeUi.jsx';

const Home = (props) => {
  console.log(props.children);
  return (
    // 接收来自路由信息中Home包裹的welcome组件信息
    <HomeUi children={props.children}></HomeUi>
  );
}

export default Home;