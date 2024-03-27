import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import ApprovalList from '../Staff/ApprovalList.jsx';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import ManagerProjectHD from './Manager/ManagerProjectHD';
const { Header, Content, Sider } = Layout;
import ManagerHome from '../Manager/ManagerHome.jsx';
import ManagerContent from './ManagerContent';

function Sidebar() {

    const [collapsed, setCollapsed] = useState(false);
    const [currentPage, setCurrentPage] = useState('MainContent');
    const colorBgContainer = '#fff'; // Define your color here
    const borderRadiusLG = '16px'; // Define your border radius here
    const userInfo = JSON.parse(localStorage.getItem('customer')); // Set your user information here

    console.log("userInfo: " + userInfo);

    const handlePageChange = (key) => {
        setCurrentPage(key);
    };

    const ProposalList = () => {
        // Implement ProposalList component or route here
        return <div>Proposal List</div>;
    };

   


    return (
        <Layout className='h-[600px]'>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#FFFFFF', color: '#000000' }} >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="light"
                    mode="vertical"
                    defaultSelectedKeys={['1']}
                    onSelect={({ key }) => handlePageChange(key)} // Call function when selecting a page in the Sidebar
                >
                    <Menu.Item key="MainContent" icon={<UploadOutlined />}>
                        <span>Manager Page</span>
                    </Menu.Item>
                    <Menu.Item key="RequestList" icon={<UserOutlined />}>
                        <span>Request List</span>
                    </Menu.Item>
                    <Menu.Item key="ProposalList" icon={<VideoCameraOutlined />}>
                        <span>Manager Dashboard</span>
                    </Menu.Item>
                    <Menu.Item key="ApprovalQuotationList" icon={<UploadOutlined />}>
                        <span>Approval Quotation List</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {currentPage === 'MainContent' ? (
                        <div>
                            {userInfo ? (
                                <div className='w-screen'>Welcome to Manager Page, {userInfo.fullName}</div>
                            ) : (
                                <div>Loading...</div>
                            )}
                        </div>
                    ) : currentPage === 'RequestList' ? (
                        <ManagerProjectHD />
                    ) : currentPage === 'ProposalList' ? (
                        <ManagerContent />
                    ) : currentPage === 'ApprovalQuotationList' ? (
                        <ApprovalList />
                    ) : (
                        <div>Content of Proposal List or other pages...</div>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
}

export default Sidebar;
