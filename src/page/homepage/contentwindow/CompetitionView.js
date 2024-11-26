import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    List,
    Avatar,
    ButtonGroup,
    Button,
    Toast, Modal, Form
} from '@douyinfe/semi-ui';
import API_ENDPOINTS, {getFormData, REQUEST} from "./data/api";
import {UserContext} from "../index";

function CompetitionItem({match}) {
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [signUpModalVisible, setSignUpModalVisible] = useState(false);
    const formRef = useRef(null);
    const user = useContext(UserContext);

    const handleViewOk = () => {
        setSignUpModalVisible(true);
    }
    const handleSignUpOk = (values, matchId) => {
        const registration = {
            ...values,
            matchId: matchId,
            status: "PENDING",
        };
        const formData=getFormData(registration);
        REQUEST.POST_REQUEST(
            API_ENDPOINTS.saveRegistration,
            formData,
            (message,data)=>{
                Toast.success(message);
                setSignUpModalVisible(false);
                setViewModalVisible(false);
            },
            (message)=>{
                Toast.error(message);
            }
        )

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
                                initValue={user.role==='student'?user.userId:null}
                                required/>
                            <Form.Input
                                label="指导老师Id"
                                field="teacherId"
                                placeholder="请输入指导老师Id"
                                initValue={user.role==='teacher'?user.userId:null}
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
        REQUEST.GET_REQUEST(
            API_ENDPOINTS.getCompetitionAll,
            null,
            (message, data) => {
                setMatches(data);
            },
            (message) => {
                Toast.error(message);
            }
        )
    }, []);
    return (
        <div style={{padding: 20}}>
            <CompetitionList matches={matches}/>
        </div>
    );
}
