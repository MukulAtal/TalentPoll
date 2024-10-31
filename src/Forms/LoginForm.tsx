import React from 'react';
import { Form, Input, Button, Select, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const user = registeredUsers.find(
            (u: any) =>
                u.firstName === values.firstName &&
                u.lastName === values.lastName &&
                u.role === values.role
        );

        if (user) {
            message.success('Login successful!');

            // Navigate based on user role
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        } else {
            message.error('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className='login-form'>
            <Title level={3} className='font-bold mb-5' style={{ marginBottom: '24px' }}>Login</Title>
            <Form
                name="login"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please enter your first name!' }]}
                    className='font-bold'
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please enter your last name!' }]}
                    className='font-bold'
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: 'Please select your role!' }]}
                    className='font-bold'
                >
                    <Select placeholder="Select a role">
                        <Option value="admin">Admin</Option>
                        <Option value="user">User</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Login
                    </Button>
                </Form.Item>
            </Form>

            <div className='login-link'>
                Not registered? <Link to="/register">Click here to register.</Link>
            </div>
        </div>
    );
};

export default LoginForm;
