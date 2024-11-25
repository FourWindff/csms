import React, {useState} from 'react';
import { List, Avatar, Button, ButtonGroup } from '@douyinfe/semi-ui';
import {studentMock, teacherMock, teachers} from "./data/api";



// 老师管理页面组件
export default function TeacherManagement() {
    const [teachers, setTeachers] = useState(teacherMock);






    const handleEdit = (teacher) => {
        alert(`编辑老师: ${teacher.userId}`);
    };

    const handleDelete = (teacher) => {
        alert(`删除老师: ${teacher.userId}`);
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>教师管理</h1>
            <List
                dataSource={teachers}
                renderItem={(teacher) => (
                    <List.Item
                        key={teacher.id}
                        header={
                            <Avatar color={teacher.gender === 'male' ? 'blue' : 'pink'}>
                                {teacher.username.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        main={
                            <div>
                                <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>
                                    {teacher.username} ({teacher.gender})
                                </span>
                                <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                    教师ID: {teacher.userId}, 电话: {teacher.phone}
                                </p>
                                <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                    年资: {teacher.teachAge} 年, 专业: {teacher.major}
                                </p>
                                <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                    简介: {teacher.profile}
                                </p>
                            </div>
                        }
                        extra={
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <ButtonGroup theme="borderless">
                                    <Button onClick={() => handleEdit(teacher)}>编辑</Button>
                                    <Button onClick={() => handleDelete(teacher)} type="danger">删除</Button>
                                </ButtonGroup>
                            </div>
                        }
                    />
                )}
            />
        </div>
    );
}
