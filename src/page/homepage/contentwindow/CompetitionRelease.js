import React from 'react';
import {Form, Notification, Button, Toast} from '@douyinfe/semi-ui';
import API_ENDPOINTS, {matchType, REQUEST} from "./data/api";

export default function CompetitionRelease() {
    // 表单提交时的回调
    const handleFormSubmit = async (values) => {
        console.log('上传竞赛信息:', JSON.stringify(values));
        REQUEST.saveMatches(values)
            .then(response=>{
                if(!response.ok){
                    Notification.error({
                        title: '提交失败',
                        content: `错误信息：${response.json() || '未知错误'}`,
                    });
                }else{
                    return response.json();
                }
            })
            .then(result => {
                if(!result) return ;
                const code = result?.code;
                const message = result?.msg;
                if (code === 1) {
                    Toast.success('提交成功！');
                } else {
                    Notification.error({
                        title: '提交失败',
                        content: `错误原因：${message}`,
                    });
                }
            })
            .catch(error => {
                Toast.error(`错误！${error}`);
            })

    };


    // 表单结构
    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>发布竞赛信息</h1>
            <Form
                onSubmit={handleFormSubmit}
                labelPosition="left"
                labelAlign="right"
                style={{ width: '100%' }}>
                <Form.Input
                    field="name"
                    label="竞赛名称"
                    placeholder="请输入竞赛名称"
                    rules={[{ required: true, message: '竞赛名称是必填项' }]}/>
                <Form.Select
                    field="type"
                    label="竞赛类型"
                    placeholder="请选择竞赛类型"
                    rules={[{ required: true, message: '竞赛类型是必填项' }]}>
                    {matchType.map((type) => (
                        <Form.Select.Option key={type.value} value={type.value}>
                            {type.label}
                        </Form.Select.Option>
                    ))}
                </Form.Select>
                <Form.DatePicker
                    field="competitionStartTime"
                    label="竞赛开始时间"
                    placeholder="请选择竞赛开始时间"
                    type="dateTime"
                    rules={[{ required: true, message: '竞赛开始时间是必填项' }]}/>
                <Form.DatePicker
                    field="competitionEndTime"
                    label="竞赛结束时间"
                    type="dateTime"
                    placeholder="请选择竞赛结束时间"
                    rules={[{ required: true, message: '竞赛结束时间是必填项' }]}/>
                <Form.DatePicker
                    field="registrationStartTime"
                    label="报名开始时间"
                    type="dateTime"
                    placeholder="请选择报名开始时间"
                    rules={[{ required: true, message: '报名开始时间是必填项' }]}/>
                <Form.DatePicker
                    field="registrationEndTime"
                    label="报名结束时间"
                    type="dateTime"
                    placeholder="请选择报名结束时间"
                    rules={[{ required: true, message: '报名结束时间是必填项' }]}/>
                <Form.Input
                    field="place"
                    label="竞赛地点"
                    placeholder="请输入竞赛地点"
                    rules={[{ required: true, message: '竞赛地点是必填项' }]}/>
                <Form.TextArea
                    field="description"
                    label="竞赛描述"
                    placeholder="请输入竞赛描述"
                    rows={4}/>
                <Form.Slot>
                    <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>提交</Button>
                    <Button htmlType="reset" type="tertiary">重置</Button>
                </Form.Slot>
            </Form>
        </div>
    );
}
