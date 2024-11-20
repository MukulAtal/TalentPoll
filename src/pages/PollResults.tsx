import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Button, Col, Row, Typography, Tooltip as AntdTooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

const PollResults: React.FC = () => {
    const { pollId } = useParams<{ pollId: string }>();
    const navigate = useNavigate();
    const [pollResults, setPollResults] = useState<any | null>(null);

    useEffect(() => {
        if (pollId) {
            const rawResults = localStorage.getItem(`poll_results_${pollId}`);
            const polls = localStorage.getItem('polls');
            if (rawResults && polls) {
                const parsedResults = JSON.parse(rawResults);
                const parsedPolls = JSON.parse(polls);
                const poll = parsedPolls.find((p: any) => p.id.toString() === pollId);

                if (poll) {
                    const aggregatedResults = poll.questions.map((question: any) => ({
                        question: question.label,
                        results: question.options.map((option: any) => ({
                            option: option.value,
                            count: parsedResults[question.id]?.[option.id] || 0, // Default to 0 if no votes
                        })),
                    }));
                    setPollResults(aggregatedResults);
                }
            }
        }
    }, [pollId]);


    if (!pollResults) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <Title level={4}>No results found for this poll.</Title>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </div>
        );
    }

    const COLORS = [
        '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#9966FF',
        '#4BC0C0', '#FF9F40', '#B4FF9F', '#FF5E57', '#A29BFE', '#FFEAA7', '#FAB1A0',
        '#81ECEC', '#74B9FF', '#55EFC4', '#D63031', '#6C5CE7', '#E17055', '#0984E3',
        '#D63031', '#00CEC9', '#FD79A8', '#E84393', '#FDCB6E', '#E1BEE7'
    ];

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <AntdTooltip title="Back to Closed Polls">
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/admin')}
                        type="primary"
                        shape="circle"
                    />
                </AntdTooltip>
                <Title level={3} style={{ marginLeft: '20px', textAlign: 'center', flexGrow: 1 }}>
                    Poll Results
                </Title>
            </div>
            <Row gutter={[16, 16]} justify="center">
                {pollResults?.map((questionResult: any, index: any) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                        <Title level={4} style={{ textAlign: 'center' }}>
                            {questionResult.question}
                        </Title>
                        <PieChart width={450} height={300}>
                            <Pie
                                data={questionResult.results}
                                dataKey="count"
                                nameKey="option"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {questionResult.results.map((entry: any, idx: any) => (
                                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default PollResults;
