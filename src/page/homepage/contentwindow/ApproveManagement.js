import React, {useEffect, useState} from 'react';
import {List, Avatar, ButtonGroup, Button, Notification, Toast} from '@douyinfe/semi-ui';
import {registrationMock, REQUEST, reviewType} from './data/api'; // 假设这是你之前的模拟数据

const getStatusColor = (status) => {
    switch (status) {
        case 'PENDING':
            return 'green'; // PENDING 状态使用绿色
        case 'APPROVED':
            return 'blue'; // APPROVED 状态使用蓝色
        case 'REJECTED':
            return 'red'; // REJECTED 状态使用红色
        default:
            return 'gray'; // 默认颜色
    }
};
const parseReviewType = (status) => {
    const type = reviewType.find(item => item.value === status);
    return type.label;
}
const updateRegistrationStatus = (registration, status, setRegistrations) => {
    // 这里模拟发送请求到后端
    REQUEST.updateRegistration({...registration, status: status})
        .then(response => {
            if (response.ok) {
                Notification.success({
                    title: '状态更新成功',
                    content: `报名状态已更新为 ${status}`,
                });
                setRegistrations((prevRegistrations) =>
                    prevRegistrations.map((reg) =>
                        reg.id === registration.id
                            ? {...reg, status: status}
                            : reg
                    )
                );
            } else {
                Notification.error({
                    title: '状态更新失败',
                    content: '更新报名状态时出错，请稍后再试。',
                });
            }
        })
        .catch(error => {
            Notification.error({
                title: '网络错误',
                content: `更新状态失败：${error.message}`,
            });
        })

};

function ReviewItem({registration, onStatusChange, onClickAvatar, getStatusColor, parseReviewType}) {
    const disabled = registration.status === 'APPROVED';

    return (
        <List.Item
            key={registration.id}
            header={<Avatar color={getStatusColor(registration.status)}
                            onClick={onClickAvatar}
                            shape="square">{registration.status.charAt(0)}</Avatar>}
            main={
                <div>
                    <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}>
                        {`学生ID: ${registration.studentId} | 指导老师ID: ${registration.teacherId} | 竞赛ID: ${registration.matchId}`}
                    </span>
                    <p style={{color: 'var(--semi-color-text-2)', margin: '4px 0', width: 500}}>
                        当前状态: {parseReviewType(registration.status)}
                    </p>
                </div>
            }
            extra={
                <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <ButtonGroup theme="borderless">
                        <Button
                            type="primary"
                            onClick={() => onStatusChange(registration, 'APPROVED')}
                            disabled={disabled}
                        >
                            通过
                        </Button>
                        <Button
                            type="danger"
                            onClick={() => onStatusChange(registration, 'REJECTED')} // 点击驳回按钮
                        >
                            驳回
                        </Button>
                    </ButtonGroup>
                </div>
            }
        />
    )
}




export default function ApproveManagement() {
    const [registrations, setRegistrations] = useState([]);
    const [isView, setIsView] = useState(false);


    // 获取数据的副作用
    useEffect(() => {
        // 调用 API 获取注册信息
        REQUEST.getRegistrationAll('PENDING')
            .then((response) => {
                if(!response.ok){
                    Toast.error("请求错误");
                }else{
                    return response.json();
                }
            })
            .then(result=>{
                if(!result) return ;
                const code=result.code;
                if(code===1){
                    console.log(result.data)
                    setRegistrations(result.data);
                }
            })
            .catch((error) => {
                console.error("获取注册信息失败：", error);
            })

    }, []);

    const handleStatusChange = (registration, newStatus) => {
        updateRegistrationStatus(registration, newStatus, setRegistrations);
    };
    const handleClockAvatar = () => {
        setIsView(true)
    }

    return (
        <div style={{padding: 20}}>
            <h1>审批管理</h1>
            <List
                dataSource={registrations}
                renderItem={(registration) => <ReviewItem registration={registration.registration}
                                                          getStatusColor={getStatusColor}
                                                          parseReviewType={parseReviewType}
                                                          onStatusChange={handleStatusChange}
                                                          onClickAvatar={handleClockAvatar}/>}
            />
        </div>
    );
}
