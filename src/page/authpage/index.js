// AuthPage.js
import React, {useState} from 'react';
import {Form, Button, Tabs, Toast, Notification} from '@douyinfe/semi-ui';
import {useNavigate} from 'react-router-dom';
import API_ENDPOINTS, {getFormData, REQUEST} from "../homepage/contentwindow/data/api";


export default function AuthPage() {
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();
    const handleSuccess = (message, data) => {
        Toast.success(message);
        navigate('/home', {
            state: {
                username: data?.username || data.role,
                userId: data?.userId,
                role: data?.role,
            }
        });
    }
    const handleError=(message)=>{
        Toast.error(message);
    }
    const handleLogin = (values) => {
        console.log('Login:', values);
        const formData = getFormData(values);
        REQUEST.POST_REQUEST(
            API_ENDPOINTS.login,
            formData,
            handleSuccess,
            handleError
        );
    };
    const handleRegister = (values) => {
        console.log('Register:', values);
        const formData=getFormData(values);
        REQUEST.POST_REQUEST(
            API_ENDPOINTS.register,
            formData,
            handleSuccess,
            handleError
        );
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
