import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './LoginModal.css';
import Logo from './logo-standard.png';
import { Button, Form, Input, message } from 'antd';

const LoginModal = () => {

	const { postLogin } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (values) => {
		const formLogin = new FormData();
		formLogin.append('user_email',values.user_email)
		formLogin.append('user_password',values.user_password)
		const res = await postLogin(formLogin);

		if (res.response) {
			message.error (res.response.data.message);
		} else {
			localStorage.setItem('accessToken', res.data.data.accessToken);
			message.success('Login successfully!')
			navigate('/transactions');
		};
	};

	return (
		<div className='log-modal'>
			<img src={Logo} alt='logo' className='LogoImg'></img>
			<div className="form-header">Login</div>
			<Form layout='vertical'onFinish={handleSubmit} autoComplete='off'>
    			<Form.Item 
				label={<label style={{ color:"white"}}>Email : </label>} 
				name='user_email' rules={[
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
			    <Form.Item 
                label={<label style={{ color:"white"}}>Password : </label>}
                name="user_password" rules={[
                {
                    required:true,
                    message:'Please input your password!'
                }
                ]}>
                    <Input.Password placeholder='Input your password'/>
                </Form.Item>
			    <Form.Item>
			        <Button className='btn' type='primary' size='medium' htmlType='submit'>Submit</Button>
			    </Form.Item>
			</Form>
			<div className="form-footer">Don't have an account?&nbsp;<NavLink to='/register' className='log-link'>Register here.</NavLink></div>
		</div>
	);
};

export default LoginModal;