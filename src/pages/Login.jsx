import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../apicalls/users';
import { useDispatch } from 'react-redux';
import { showLoader } from '../redux/loaderSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(showLoader(true));
      const response = await loginUser(values);
      dispatch(showLoader(false));

      if (response.success) {
        message.success(response.message);
        localStorage.setItem(
          'user',
          JSON.stringify({ ...response.data, password: ' ' })
        );
        navigate('/');
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(showLoader(false));
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Form layout="vertical" className="w-400 bg-white p-2" onFinish={onFinish}>
        <h2 className="uppercase my-1">HealthBridge Login</h2>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input type="email" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <button className="contained-btn my-1 w-full" type="submit">
          Login
        </button>

        <Link to="/register" className="underline">
          Don&apos;t have an account? Signup
        </Link>
      </Form>
    </div>
  );
}

export default Login;
