import React, {useContext, useEffect, useRef, useState} from 'react';
import {Form, Notification, Button, Toast} from '@douyinfe/semi-ui';
import {genderType, gradeType, REQUEST} from './data/api';
import {UserIdContext} from "../index";


export default function StudentInfo() {
    const userId = useContext(UserIdContext);
    const formRef = useRef(null);

    useEffect(() => {
        REQUEST.getStudent(userId)
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
                    formRef.current.formApi.setValues(result.data);
                }
            })
            .catch(error => {
                console.log("Error fetching matches", error);
                Notification.error({
                    title: '加载失败',
                    content: `无法获取学生用户信息：${error.message}`,
                })
            })
    }, []);

    // 表单提交回调
    const handleFormSubmit = (values) => {
        const studentInfo = {...values, userId: userId};
        REQUEST.updateStudent(studentInfo)
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
                    Toast.success("更改成功")
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
        <div style={{maxWidth: 600, margin: '0 auto', padding: '20px'}}>
            <h1 style={{textAlign: 'center', marginBottom: '20px'}}>修改学生信息</h1>
            <Form
                onSubmit={handleFormSubmit}
                labelPosition="left"
                labelAlign="right"
                ref={formRef}>
                <Form.Input
                    field="username"
                    label="姓名"
                    placeholder="请输入姓名"
                    required/>
                <Form.Select
                    field="grade"
                    label="年级"
                    required>
                    {gradeType.map((type) => (
                        <Form.Select.Option key={type.value} value={type.value}>
                            {type.label}
                        </Form.Select.Option>
                    ))}
                </Form.Select>

                <Form.Input
                    field="studentClass"
                    label="班级"
                    placeholder="请输入班级"
                    required/>
                <Form.Input
                    field="major"
                    label="专业"
                    placeholder="请输入专业"
                    required/>
                <Form.Input
                    field="department"
                    label="部门"
                    placeholder="请输入部门"
                    required/>
                <Form.TextArea
                    field="profile"
                    label="个人简介"
                    placeholder="请输入个人简介"
                    rows={4}/>
                <Form.Input
                    field="identityNumber"
                    label="身份证号"
                    placeholder="请输入身份证号"
                    required/>
                <Form.Select
                    field="gender"
                    label="性别"
                    required>
                    {genderType.map((type) => (
                        <Form.Select.Option key={type.value} value={type.value}>
                            {type.label}
                        </Form.Select.Option>
                    ))}
                </Form.Select>
                <Form.Input
                    field="age"
                    label="年龄"
                    placeholder="请输入年龄"
                    type="number"
                    required/>
                <Form.Input
                    field="phone"
                    label="电话"
                    placeholder="请输入电话"
                    required/>
                <Form.Slot>
                    <Button type="primary" htmlType="submit" style={{marginRight: 16}}>
                        保存更改
                    </Button>
                    <Button htmlType="reset" type="tertiary">
                        重置
                    </Button>
                </Form.Slot>
            </Form>
        </div>
    );
}
