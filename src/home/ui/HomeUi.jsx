import React from 'react';
import {Row, Col} from 'antd'


import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Content from './Content.jsx'
import NavMenu from './NavMenu.jsx'
import {useHistory}  from 'react-router-dom'
import "./index.less"

const HomeUi=(props)=>{
    console.log(useHistory());
    return (
        <div className="home-wrap"> 
                <Row>
                    <Col span={4}>
                        <NavMenu></NavMenu>
                    </Col>
                    <Col span={20} style={{height:'100vh',overflow:'auto'}}>
                        <Header></Header>
                        {/* 接收来自Home中的props信息 */}
                         <Content children={props.children}></Content>
                        <Footer></Footer> 
                    </Col>
                </Row>
        </div>
    )
}

export default HomeUi;