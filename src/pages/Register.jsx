import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../apicalls/users';

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await createUser(values);
      if (response.success) {
        message.success(response.message);
        navigate('/login');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) navigate('/');
  }, [navigate]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <Form layout='vertical' className='w-400 bg-white p-2' onFinish={onFinish}>
        <h2 className='uppercase my-1'>HealthBridge Register</h2>

        <Form.Item label="Name" name="name">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <button className='contained-btn my-1' type='submit'>  Register</button>
 
        <Link to='/login' className='underline'>
          Already have an account? Login
        </Link>
      </Form>
    </div>
  );
}

export default Register;
