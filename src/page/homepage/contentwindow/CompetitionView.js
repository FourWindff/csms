import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    List,
    Avatar,
    ButtonGroup,
    Button,
    Notification,
    Toast, Modal, Form
} from '@douyinfe/semi-ui';
import {REQUEST} from "./data/api";
import {UserIdContext} from "../index";

function CompetitionItem({match, onSignUp}) {
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [signUpModalVisible, setSignUpModalVisible] = useState(false);
    const formRef = useRef(null);
    const userId = useContext(UserIdContext);

    const handleViewOk = () => {
        setSignUpModalVisible(true);
    }
    const handleSignUpOk = (values, matchId) => {
        const registration={
            ...values,
            matchId:matchId,
            status:"PENDING",
        };
        REQUEST.saveRegistration(registration)
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
                const msg = result?.msg;
                if (code === 1) {
                    Toast.success("报名成功");
                } else {
                    Toast.error("报名失败");
                }
            })
            .catch(error => {
                Notification.error({
                    title: '网络错误',
                    content: `提交失败：${error.message}`,
                });
            })
        setSignUpModalVisible(false);
        setViewModalVisible(false);
    }
    const handleViewCancel = () => {
        setViewModalVisible(false);
    }
    const handleSignUpCancel = () => {
        setSignUpModalVisible(false);
    }


    const handleView = () => {
        setViewModalVisible(true);
    }
    const handleSignUp = () => {
        setSignUpModalVisible(true);

    }

    return (
        <List.Item
            key={match.id}
            header={<Avatar color="blue" shape="square">{match.type}</Avatar>}
            main={
                <div>
                    <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}>
                        {match.name}
                    </span>
                    <p style={{color: 'var(--semi-color-text-2)', margin: '4px 0', width: 500}}>
                        {match.description}
                    </p>
                    <p style={{color: 'var(--semi-color-text-2)', margin: '4px 0', width: 500}}>
                        地点: {match.place}
                    </p>
                    <Modal
                        title="赛事详情"
                        visible={viewModalVisible}
                        onOk={handleViewOk}
                        onCancel={handleViewCancel}
                        closeOnEsc={true}
                        okText={'报名'}
                        cancelText={'关闭'}
                    >
                        {Object.entries(match).map(([key, value]) => {
                            return (
                                <div
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '8px 0',
                                        borderBottom: '1px solid #f0f0f0',
                                    }}
                                >
                                    <span style={{fontWeight: 'bold', color: '#333'}}>{key}</span>
                                    <span style={{color: '#555'}}>{value}</span>
                                </div>
                            );
                        })}
                    </Modal>
                    <Modal
                        title={"报名信息"}
                        visible={signUpModalVisible}
                        onOk={() => formRef.current.formApi?.submitForm()}
                        onCancel={handleSignUpCancel}
                        closeOnEsc={true}
                        okText={"确定报名"}
                        cancelText={"取消报名"}
                    >
                        <h2>{match.name}</h2>
                        <Form
                            ref={formRef}
                            labelPosition="left"
                            labelAlign="right"
                            onSubmit={(values) => handleSignUpOk(values, match.id)}>
                            <Form.Input
                                label="学生Id"
                                field="studentId"
                                placeholder="请输入学号"
                                initValue={userId}
                                required/>
                            <Form.Input
                                label="指导老师Id"
                                field="teacherId"
                                placeholder="请输入指导老师Id"
                                required/>
                        </Form>
                    </Modal>
                </div>
            }
            extra={
                <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <ButtonGroup theme="borderless">
                        <Button onClick={handleView}>查看</Button>
                        <Button onClick={handleSignUp}>报名</Button>
                    </ButtonGroup>
                </div>
            }
        />
    )
}


function CompetitionList({matches, onSignUp}) {
    return (
        <div>
            <h1>竞赛管理</h1><List
            dataSource={matches}
            renderItem={match => <CompetitionItem match={match} onSignUp={onSignUp}/>}
        /></div>
    )
}

export default function CompetitionView() {
    const [matches, setMatches] = useState(); // 初始使用模拟数据

    useEffect(() => {
        REQUEST.getMatches()
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
                    setMatches(result.data);
                }
            })
            .catch(error => {
                console.log("Error fetching matches", error);
                Notification.error({
                    title: '加载失败',
                    content: `无法获取竞赛数据：${error.message}`,
                })
            })
    }, []);
    return (
        <div style={{padding: 20}}>
            <CompetitionList matches={matches}/>
        </div>
    );
}
