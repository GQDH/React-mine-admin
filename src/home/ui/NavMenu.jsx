import React from 'react';
import {Menu } from 'antd';
import { useHistory } from 'react-router-dom';
// import {GET_DEAT_LIST} from '@/store/actionType.js';
import {useDispatch} from 'react-redux';
//导入数据
import menuList from '@/resource/menuConfig'; 

const {SubMenu}=Menu;

const NavMenu=()=>{
    // 使用react-redux中的useDispatch钩子，来调用redux中的dispatch方法，来redux改变数据
    const dispatch=useDispatch();
    const history=useHistory();
    function handleClick(e){
        console.log(dispatch)
        console.log('click',e);
        sessionStorage.setItem('title',e.item.props.title)
        dispatch({
            type:'1',
            title:e.item.props.title
        })
        history.push(e.key);
    }
    return(
      <nav className="nav-menu">
          <h1>后台管理</h1>
         <Menu onClick={handleClick} mode="vertical" theme="dark">
                {
                    menuList.map(item=>{
                        if(!!item.children){
                            return(
                                <SubMenu key={item.key} title={item.title}>
                                   {
                                     item.children.map(value=>{
                                         return <Menu.Item key={value.key} title={value.title}>{value.title}</Menu.Item>
                                     })
                                   }
                                </SubMenu>
                            )
                        }else{
                        return <Menu.Item key={item.key} title={item.title}>{item.title}</Menu.Item>
                        }
                    })
                }
         </Menu>
      </nav>
    )
}

export default NavMenu;