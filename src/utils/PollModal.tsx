import React from 'react';
import { Modal, Radio, Button, Typography } from 'antd';
import Question from '../interfaces/Question';

const { Title } = Typography;

interface PollModalProps {
  visible: boolean;
  pollTitle: string;
  questions: Question[];
  onSubmit: (answers: { [key: number]: number }) => void;
  onClose: () => void;
}

const PollModal: React.FC<PollModalProps> = ({ visible, pollTitle, questions, onSubmit, onClose }) => {
  const [answers, setAnswers] = React.useState<{ [key: number]: number }>({});

  const handleOptionChange = (questionId: number, optionId: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSave = () => {
    onSubmit(answers);
    onClose();
  };

  return (
    <Modal visible={visible} onCancel={onClose} footer={null}>
      <Title level={4}>{pollTitle}</Title>
      {questions.map(question => (
        <div key={question.id} style={{ marginBottom: '16px' }}>
          <Title level={5}>{question.label}</Title>
          <Radio.Group onChange={e => handleOptionChange(question.id, e.target.value)}>
            {question.options.map(option => (
              <Radio key={option.id} value={option.id}>
                {option.value}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      ))}
      <Button type="primary" onClick={handleSave} style={{ marginTop: '16px' }}>
        Submit
      </Button>
    </Modal>
  );
};

export default PollModal;
