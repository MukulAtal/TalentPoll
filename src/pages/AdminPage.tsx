import React, { useState } from 'react';
import { Layout, Menu, Button, Form, Input, Modal, Typography, message, Row, Col, Card } from 'antd';
import { PlusOutlined, MenuUnfoldOutlined, MenuFoldOutlined, FileDoneOutlined, FolderOpenOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface Option {
    id: number;
    value: string;
}

interface Question {
    id: number;
    label: string;
    options: Option[];
}

const AdminPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pollTitle, setPollTitle] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [polls, setPolls] = useState<any[]>([]); // Stores created polls
    const [view, setView] = useState('active');

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const showAddPollModal = () => {
        setIsModalVisible(true);
        setPollTitle('');
        setQuestions([{ id: Date.now(), label: '', options: [{ id: Date.now(), value: '' }, { id: Date.now() + 1, value: '' }] }]);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const addOption = (questionId: number) => {
        setQuestions(questions.map(q =>
            q.id === questionId
                ? { ...q, options: [...q.options, { id: Date.now(), value: '' }] }
                : q
        ));
    };

    const addQuestion = () => {
        setQuestions([...questions, { id: Date.now(), label: '', options: [{ id: Date.now(), value: '' }, { id: Date.now() + 1, value: '' }] }]);
    };

    const handleSavePoll = () => {
        // Validate Poll Title
        if (!pollTitle) {
            message.error('Please enter a poll title.');
            return;
        }

        // Validate at least one question
        if (questions.length === 0 || questions.every(q => q.label.trim() === '')) {
            return message.error('At least one question is required to create a poll.');
        }

        // Validate each question has at least two options
        for (const question of questions) {
            if (question.options.filter(opt => opt.value.trim()).length < 2) {
                return message.error('Each question must have at least two options.');
            }
        }
        const newPoll = { id: Date.now(), title: pollTitle, questions, isOpen: true };
        const updatedPolls = [...polls, newPoll];
        setPolls(updatedPolls);
        localStorage.setItem('polls', JSON.stringify(updatedPolls));
        message.success('Poll saved successfully!');
        setIsModalVisible(false);
    };

    const closePoll = (pollId: number) => {
        const updatedPolls = polls.map(p => (p.id === pollId ? { ...p, isOpen: false } : p));
        setPolls(updatedPolls);
        localStorage.setItem('polls', JSON.stringify(updatedPolls));
        message.info('Poll closed.');
    };

    return (
        <Layout>
            <Sider className='sider' collapsible collapsed={collapsed} trigger={null}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showAddPollModal}
                    className='add-btn'
                >
                    {!collapsed && "Add Poll"}
                </Button>
                
                <Menu mode="inline" theme="dark" defaultSelectedKeys={['active']}>
                    <Menu.Item
                        key="active"
                        icon={<FileDoneOutlined />}
                        onClick={() => setView('active')}
                    >
                        {!collapsed && "Active Polls"}
                    </Menu.Item>
                    <Menu.Item
                        key="closed"
                        icon={<FolderOpenOutlined />}
                        onClick={() => setView('closed')}
                    >
                        {!collapsed && "Closed Polls"}
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout className="site-layout">
                <Header className='admin-header'>
                    <Button
                        type="link"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={toggleCollapse}
                    />
                    <Title level={3} className='admin-title'>Admin Dashboard</Title>
                </Header>

                <Content className='talent-poll-bg' style={{ padding: '20px' }}>
                    <Row gutter={[16, 16]}>
                        {polls.filter(poll => (view === 'active' ? poll.isOpen : !poll.isOpen)).map((poll) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={poll.id}>
                                <Card
                                    title={poll.title}
                                    extra={<Button type="link" onClick={() => closePoll(poll.id)}>Close Poll</Button>}
                                    bordered={false}
                                    style={{ width: '100%' }}
                                >
                                    {poll.questions.map((question: Question, qIndex: number) => (
                                        <div key={question.id} style={{ marginBottom: '12px' }}>
                                            <Title level={5}>{`Q${qIndex + 1}: ${question.label}`}</Title>
                                            <ul>
                                                {question.options.map((option: Option) => (
                                                    <li key={option.id}>{option.value}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Content>
            </Layout>

            <Modal
                title="Create New Poll"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <Button key="submit" type="primary" onClick={handleSavePoll}>Save Poll</Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Poll Title" required>
                        <Input
                            value={pollTitle}
                            onChange={(e) => setPollTitle(e.target.value)}
                        />
                    </Form.Item>

                    {questions.map((question, qIndex) => (
                        <div key={question.id} style={{ marginBottom: '16px' }}>
                            <Form.Item label={`Question ${qIndex + 1}`} required>
                                <Input
                                    value={question.label}
                                    onChange={(e) => {
                                        const updatedQuestions = [...questions];
                                        updatedQuestions[qIndex].label = e.target.value;
                                        setQuestions(updatedQuestions);
                                    }}
                                />
                            </Form.Item>
                            {question.options.map((option, oIndex) => (
                                <Form.Item key={option.id} label={`Option ${oIndex + 1}`} required>
                                    <Input
                                        value={option.value}
                                        onChange={(e) => {
                                            const updatedQuestions = [...questions];
                                            updatedQuestions[qIndex].options[oIndex].value = e.target.value;
                                            setQuestions(updatedQuestions);
                                        }}
                                    />
                                </Form.Item>
                            ))}
                            <Button type="dashed" onClick={() => addOption(question.id)} style={{ width: '100%', marginBottom: '8px' }}>+ Option</Button>
                        </div>
                    ))}

                    <Button type="dashed" onClick={addQuestion} style={{ width: '100%' }}>+ Add Question</Button>
                </Form>
            </Modal>
        </Layout>
    );
};

export default AdminPage;
