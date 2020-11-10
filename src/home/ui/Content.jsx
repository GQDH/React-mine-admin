import React from 'react';
const Content = (props) => {
    console.log(props.children);
    return (
        <div>
            {/* 使用children，作为插槽，来接收welcome组件中的内容 */}
            {props.children}
        </div>
    );
}

export default Content;