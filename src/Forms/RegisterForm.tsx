import React from 'react';
import { Form, Input, Button, Select, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        // Retrieve existing users from local storage
        const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if user already exists
        const userExists = registeredUsers.some((user: any) =>
            user.firstName === values.firstName &&
            user.lastName === values.lastName &&
            user.role === values.role
        );

        if (userExists) {
            message.error('User already exists. Please try logging in.');
        } else {
            // If user doesn't exist, save to local storage and redirect to login
            registeredUsers.push(values);
            localStorage.setItem('users', JSON.stringify(registeredUsers));
            message.success('User Registered Successfully!');
            navigate('/');
        };
    }

    return (
        <div className='login-form'>
            <Title level={3} className='font-bold mb-5' style={{ marginBottom: '24px' }}>Register</Title>
            <Form
                name="register"
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
                        Register
                    </Button>
                </Form.Item>
            </Form>

            <div className='login-link'>
                Already have an account? <Link to="/">Login</Link>
            </div>
        </div>
    );
};

export default RegisterForm;
