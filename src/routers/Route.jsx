// 将所有的路由信息都写在这个里面
import React from 'react';
import  {Switch,Route,Redirect,BrowserRouter} from 'react-router-dom';
import {Home} from '@/home/index.js';
import NotFound from '@/notfound/NotFound.jsx';
import App from '../App.jsx';
import Welcome from '@/pages/ui/Welcome.jsx';
import Botton from '@/pages/container/Button.jsx';
import Modal from '@/pages/container/Modal.jsx';
import Login from '@/pages/form/Login.jsx'
import Register from '@/pages/form/Register.jsx'
import Basic from '@/pages/table/Basic.jsx'
import High from '@/pages/table/High.jsx'
import Cities from '@/pages/cities/Cities.jsx'


const route = () => {
    return (
        // 使用BrowserRouter包裹整个Route
        <BrowserRouter>
         {/* 使用 App包裹整个路由 */}
        {/* App组件里面放东西的话，在App组件中必须得使用props.children作为插槽 */}
            <App>
                <Switch>
                    <Redirect from="/" to="/admin" exact></Redirect>
                    <Route path="/admin" component={()=><Home>
                        <Switch>
                            <Redirect from="/admin" to="/admin/home" exact></Redirect>
                            <Route path="/admin/home" component={()=><Welcome></Welcome>}></Route>
                            <Route path="/admin/ui/buttons" component={()=><Botton></Botton>}></Route>
                            <Route path="/admin/ui/modals" component={()=><Modal></Modal>}></Route>
                            <Route path="/admin/form/login" component={()=><Login></Login>}></Route>
                            <Route path="/admin/form/reg" component={()=><Register></Register>}></Route>
                            <Route path="/admin/table/basic" component={()=><Basic></Basic>}></Route>
                            <Route path="/admin/table/high" component={()=><High></High>}></Route>
                            <Route path="/admin/city" component={()=><Cities></Cities>}></Route>
                        </Switch>
                    </Home>}></Route>
                    <Route path="*" component={()=><NotFound></NotFound>}></Route>
                </Switch>
            </App>
        </BrowserRouter> 
    );
}

export default route;