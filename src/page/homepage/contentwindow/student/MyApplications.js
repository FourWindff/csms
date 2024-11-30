import React, {useState, useEffect, useContext} from "react";
import {List, Typography, Divider, Toast} from "@douyinfe/semi-ui";

import API_ENDPOINTS, { REQUEST} from "../data/api";
import {UserContext} from "../../index"; // 假设有这样的 API 配置
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
const RegistrationVOItem = ({item}) => {
    const registration = item.registration;
    const match = item.match;
    const memberVOList = item.memberVOList;
    return (
        <List.Item
            style={{borderBottom: "1px solid #f0f0f0", padding: "12px 0"}}
        >
            <Typography.Text strong>
                比赛ID：
            </Typography.Text>
            {match.id}
            <Divider type="vertical"/>

            <Typography.Text strong>
                比赛名称：
            </Typography.Text>
            {match.name}
            <Divider type="vertical"/>

            <Typography.Text strong>
                成员人数：
            </Typography.Text>
            {memberVOList.filter(member => member.role === 'student').length}
            <Divider type="vertical"/>

            <Typography.Text strong>
                成员：
            </Typography.Text>
            {memberVOList.map((memberVO, index) => memberVO.role === "student" && (
                <span key={index} style={{marginRight: '8px'}}>
                    {memberVO.username}
                    {index < memberVOList.length - 1 && ' '}
                </span>
            ))}
            <Divider type="vertical"/>

            <Typography.Text strong>
                指导老师：
            </Typography.Text>
            {memberVOList.map((memberVO, index) => memberVO.role === "teacher" && (
                <span key={index} style={{marginRight: '8px'}}>
                    {memberVO.username}
                    {index < memberVOList.length - 1 && ' '}
                </span>
            ))}
            <Divider type="vertical"/>

            <Typography.Text strong>
                状态：
            </Typography.Text>
            {getStatusLabel(registration.status)}
        </List.Item>
    )
}
export default function MyApplication() {
    const [registrationVOList, setRegistrationVOList] = useState([]); // 存储数据
    const user = useContext(UserContext); // 获取用户 ID

    // 获取数据的副作用
    useEffect(() => {
        REQUEST.GET_REQUEST(
            API_ENDPOINTS.getRegistration,
            user.userId,
            (message, data) => {
                setRegistrationVOList(data);
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
                    dataSource={registrationVOList}
                    renderItem={(registrationVO) => <RegistrationVOItem item={registrationVO}/>}
                />

            </>

        </div>
    );
}
