import React, {useEffect, useState} from 'react';
import {
    List,
    Avatar,
    ButtonGroup,
    Button,
    Form,
    Toast,
} from '@douyinfe/semi-ui';
import API_ENDPOINTS, {getFormData, matchType, REQUEST} from '../data/api';


function CompetitionEdit({prevMatch, onSubmit, onCancel}) {
    const [disabled, setDisabled] = useState(false);

    return (
        <div style={{padding: '20px', border: '1px solid #ddd'}}>
            <h2>编辑竞赛</h2>
            <Form
                initValues={prevMatch}
                onSubmit={(values) => onSubmit(values, setDisabled)}
            >
                <Form.Input
                    field="name"
                    label="竞赛名称"
                    required
                />
                <Form.Select
                    field="type"
                    label="竞赛类型"
                    required
                >
                    {matchType.map((type) => (
                        <Form.Select.Option key={type.value} value={type.value}>
                            {type.label}
                        </Form.Select.Option>
                    ))}
                </Form.Select>
                {/* 报名开始时间 */}
                <Form.DatePicker
                    field="registrationStartTime"
                    label="报名开始时间"
                    type="dateTime"
                    required
                />
                {/* 报名结束时间 */}
                <Form.DatePicker
                    field="registrationEndTime"
                    label="报名结束时间"
                    type="dateTime"
                    required
                />
                <Form.DatePicker
                    field="competitionStartTime"
                    label="竞赛开始时间"
                    type="dateTime"
                    required
                />
                <Form.DatePicker
                    field="competitionEndTime"
                    label="竞赛结束时间"
                    type="dateTime"
                    required
                />
                <Form.Input
                    field="place"
                    label="竞赛地点"
                    required
                />
                <Form.TextArea
                    field="description"
                    label="竞赛描述"
                    rows={4}
                />
                <Button type="primary" htmlType="submit" style={{marginRight: 16}} disabled={disabled}>保存</Button>
                <Button onClick={onCancel} type="tertiary" disabled={disabled}>取消</Button>
            </Form>
        </div>
    )
}

function CompetitionItem({match, onEdit, onDelete}) {
    const [disabled, setDisabled] = useState(false);
    return (
        <List.Item
            key={match.matchId}
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
                </div>
            }
            extra={
                <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <ButtonGroup theme="borderless">
                        <Button onClick={() => onEdit(match)}>编辑</Button>
                        <Button onClick={() => onDelete(match, setDisabled)} type="danger"
                                disabled={disabled}>删除</Button>
                    </ButtonGroup>
                </div>
            }
        />
    )
}

function CompetitionList({matches, onEdit, onDelete}) {
    return (
        <div>
            <h1>竞赛管理</h1><List
            dataSource={matches}
            renderItem={(match) => <CompetitionItem onEdit={onEdit} onDelete={onDelete} match={match}/>}
        /></div>
    )
}

// 添加获取数据函数
export default function CompetitionManagement() {
    const [matches, setMatches] = useState([]); // 初始使用模拟数据
    const [isEditing, setIsEditing] = useState(false); // 控制是否显示编辑表单
    const [currentMatch, setCurrentMatch] = useState(null); // 当前正在编辑的竞赛数据


    useEffect(() => {
        const handleSuccess = (message, data) => {
            Toast.success(message);
            setMatches(data);
        }
        REQUEST.GET_REQUEST(
            API_ENDPOINTS.getCompetitionAll,
            null,
            handleSuccess,
            (message)=>Toast.error(message)
        )
    }, []);

    const handleEdit = (match) => {
        setIsEditing(true); // 显示编辑表单
        setCurrentMatch(match); // 设置当前编辑的竞赛数据
    };
    const handleCancelEdit = () => {
        setIsEditing(false); // 隐藏编辑表单
        setCurrentMatch(null); // 清空当前编辑的数据
    };
    const handleDelete = async (match, setDisabled) => {
        // 弹出确认删除对话框
        const confirmDelete = window.confirm(`确定删除竞赛 ${match.name} 吗？`);
        const handleSuccess=(message,data)=>{
            Toast.success(message);
            setMatches(matches.filter((m) => m.id !== match.id));
            setDisabled(false);
        }
        const handleError=(message)=>{
            Toast.error(message);
            setDisabled(false);
        }
        if (confirmDelete) {
            setDisabled(true);
            REQUEST.DELETE_REQUEST(
                API_ENDPOINTS.deleteCompetition,
                match.id,
                handleSuccess,
                handleError
            )
        }
    };
    const handleChangeEdit = async (values, setDisabled) => {
        setDisabled(true);
        const formData=getFormData(values);
        const handleSuccess=(message,data)=>{
            Toast.success(message);
            // 更新列表中的数据
            setMatches(matches.map((match) =>
                match.id === currentMatch.id ? {...match, ...values} : match
            ));
            setIsEditing(false); // 隐藏编辑表单
            setCurrentMatch(null); // 清空当前编辑的数据
            setDisabled(false);
        }
        const handleError=(message)=>{
            Toast.error(message);
            setDisabled(false);
        }
        REQUEST.PUT_REQUEST(
            API_ENDPOINTS.updateCompetition,
            formData,
            handleSuccess,
            handleError,
        )
    }


    return (
        <div style={{padding: 20}}>
            {!isEditing ? (
                <CompetitionList matches={matches} onEdit={handleEdit} onDelete={handleDelete}/>
            ) : <CompetitionEdit prevMatch={currentMatch} onSubmit={handleChangeEdit} onCancel={handleCancelEdit}/>}
        </div>
    );
}
