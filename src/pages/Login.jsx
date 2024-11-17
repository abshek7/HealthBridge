import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
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
        localStorage.setItem('user', JSON.stringify({ ...response.data, password: " " }));
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
    <div className='flex justify-center items-center h-screen'>
      <Form layout='vertical' className='w-400 bg-white p-2' onFinish={onFinish}>
        <h2 className='uppercase my-1'>HealthBridge Register</h2>
      
        <Form.Item label="Email" name="email">
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <button className='contained-btn my-1 w-full' type='submit'>Register</button>
 
        <Link to='/register' className='underline'>
          D'ont have an account? Signup
        </Link>
      </Form>
    </div>
  );
}

export default Login;
