


import React, {useState, useEffect, useContext, useRef} from 'react';
import {Form, Input, Notification, Button, Select, Toast} from '@douyinfe/semi-ui';
import API_ENDPOINTS, {genderType, gradeType, matchType, REQUEST} from './data/api';
import {UserIdContext} from "../index"; // API 端点


export default function TeacherInfo() {
    const userId = useContext(UserIdContext);
    const formRef = useRef(null);

    useEffect(() => {
        REQUEST.getTeacher(userId)
            .then(response => {
                if (!response.ok) {
                    Toast.error(`请求错误！${response.json()}`);
                } else {
                    return response.json();
                }
            })
            .then(result => {
                if (!result) return;
                const code = result?.code;
                if (code === 1) {
                    console.log(result.data)
                    formRef.current.formApi.setValues(result.data);
                }
            })
            .catch(error => {
                console.log("Error fetching matches", error);
                Notification.error({
                    title: '加载失败',
                    content: `无法获取教师用户信息：${error.message}`,
                })
            })
    }, []);

    // 表单提交回调
    const handleFormSubmit = (values) => {
        const studentInfo = {...values, userId: userId};
        REQUEST.updateTeacher(studentInfo)
            .then(response => {
                if (!response.ok) {
                    Toast.error("请求错误");
                } else {
                    return response.json();
                }
            })
            .then(result => {
                if (!result) return;
                const code = result.code;
                if (code === 1) {
                    Toast.success("更改成功");
                } else {
                    Toast.error("更改失败")
                }
            })
            .catch(error => {
                Notification.error({
                    title: '网络错误',
                    content: `提交失败：${error.message}`,
                });
            })
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>修改老师信息</h1>
            <Form
                ref={formRef}
                onSubmit={handleFormSubmit}
                labelPosition="left"
                labelAlign="right"
            >
                {/* 老师姓名 */}
                <Form.Input
                    field="username"
                    label="姓名"
                    placeholder="请输入姓名"
                    required
                />

                {/* 教龄 */}
                <Form.Input
                    field="teachAge"
                    label="教龄"
                    placeholder="请输入教龄"
                    required
                />

                {/* 专业 */}
                <Form.Input
                    field="major"
                    label="专业"
                    placeholder="请输入专业"
                    required
                />

                {/* 部门 */}
                <Form.Input
                    field="department"
                    label="部门"
                    placeholder="请输入部门"
                    required
                />

                {/* 个人简介 */}
                <Form.TextArea
                    field="profile"
                    label="个人简介"
                    placeholder="请输入个人简介"
                    rows={4}
                />

                {/* 电话 */}
                <Form.Input
                    field="phone"
                    label="电话"
                    placeholder="请输入电话"
                    required
                />

                {/* 性别 */}
                <Form.Select
                    field="gender"
                    label="性别"
                    required
                >
                    {genderType.map((type) => (
                        <Form.Select.Option key={type.value} value={type.value}>
                            {type.label}
                        </Form.Select.Option>
                    ))}

                    </Form.Select>

                {/* 年龄 */}
                <Form.Input
                    field="age"
                    label="年龄"
                    placeholder="请输入年龄"
                    type="number"
                    required
                />

                {/* 提交按钮 */}
                <Form.Slot>
                    <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>
                        提交
                    </Button>
                    <Button htmlType="reset" type="tertiary">
                        重置
                    </Button>
                </Form.Slot>
            </Form>
        </div>
    );
}
