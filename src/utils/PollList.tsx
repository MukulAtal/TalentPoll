import React from 'react';
import { Card, Button, Typography, Col } from 'antd';
import PollListProps from '../interfaces/PollListProps';

const { Title } = Typography;

const PollList: React.FC<PollListProps> = ({ polls, onPollSelect, onClosePoll, view }) => {
    const role = localStorage.getItem("role");

    return (
        <>
            {polls
                .filter(poll => (view === 'active' ? poll.isOpen : !poll.isOpen))
                .map(poll => (
                    <Col xs={24} sm={12} md={8} lg={6} key={poll.id}>
                        <Card
                            key={poll.id}
                            title={poll.title}
                            extra={onClosePoll && poll.isOpen ? (
                                <Button type="primary" onClick={() => onClosePoll(poll.id)}>
                                    Close Poll
                                </Button>
                            ) : (role === 'admin' && view === 'active') || <Button type="primary" onClick={() => onPollSelect(poll)}>
                                {view === 'active' ? 'Participate' : 'View Results'}
                            </Button>
                            }
                            bordered={false}
                            className="poll-card"
                        >


                            {poll.questions.map((question, index) => (
                                <div key={question.id}>
                                    <Title level={5}>{`Q${index + 1}: ${question.label}`}</Title>
                                    <ul>
                                        {question.options.map(option => (
                                            <li key={option.id}>{option.value}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </Card>
                    </Col>
                ))}
        </>
    );
}

export default PollList;
