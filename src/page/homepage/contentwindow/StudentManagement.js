import React, {useState} from 'react';
import { List, Avatar, Button, ButtonGroup } from '@douyinfe/semi-ui';
import {matchesMock, studentMock} from "./data/api";


export default function StudentManagement() {

    const [students, setMatches] = useState(studentMock);
    const handleDelete = (student) => {
        alert(`删除学生: ${student.username}`);
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>学生管理</h1>
            <List
                dataSource={students}
                renderItem={(student) => (
                    <List.Item
                        key={student.id}
                        header={
                            <Avatar color={student.gender === 'male' ? 'blue' : 'pink'}>
                                {student.username.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        main={
                            <div>
                                <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>
                                    {student.username} ({student.gender})
                                </span>
                                <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                    学号: {student.userId}, 身份证号: {student.identityNumber}
                                </p>
                                <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                    年龄: {student.age}, 年级: {student.grade}, 班级: {student.class}
                                </p>
                                <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                    专业: {student.major}, 部门: {student.department}
                                </p>
                                <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                    简介: {student.profile}
                                </p>
                            </div>
                        }
                        extra={
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <ButtonGroup theme="borderless">
                                    <Button onClick={() => handleDelete(student)} type="danger">删除</Button>
                                </ButtonGroup>
                            </div>
                        }
                    />
                )}
            />
        </div>
    );
}
