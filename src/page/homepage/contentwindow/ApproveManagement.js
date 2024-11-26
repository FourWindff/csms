import React, {useEffect, useState} from 'react';
import {List, Avatar, ButtonGroup, Button, Toast, Modal} from '@douyinfe/semi-ui';
import API_ENDPOINTS, {getFormData, registrationDTOType, REQUEST, reviewType} from './data/api';

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
const parseRegistrationDTOType = (key) => {
    const item = registrationDTOType.find(item => item.value === key);
    return item.label;
}
const updateRegistrationStatus = (registration, status, setRegistrationDTOList) => {
    const handleSuccess = (message, data) => {
        Toast.success(message);
        setRegistrationDTOList((prevRegistrationDTOList) =>
            prevRegistrationDTOList.map((dto) =>
                dto.registration.id === registration.id
                    ? {
                        ...dto,
                        registration: {
                            ...dto.registration,
                            status: status,
                        }
                    }
                    : dto
            )
        );
    }
    const handleError = (message) => {
        Toast.error(message);
    }

    const formData = getFormData(registration);
    formData.set('status', status);
    REQUEST.PUT_REQUEST(
        API_ENDPOINTS.updateRegistration,
        formData,
        handleSuccess,
        handleError,
    )


};

function ReviewItem({registrationDTO, onStatusChange, onClickAvatar, getStatusColor, parseReviewType}) {
    const registration = registrationDTO.registration;
    const otherInfo = Object.fromEntries(
        Object.entries(registrationDTO).filter(([key]) => key !== "registration")
    );
    console.log(otherInfo);

    const disabled = registration.status === 'APPROVED';
    const [visible, setVisible] = useState(false);

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
                    <Modal
                        title="报名详情"
                        visible={visible}
                        onOk={() => setVisible(false)}
                        onCancel={() => setVisible(false)}
                        closeOnEsc={true}
                        okText={'确定'}
                        cancelText={'关闭'}
                    >
                        {Object.entries(otherInfo).map(([key, value]) => {
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
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }}>{parseRegistrationDTOType(key)}</span>
                                    <span style={{color: '#555'}}>{value}</span>
                                </div>
                            );
                        })}
                    </Modal>
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
                        <Button
                            type="primary"
                            onClick={() => setVisible(true)}
                        >
                            详情
                        </Button>
                    </ButtonGroup>
                </div>
            }
        />
    )
}


export default function ApproveManagement() {
    const [registrationDTOList, setRegistrationDTOList] = useState([]);
    const [registrationStatus,setRegistrationStatus]=useState(null);
    const handleSuccess = (message, data) => {
        console.log(data)
        setRegistrationDTOList(data);
    }
    const handleError = (message) => {
        Toast.error(message);
    }

    useEffect(() => {

        const formData = new FormData();
        formData.set('status',registrationStatus);
        REQUEST.POST_REQUEST(
            API_ENDPOINTS.getRegistrationAll,
            !registrationStatus ? null:formData,
            handleSuccess,
            handleError,
        )


    }, [registrationStatus]);

    const handleStatusChange = (registration, newStatus) => {
        updateRegistrationStatus(registration, newStatus, setRegistrationDTOList);

    };
    const handleClockAvatar = () => {

    }

    return (
        <div style={{padding: 20}}>
            <h1>审批管理</h1>
            <Button theme='solid' type='primary' style={{ marginRight: 8 }} onClick={()=>setRegistrationStatus(null)} disabled={registrationStatus===null}>全部</Button>
            <Button theme='solid' type='primary' style={{ marginRight: 8 }} onClick={()=>setRegistrationStatus('PENDING')} disabled={registrationStatus==='PENDING'}>审核中</Button>
            <Button theme='solid' type='primary' style={{ marginRight: 8 }} onClick={()=>setRegistrationStatus('APPROVED')} disabled={registrationStatus==='APPROVED'}>通过</Button>
            <Button theme='solid' type='primary' style={{ marginRight: 8 }} onClick={()=>setRegistrationStatus('REJECTED')} disabled={registrationStatus==='REJECTED'}>驳回</Button>
            <List
                dataSource={registrationDTOList}
                renderItem={(registrationDTO) => <ReviewItem registrationDTO={registrationDTO}
                                                             getStatusColor={getStatusColor}
                                                             parseReviewType={parseReviewType}
                                                             onStatusChange={handleStatusChange}
                                                             onClickAvatar={handleClockAvatar}/>}
            />
        </div>
    );
}
