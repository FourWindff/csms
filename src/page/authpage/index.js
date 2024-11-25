// AuthPage.js
import React, { useState} from 'react';
import {Form, Button, Tabs, Toast, Notification} from '@douyinfe/semi-ui';
import {useNavigate} from 'react-router-dom';
import {REQUEST} from "../homepage/contentwindow/data/api";


export default function AuthPage() {
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();

    const handleLogin = (values) => {
        console.log('Login:', values);
        REQUEST.login(values)
            .then(response => {
                if (!response.ok) {
                    Notification.error({
                        title: '登录请求失败',
                        content: `错误信息：${response.json()}`,
                    });
                }else{
                    return response.json();
                }

            })
            .then(result => {
                if(!result) return ;
                const code = result?.code;
                const message = result?.msg;
                const data = result?.data;
                if (code === 1) {
                    Toast.success('登录成功！');
                    navigate('/home', {
                        state: {
                            username: data?.username || data.role,
                            userId: data?.userId,
                            role: data?.role,
                        }
                    });
                } else {
                    Notification.error({
                        title: '登录失败',
                        content: `错误原因：${message}`,
                    });
                }
            })
            .catch(error => {
                Toast.error(`错误！${error}`);
            })
    };
    const handleRegister = (values) => {
        console.log('Register:', values);
        REQUEST.register(values)
            .then(response => {
                if (!response.ok) {
                    Notification.error({
                        title: '注册请求失败',
                        content: `错误信息：${response.json()}`,
                    });
                }
                return response.json();
            })
            .then(result => {
                const code = result.code;
                const message = result.msg;
                const data = result.data;
                if (code === 1) {
                    Toast.success('注册成功！');
                    navigate('/home', {
                        state: {
                            username: data?.username || data.role,
                            userId: data?.userId,
                            role: data?.role,
                        }
                    });
                } else {
                    Notification.error({
                        title: '注册失败',
                        content: `错误原因：${message}`,
                    });
                }
            })
            .catch(error => {
                Toast.error(`错误！${error}`);
            })

    };

    return (
        <div style={{maxWidth: 400, margin: '50px auto', textAlign: 'center'}}>
            <h2>{activeTab === 'login' ? '登录' : '注册'}</h2>
            <Tabs
                activeKey={activeTab}
                onChange={(key) => setActiveTab(key)}
                type="button"
                style={{marginBottom: 30}}>
                <Tabs.TabPane tab="登录" itemKey="login"/>
                <Tabs.TabPane tab="注册" itemKey="register"/>
            </Tabs>

            {activeTab === 'login' && (
                <Form labelPosition="left" onSubmit={handleLogin} style={{textAlign: 'left'}}>
                    <Form.Input
                        field="userId"
                        label="账号"
                        placeholder="请输入账号"
                        rules={[{required: true, message: '账号不能为空'}]}/>
                    <Form.Input
                        field="password"
                        label="密码"
                        placeholder="请输入密码"
                        type="password"
                        rules={[{required: true, message: '密码不能为空'}]}/>
                    <Button
                        htmlType="submit"
                        theme="solid"
                        type="primary"
                        style={{marginTop: 20, width: '100%'}}>登录</Button>
                </Form>
            )}

            {activeTab === 'register' && (
                <Form labelPosition="left" onSubmit={handleRegister} style={{textAlign: 'left'}}>
                    <Form.Input
                        field="userId"
                        label="账号"
                        placeholder="请输入账号"
                        rules={[{required: true, message: '邮箱不能为空'}]}/>
                    <Form.RadioGroup field="role" label='身份'>
                        <Form.Radio value="student">学生</Form.Radio>
                        <Form.Radio value="teacher">老师</Form.Radio>
                    </Form.RadioGroup>
                    <Form.Input
                        field="password"
                        label="密码"
                        placeholder="请输入密码"
                        type="password"
                        rules={[{required: true, message: '密码不能为空'}]}/>
                    <Button
                        htmlType="submit"
                        theme="solid"
                        type="primary"
                        style={{marginTop: 20, width: '100%'}}>注册</Button>
                </Form>
            )}
        </div>
    );
};
