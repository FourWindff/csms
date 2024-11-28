import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    List,
    Avatar,
    ButtonGroup,
    Button,
    Toast, Modal, Form, ArrayField
} from '@douyinfe/semi-ui';
import API_ENDPOINTS, {parseMatchLabel, REQUEST} from "./data/api";
import {UserContext} from "../index";
import {IconMinusCircle, IconPlusCircle} from "@douyinfe/semi-icons";

// 时间格式化函数
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', { // 可以根据需要调整格式
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 设置 24 小时制
    });
};
function ViewModal({match, visible, onViewOk, onViewCancel}) {
    return (
        <Modal
            title="赛事详情"
            visible={visible}
            onOk={onViewOk}
            onCancel={onViewCancel}
            closeOnEsc={true}
            okText={'报名'}
            cancelText={'关闭'}
        >
            {Object.entries(match).map(([key, value]) => {
                // 如果是时间字段，则格式化为直观的时间
                const formattedValue = ['competitionStartTime', 'competitionEndTime', 'registrationStartTime', 'registrationEndTime'].includes(key)
                    ? formatDate(value)
                    : value;

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
                        <span style={{ fontWeight: 'bold', color: '#333' }}>
                            {parseMatchLabel(key)}
                        </span>
                        <span style={{ color: '#555' }}>
                            {formattedValue}
                        </span>
                    </div>
                );
            })}
        </Modal>
    )
};

function SignUpModal({visible, onSignUpOk, onSignUpCancel, match, user}) {
    const formRef = useRef();


    const handleSubmit = (members) => {
        const {students = [], teachers = []} = members;
        const studentMembers = students.map((student) => ({
            ...student,
            role: "student"
        }));
        const teacherMembers = teachers.map((teacher) => ({
            ...teacher,
            role: "teacher"
        }))
        const matchId = match.id;
        const teamId = crypto.randomUUID();
        const memberDTOList = [...studentMembers, ...teacherMembers];
        onSignUpOk(matchId, teamId, memberDTOList);
    }


    return (
        <Modal
            title={"报名信息"}
            visible={visible}
            onOk={() => formRef.current.formApi?.submitForm()}
            onCancel={onSignUpCancel}
            closeOnEsc={true}
            okText={"确定报名"}
            cancelText={"取消报名"}
        >
            <h2>{match.name}</h2>
            <Form
                ref={formRef}
                labelPosition="left"
                labelAlign="right"
                onSubmit={(values) => handleSubmit(values)}
            >
                <ArrayField field="students" initValue={[{userId: user.role === 'student' ? user.userId : ''}]}>
                    {({add, arrayFields}) => (
                        <>
                            <Button onClick={add} icon={<IconPlusCircle/>} theme="light">添加成员</Button>
                            {arrayFields.map(({field, key, remove}, i) => (
                                <div key={key} style={{display: 'flex', alignItems: 'center', marginBottom: 8}}>
                                    <Form.Input
                                        field={`${field}[userId]`}
                                        label={arrayFields.length === 1 ?
                                            "个人" :
                                            `成员${i + 1}`}
                                        style={{width: 200, marginRight: 16}}
                                        required
                                        placeholder="请输入学号"
                                        disabled={i === 0}
                                    />
                                    <Button
                                        type="danger"
                                        theme="borderless"
                                        icon={<IconMinusCircle/>}
                                        onClick={i === 0 ? undefined : remove} // 第一个学生不能删除
                                        disabled={i === 0} // 禁用第一个学生的删除按钮
                                        style={{marginTop: 7}}

                                    />
                                </div>
                            ))}
                        </>
                    )}
                </ArrayField>
                <ArrayField field="teachers" initValue={[{userId: user.role === 'teacher' ? user.userId : ''}]}>
                    {({add, arrayFields}) => (
                        <>
                            <Button onClick={add} icon={<IconPlusCircle/>} theme="light">添加指导老师</Button>
                            {arrayFields.map(({field, key, remove}, i) => (
                                <div key={key} style={{display: 'flex', alignItems: 'center', marginBottom: 8}}>
                                    <Form.Input
                                        field={`${field}[userId]`}
                                        label={`指导老师 ${i + 1}`}
                                        style={{width: 200, marginRight: 16}}
                                        required
                                        placeholder="请输入指导老师Id"
                                    />
                                    <Button
                                        type="danger"
                                        theme="borderless"
                                        icon={<IconMinusCircle/>}
                                        onClick={remove}
                                        style={{marginTop: 7}}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </ArrayField>
                <Button htmlType="submit" style={{width:"100%"}}>提交报名</Button>
            </Form>
        </Modal>
    );
}


function CompetitionItem({match}) {
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [signUpModalVisible, setSignUpModalVisible] = useState(false);
    const user = useContext(UserContext);

    const handleSignUpOk = (matchId, teamId, memberDTOList) => {
        const registration = {
            matchId: matchId,
            teamId: teamId,
            memberDTOList: memberDTOList
        };

        console.log(registration);

        REQUEST.POST_REQUEST_WITH_JSON(
            API_ENDPOINTS.saveRegistration,
            JSON.stringify(registration),
            (message, data) => {
                Toast.success(message);
                setSignUpModalVisible(false);
                setViewModalVisible(false);
            },
            (message) => {
                Toast.error(message);
            }
        )

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
                    <ViewModal match={match}
                               visible={viewModalVisible}
                               onViewOk={() => setSignUpModalVisible(true)}
                               onViewCancel={() => setViewModalVisible(false)}
                    />
                    <SignUpModal
                        match={match}
                        visible={signUpModalVisible}
                        onSignUpCancel={() => setSignUpModalVisible(false)}
                        onSignUpOk={handleSignUpOk}
                        user={user}
                    />
                </div>
            }
            extra={
                <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <ButtonGroup theme="borderless">
                        <Button onClick={() => setViewModalVisible(true)}>查看</Button>
                        <Button onClick={() => setSignUpModalVisible(true)}>报名</Button>
                    </ButtonGroup>
                </div>
            }
        />
    )
}


function CompetitionList({matches}) {
    return (
        <div>
            <h1>竞赛管理</h1>
            <List
                dataSource={matches}
                renderItem={match => <CompetitionItem match={match}/>}
            />
        </div>
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
