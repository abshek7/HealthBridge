import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../apicalls/users';

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/');   
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      const response = await loginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('user', JSON.stringify({ ...response.data, password: " " }));
        navigate('/');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Form layout="vertical" className="w-400 bg-white p-2" onFinish={onFinish}>
        <h2 className="uppercase my-1">HealthBridge Login</h2>

        <Form.Item label="Email" name="email">
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <button className='contained-btn my-1' type='submit'>  Login</button>

        <Link to="/register" className="underline">Don't have an account? Signup</Link>
      </Form>
    </div>
  );
}

export default Login;
