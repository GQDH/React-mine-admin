import React from 'react';

import {Space,Card,Button,Form,Input,Checkbox,Typography} from  'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const {Link} = Typography

const Login = () => {
    Form.useForm();

    const onFinish = (values) => {
        console.log('finish: ',values);
      };


      
    const onFinish1 = (values) => {
        console.log('finish: ',values);
      };
    return (
        <Space style={{width:"100%"}} direction="vertical">
                <Card title="登录行内表单">
                    <Space>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                        layout="inline"
                        initialValues={{
                            username: 'qiangzi',
                            password: 123456,
                            remember: true,
                          }}
                        >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input
                            type="password"
                            placeholder="请输入密码"
                            />
                        </Form.Item>

                        <Form.Item shouldUpdate={true}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                        </Form.Item>
                        </Form>
                    </Space>
                </Card>


                <Card title="登录水平表单">
                    <Space>



                    <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                username: 'qiang',
                                password: 123456,
                                remember: true,
                              }}
                            onFinish={onFinish1}
                            >
                            <Form.Item
                                style={{width:'300px'}}
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                style={{width:'300px'}}
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住密码</Checkbox>
                                </Form.Item>

                                <Link className="login-form-forgot"  style={{margin:'50px'}}>
                                忘记密码
                                </Link>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                                </Button>
                            </Form.Item>
                            </Form>
                    </Space>
                </Card>
          </Space>
    );
}

export default Login;