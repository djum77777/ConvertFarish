import React from 'react'
import {Card,Form ,Flex,Typography, Input, Button, Alert, Spin} from 'antd'
import { NavLink } from 'react-router-dom';
//import loginImg from '../assets/login.png';
import LoginModal from '../components/Modals/LoginModal';

const Login= () => {
  const {loading,error,loginUser}=LoginModal();

  const handleLogin=async(values)=>{
    await loginUser(values);
  }
  return (
    <div className='bigBody'>
    <Card className='form-container-Login'>
      <Flex gap="medium" align='center'>
        {/* form */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className='title'>  
            Log In
          </Typography.Title>
          <Typography.Text type='secondary' strong className='slogan'>
            Fill your email and password
          </Typography.Text>
          <Form layout='vertical' onFinish={handleLogin} autoComplete='off'>
            <Form.Item label="Email" name="email" rules={[
              {
                required:true,
                message:'Please input your Email!'
              },
              {
                type:'email',
                message:'Email is not valid'
              }
            ]}>
              <Input placeholder='Input your Email'/>
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[
              {
                required:true,
                message:'Please input your password!'
              }
            ]}>
              <Input.Password placeholder='Input your password'/>
            </Form.Item>
            {
              error && <Alert description={error} type='error' showIcon closable className='alertError'/>
            }

            <Form.Item>
              <Button 
              //type='primary' 
              type={`${loading?'':'primary'}`}
              htmlType='submit' 
              size='medium' 
              className='btn'
              >
                {loading?<Spin/>: 'Log In'}
                {/* Log In */}
              </Button>
            </Form.Item>
            <Form.Item>
              <NavLink to="/" >
              <Button size='medium' className='btn'>
                Create an Account
              </Button>
              </NavLink>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
    </div>
  )
}

export default Login