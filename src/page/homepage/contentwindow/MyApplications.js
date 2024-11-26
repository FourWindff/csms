import React, {useState, useEffect, useContext} from "react";
import {List, Typography, Divider, Toast} from "@douyinfe/semi-ui";

import API_ENDPOINTS, {REQUEST} from "./data/api";
import {UserContext} from "../index"; // 假设有这样的 API 配置
const getStatusLabel = (status) => {
    switch (status) {
        case 'PENDING':
            return '审核中';
        case 'APPROVED':
            return '审核通过';
        case 'REJECTED':
            return '审核不通过';
        default:
            return 'status';
    }
};
export default function MyApplication() {
    const [myApplication, setMyApplication] = useState([]); // 存储数据
    const user = useContext(UserContext); // 获取用户 ID

    // 获取数据的副作用
    useEffect(() => {
        REQUEST.GET_REQUEST(
            API_ENDPOINTS.getRegistration,
            user.userId,
            (message, data) => {
                setMyApplication(data);
            },
            (message) => {
                Toast.error(message);
            }
        )

    }, []);

    // 渲染组件
    return (
        <div style={{padding: "16px"}}>
            <Typography.Title heading={4} style={{marginBottom: "16px"}}>
                我的报名
            </Typography.Title>

            <>
                <List
                    dataSource={myApplication}
                    renderItem={(item) => (
                        <List.Item
                            style={{borderBottom: "1px solid #f0f0f0", padding: "12px 0"}}
                        >
                            <Typography.Text strong>
                                比赛ID：
                            </Typography.Text>
                            {item.registration.matchId}
                            <Divider type="vertical"/>

                            <Typography.Text strong>
                                比赛名称：
                            </Typography.Text>
                            {item.matchName}
                            <Divider type="vertical"/>

                            <Typography.Text strong>
                                学生姓名：
                            </Typography.Text>
                            {item.studentName}
                            <Divider type="vertical"/>

                            <Typography.Text strong>
                                指导老师：
                            </Typography.Text>
                            {item.teacherName}
                            <Divider type="vertical"/>

                            <Typography.Text strong>
                                状态：
                            </Typography.Text>
                            {getStatusLabel(item.registration.status)}
                        </List.Item>
                    )}
                />

            </>

        </div>
    );
}
