import React from 'react';
import '@/App.less';
const App = (props) => (
  <div className="App">
    {/* 相当于react中的插槽 ，在父组件中使用*/}
    {props.children}
  </div>
  
);

export default App;
