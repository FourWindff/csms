import React, { useState, useEffect, useContext } from "react";
import {List, Typography, Divider, Spin, Toast} from "@douyinfe/semi-ui";


import {UserIdContext} from "../index";
import API_ENDPOINTS, {REQUEST} from "./data/api"; // 假设有这样的 API 配置

export default function MyApplication() {
    const [myApplication, setMyApplication] = useState([]); // 存储数据
    const [loading, setLoading] = useState(true); // 控制加载状态
    const userId = useContext(UserIdContext); // 获取用户 ID

    // 获取数据的副作用
    useEffect(() => {
        // 调用 API 获取注册信息
        REQUEST.getRegistration(userId)
            .then((response) => {
                if(!response.ok){
                    Toast.error("请求错误");
                }else{
                    return response.json();
                }
            })
            .then(result=>{
                const code=result.code;
                if(code===1){
                    setMyApplication(result.data);
                }
            })
            .catch((error) => {
                console.error("获取注册信息失败：", error);
            })
            .finally(() => {
                setLoading(false); // 加载完成
            });
    }, []);

    // 渲染组件
    return (
        <div style={{ padding: "16px" }}>
            <Typography.Title heading={4} style={{ marginBottom: "16px" }}>
                我的报名
            </Typography.Title>

            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    {myApplication.length > 0 ? (
                        <List
                            dataSource={myApplication}
                            renderItem={(item) => (
                                <List.Item
                                    style={{ borderBottom: "1px solid #f0f0f0", padding: "12px 0" }}
                                >
                                    <Typography.Text strong>
                                        比赛ID：
                                    </Typography.Text>
                                    {item.matchId}
                                    <Divider type="vertical" />
                                    <Typography.Text strong>
                                        状态：
                                    </Typography.Text>
                                    {item.status}
                                    <Divider type="vertical" />
                                    <Typography.Text strong>
                                        指导老师：
                                    </Typography.Text>
                                    {item.teacherId}
                                </List.Item>
                            )}
                        />
                    ) : (
                        <Typography.Text type="warning">
                            暂无报名信息。
                        </Typography.Text>
                    )}
                </>
            )}
        </div>
    );
}
