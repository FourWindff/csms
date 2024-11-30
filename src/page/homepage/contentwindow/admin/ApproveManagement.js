import React, {useEffect, useState} from 'react';
import {List, Avatar, ButtonGroup, Button, Toast, Modal} from '@douyinfe/semi-ui';
import API_ENDPOINTS, {
    getFormData, getStatusColor, parseMatchLabel, parseMemberVOLabel, parseReviewType,
    REQUEST,
} from '../data/api';

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

function ReviewItem({registrationVO, onStatusChange, onClickAvatar, getStatusColor, parseReviewType}) {
    const registration = registrationVO.registration;
    const match = registrationVO.match;
    const memberVOList = registrationVO.memberVOList;

    const disabled = registration.status === 'APPROVED';
    const [visible, setVisible] = useState(false);

    return (
        <List.Item
            key={registration.id}
            header={<Avatar color={getStatusColor(registration.status)}
                            onClick={onClickAvatar}
                            shape="square">{registration.status.charAt(0)}</Avatar>}
            main={
                <div style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
                    <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}>
                        {`竞赛ID: ${registration.matchId}`}
                    </span>
                    <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}>
                        {`团队编号：${registration.teamId}`}
                    </span>
                    <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}>
                        {`团队人数：${memberVOList.length}`}
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
                        <h5 style={{fontSize: "18px", fontWeight: "600"}}>成员信息 </h5>
                        {memberVOList.map((memberVO, index) => <div key={index} style={{
                            padding: '16px',
                            border: '1px solid #f0f0f0',
                            marginBottom: '8px'
                        }}>
                            {Object.entries(memberVO).map(([key, value]) => {
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
                                        <span style={{fontWeight: 'bold', color: '#333'}}>
                                            {parseMemberVOLabel(key)}
                                        </span>
                                        <span style={{color: '#555'}}>
                                            {value}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>)}

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
    const [registrationVOList, setRegistrationVOList] = useState([]);
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const handleSuccess = (message, data) => {
        console.log(data)
        setRegistrationVOList(data);
    }
    const handleError = (message) => {
        Toast.error(message);
    }

    useEffect(() => {

        const formData = new FormData();
        formData.set('status', registrationStatus);
        REQUEST.POST_REQUEST(
            API_ENDPOINTS.getRegistrationAll,
            !registrationStatus ? null : formData,
            handleSuccess,
            handleError,
        )


    }, [registrationStatus]);

    const handleStatusChange = (registration, newStatus) => {
        updateRegistrationStatus(registration, newStatus, setRegistrationVOList);

    };
    const handleClockAvatar = () => {

    }

    return (
        <div style={{padding: 20}}>
            <h1>审批管理</h1>
            <Button theme='solid' type='primary' style={{marginRight: 8}} onClick={() => setRegistrationStatus(null)}
                    disabled={registrationStatus === null}>全部</Button>
            <Button theme='solid' type='primary' style={{marginRight: 8}}
                    onClick={() => setRegistrationStatus('PENDING')}
                    disabled={registrationStatus === 'PENDING'}>审核中</Button>
            <Button theme='solid' type='primary' style={{marginRight: 8}}
                    onClick={() => setRegistrationStatus('APPROVED')}
                    disabled={registrationStatus === 'APPROVED'}>通过</Button>
            <Button theme='solid' type='primary' style={{marginRight: 8}}
                    onClick={() => setRegistrationStatus('REJECTED')}
                    disabled={registrationStatus === 'REJECTED'}>驳回</Button>
            <List
                dataSource={registrationVOList}
                renderItem={(registrationVO) => <ReviewItem registrationVO={registrationVO}
                                                            getStatusColor={getStatusColor}
                                                            parseReviewType={parseReviewType}
                                                            onStatusChange={handleStatusChange}
                                                            onClickAvatar={handleClockAvatar}/>}
            />
        </div>
    );
}
