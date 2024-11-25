import React, {createContext, useContext, useState} from 'react';
import {Nav, Avatar, Dropdown, Layout} from '@douyinfe/semi-ui';
import {IconGithubLogo} from '@douyinfe/semi-icons';
import {
    IconBreadcrumb, IconTreeSelect, IconBadge, IconSteps,
} from '@douyinfe/semi-icons-lab';
import styles from './homepage.module.css';
import {useLocation, useNavigate} from "react-router-dom";
import CompetitionRelease from "./contentwindow/CompetitionRelease";
import CompetitionManagement from "./contentwindow/CompetitionManagement";
import StudentManagement from "./contentwindow/StudentManagement";
import TeacherManagement from "./contentwindow/TeacherManagement";
import ApproveManagement from "./contentwindow/ApproveManagement";
import CompetitionView from "./contentwindow/CompetitionView";
import TeacherInfo from "./contentwindow/TeacherInfo";
import StudentInfo from "./contentwindow/StudentInfo";
import MyApplication from "./contentwindow/MyApplications";

const getMenuItems = (role) => {
    switch (role) {
        case 'student':
            return [{
                itemKey: 'competition-list',
                text: '竞赛列表',
                icon: <IconTreeSelect/>
            }, {itemKey: 'my-applications', text: '我的报名', icon: <IconBadge/>}, {
                itemKey: 'student-info',
                text: '我的信息',
                icon: <IconBadge/>
            },

            ];
        case 'teacher':
            return [
                {itemKey: 'competition-list', text: '竞赛列表', icon: <IconTreeSelect/>},
                {itemKey: 'teacher-info', text: '我的信息', icon: <IconBadge/>}
            ];
        case 'admin':
            return [{
                itemKey: 'approve-management',
                text: '审批管理',
                icon: <IconBreadcrumb/>
            }, {
                itemKey: 'competition-management',
                text: '竞赛管理',
                icon: <IconTreeSelect/>
            }, {itemKey: 'competition-release', text: '竞赛发布', icon: <IconTreeSelect/>},];
        default:
            return [];
    }
};
const renderContent = (itemKey) => {
    switch (itemKey) {
        case 'competition-list':
            return <CompetitionView/>
        case 'my-applications':
            return <MyApplication/>
        case 'my-guidance':
            return <div>我的指导内容</div>;
        case 'student-info':
            return <StudentInfo/>
        case 'teacher-info':
            return <TeacherInfo/>
        case 'approve-management':
            return <ApproveManagement/>
        case 'student-management':
            return <StudentManagement/>;
        case 'teacher-management':
            return <TeacherManagement/>;
        case 'competition-management':
            return <CompetitionManagement/>;
        case 'competition-release':
            return <CompetitionRelease/>;
        default:
            return <div>欢迎使用竞赛服务管理系统！</div>;
    }
};
function LeftNav({role, onMenuClick}) {
    return (<Nav
        style={{maxWidth: 220, height: '100%'}}
        defaultSelectedKeys={['Home']}
        items={getMenuItems(role)}
        footer={{
            collapseButton: true,
        }}
        onClick={(item) => onMenuClick(item.itemKey)}
    />);
}

// 主页面组件
export const UserIdContext = createContext(0);
export default function HomePage() {
    const {Header, Footer, Sider, Content} = Layout;
    const location = useLocation();
    const {role, username, userId} = location.state;
    const navigate = useNavigate();


    // 状态管理选中的菜单项
    const [selectedMenu, setSelectedMenu] = useState('');

    // 顶部头部组件
    const TopHeader = () => (<Header className={styles.header}>
        <div>
            <Nav
                mode={'horizontal'}
                header={{
                    logo: <IconGithubLogo style={{height: '36px', fontSize: 36}}/>, text: '竞赛服务管理系统',
                }}
                footer={<Dropdown
                    position="bottomRight"
                    render={<Dropdown.Menu>
                        <Dropdown.Item>详情</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("/")}>退出</Dropdown.Item>
                    </Dropdown.Menu>}
                >
                    <Avatar size="small" color='light-blue' style={{margin: 4}}>{role}</Avatar>
                    <span>{username}</span>
                </Dropdown>}
            />
        </div>
    </Header>);

    // 底部内容组件
    const FooterContent = () => (<>
            <span
                style={{
                    display: 'flex', alignItems: 'center',
                }}
            >
                <IconGithubLogo size="large" style={{marginRight: '8px'}}/>
                <span>Copyright © {new Date().getFullYear()} Five Mountain. All Rights Reserved. </span>
            </span>
        <span>
                <span style={{marginRight: '24px'}}>平台客服</span>
                <span>反馈建议</span>
            </span>
    </>);

    return (
        <UserIdContext.Provider value={userId}>
            <Layout className={styles.container}>
                <TopHeader/>
                <Layout>
                    <Sider>
                        <LeftNav role={role} onMenuClick={setSelectedMenu}/>
                    </Sider>
                    <Content className={styles.content}>
                        {renderContent(selectedMenu)}
                    </Content>
                </Layout>
                <Footer className={styles.footer}>
                    <FooterContent/>
                </Footer>
            </Layout>
        </UserIdContext.Provider>);
}
