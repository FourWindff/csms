import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../../index";
import API_ENDPOINTS, {convertTimeFormat, getOriginalFileName, parseReviewType, REQUEST} from "../data/api";
import {Button, ButtonGroup, List, Toast, Typography, Upload} from "@douyinfe/semi-ui";

export default function MyWork() {
    const [workDataList, setWorkDataList] = useState([]);
    const user = useContext(UserContext);
    const {Text} = Typography;
    const [isUploadSuccess, setIsUploadSuccess] = useState(false);


    useEffect(() => {
        REQUEST.GET_REQUEST(
            API_ENDPOINTS.getWorkByUserId,
            user.userId,
            (message, data) => {
                console.log(data)
                setWorkDataList(data);
            },
            (message) => {
                Toast.error(message);
            }
        )
    }, []);
    return (
        <div style={{padding: 12, border: '1px solid var(--semi-color-border)', margin: 12}}>
            <List
                dataSource={workDataList}
                renderItem={work => (
                    <List.Item
                        main={
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                <span style={{
                                    color: 'var(--semi-color-text-0)',
                                    fontWeight: 500,

                                }}>
                                    {`队伍ID: ${work.teamId}`}
                                </span>
                                <span style={{
                                    color: 'var(--semi-color-text-0)',
                                    fontWeight: 500
                                }}>
                                    {`提交者: `}
                                    {work.userId ? work.userId : null}
                                </span>
                                <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}>
                                    {'文件: '}
                                    {work.fileName ?
                                        <Text
                                            link={{href: API_ENDPOINTS.getFile + '/' + work.fileName}}>{getOriginalFileName(work.fileName)}</Text>
                                        : null}
                                </span>
                                <span style={{
                                    color: 'var(--semi-color-text-0)',
                                    fontWeight: 500
                                }}>
                                    {`上传时间: ${convertTimeFormat(work.uploadDateTime)}`}
                                </span>
                                <span style={{
                                    color: 'var(--semi-color-text-0)',
                                    fontWeight: 500
                                }}>
                                    {`最后修改时间: ${convertTimeFormat(work.lastModifiedDateTime)}`}
                                </span>
                                <span style={{
                                    color: 'mediumblue',
                                    fontWeight: 600
                                }}>
                                    {`状态: ${parseReviewType(work.status)}`}
                                </span>
                            </div>
                        }
                        extra={
                            <ButtonGroup theme="borderless">
                                <Upload
                                    action={API_ENDPOINTS.updateWork} // 上传接口
                                    data={{
                                        teamId: work.teamId,
                                        userId: user.userId,
                                        status: 'PENDING',
                                    }}
                                    limit={1}
                                    name={'file'}
                                    onSuccess={() => {
                                        setIsUploadSuccess(true);
                                    }}
                                >
                                    {work.status === 'NOT_SUBMIT' ?
                                        <Button>提交</Button> :
                                        <Button disabled={work.status === 'APPROVED' || work.status === 'PENDING'}>
                                            重新提交
                                        </Button>
                                    }
                                </Upload>
                            </ButtonGroup>
                        }
                    />
                )}
            />
        </div>
    );
};
