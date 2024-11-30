import React, {useEffect, useState} from 'react';
import {List, ButtonGroup, Button, Toast, Typography} from '@douyinfe/semi-ui';
import API_ENDPOINTS, {
    convertTimeFormat,
    getFormData, getOriginalFileName, parseReviewType,
    REQUEST,
} from '../data/api';


const updateWorkStatus = (newWork, setWorkDataList) => {
    const handleSuccess = (message, data) => {
        Toast.success(message);
        setWorkDataList((prevWorkDataList) =>
            prevWorkDataList.map((work) =>
                work.teamId === newWork.teamId
                    ? {
                        ...work,
                        status: newWork.status
                    }
                    : work
            )
        );
    }
    const handleError = (message) => {
        Toast.error(message);
    }
    REQUEST.POST_REQUEST(
        API_ENDPOINTS.updateWork,
        getFormData(newWork),
        handleSuccess,
        handleError,
    )
};
function ReviewItem({item, onStatusChange}) {
    const { Text } = Typography;

    return (
        <List.Item
            key={item.teamId}
            main={
                <div style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
                    <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}>
                        {`队伍ID: ${item.teamId}`}
                    </span>
                    <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}>
                        {`提交者ID：${item.userId}`}
                    </span>
                    <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}>
                        {'文件: '}
                        {item.fileName ?
                            <Text link={{ href: API_ENDPOINTS.getFile+'/'+item.fileName }}>{getOriginalFileName(item.fileName)}</Text>
                        :null}
                    </span>
                    <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}>
                        {`上传时间: ${convertTimeFormat(item.uploadDateTime)}`}
                    </span>
                    <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}>
                        {`最后修改时间: ${convertTimeFormat(item.lastModifiedDateTime)}`}
                    </span>
                    <p style={{color: 'var(--semi-color-text-2)', margin: '4px 0', width: 500}}>
                        当前状态: {parseReviewType(item.status)}
                    </p>
                </div>
            }
            extra={
                <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <ButtonGroup theme="borderless">
                        <Button
                            type="primary"
                            onClick={() => onStatusChange({
                                teamId:item.teamId,
                                userId:'root',
                                status:'APPROVED'
                            })}
                            disabled={item.status === 'APPROVED'}
                        >
                            通过
                        </Button>
                        <Button
                            type="danger"
                            onClick={() => onStatusChange({
                                teamId:item.teamId,
                                userId:'root',
                                status:'REJECTED'
                            })}
                        >
                            驳回
                        </Button>

                    </ButtonGroup>
                </div>
            }
        />
    )
}


export default function WorkManagement() {
    const [workDataList, setWorkDataList] = useState([]);
    const [workDataStatus, setWorkDataStatus] = useState(null);
    const workList = workDataList.filter(work => !workDataStatus || work.status === workDataStatus);

    useEffect(() => {
        REQUEST.GET_REQUEST(
            API_ENDPOINTS.getWorkAll,
            null,
            (message, data) => {
                setWorkDataList(data);
            },
            (message) => {
                Toast.error(message);
            }
        )
    }, []);

    const handleStatusChange = (workData) => {
        updateWorkStatus(workData, setWorkDataList);
    };
    return (
        <div style={{padding: 20}}>
            <h1>参赛作品管理</h1>
            <Button theme='solid' type='primary' style={{marginRight: 8}}
                    onClick={() => setWorkDataStatus(null)}
                    disabled={workDataStatus === null}>全部</Button>
            <Button theme='solid' type='primary' style={{marginRight: 8}}
                    onClick={() => setWorkDataStatus('PENDING')}
                    disabled={workDataStatus === 'PENDING'}>审核中</Button>
            <Button theme='solid' type='primary' style={{marginRight: 8}}
                    onClick={() => setWorkDataStatus('APPROVED')}
                    disabled={workDataStatus === 'APPROVED'}>通过</Button>
            <Button theme='solid' type='primary' style={{marginRight: 8}}
                    onClick={() => setWorkDataStatus('REJECTED')}
                    disabled={workDataStatus === 'REJECTED'}>驳回</Button>
            <List
                dataSource={workList}
                renderItem={(work) => <ReviewItem item={work}
                                                  parseReviewType={parseReviewType}
                                                  onStatusChange={handleStatusChange}/>}
            />
        </div>
    );
}
