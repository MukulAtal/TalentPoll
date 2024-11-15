import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, message, Menu, Button } from 'antd';
import { FileDoneOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import PollList from '../utils/PollList';
import PollModal from '../utils/PollModal';
import Poll from '../interfaces/Poll';
import Sider from 'antd/es/layout/Sider';

const { Header, Content } = Layout;
const { Title } = Typography;

const UserPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [polls, setPolls] = useState<Poll[]>([]);
    const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
    const [view, setView] = useState<'active' | 'closed'>('active');

    useEffect(() => {
        const savedPolls = localStorage.getItem('polls');
        if (savedPolls) setPolls(JSON.parse(savedPolls));
    }, []);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handlePollSubmit = (answers: { [key: number]: number }) => {
        localStorage.setItem(`poll_results_${selectedPoll?.id}`, JSON.stringify(answers));
        message.success('Poll submitted successfully.');
        setSelectedPoll(null);
    };

    return (
        <Layout>
            <Sider className='sider user-menu' collapsible collapsed={collapsed} trigger={null}>
                <Menu mode="inline" theme="dark" defaultSelectedKeys={['active']}>
                    <Menu.Item
                        key="active"
                        icon={<FileDoneOutlined />}
                        onClick={() => setView('active')}
                    >
                        {!collapsed && "Active Polls"}
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className='page-header'>
                    <Button
                        type="link"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={toggleCollapse}
                    />
                    <Title level={3} className='admin-title'>User Dashboard</Title>
                </Header>
                <Content>
                    <Row gutter={[16, 16]}>
                        <PollList polls={polls} view="active" onPollSelect={setSelectedPoll} />
                    </Row>
                    <PollModal
                        visible={!!selectedPoll}
                        pollTitle={selectedPoll?.title || ''}
                        questions={selectedPoll?.questions || []}
                        onSubmit={handlePollSubmit}
                        onClose={() => setSelectedPoll(null)}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};

export default UserPage;
