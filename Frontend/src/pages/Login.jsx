import './Login.scss';
import { useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../services/userServices';
import React from 'react';
import { AuthContext } from '../context/authContext';

const Login = (props) => {
  let history = useHistory();
  const handleCreatNewAccount = () => {
    history.push('/register');
  };

  const [valueLogin, setValueLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!valueLogin) {
      toast.error('Please enter your username');
      return;
    }
    if (!passwordLogin) {
      toast.error('Please enter your password');
      return;
    }

    const ff = await login(valueLogin, passwordLogin);
    console.log(ff);

    let response = await loginUser(valueLogin, passwordLogin);
    console.log(response.data.DT);
    history.push('/post');
    if (response.data && response && +response.data.EC !== 0) {
      toast.error(response.data.EM);
    }
  };

  return (
    <div className='mt-3 login-content'>
      <div className='login-container'>
        <div className='content-right gap-3 d-flex flex-column py-3'>
          <span className='text-center'>Login</span>
          <div className='text-center'>
            <input
              type='text'
              className='form-control item'
              placeholder='Username'
              value={valueLogin}
              onChange={(event) => setValueLogin(event.target.value)}
            ></input>
          </div>
          <div className='text-center'>
            <input
              type='password'
              className='form-control item'
              placeholder='Password'
              value={passwordLogin}
              onChange={(event) => setPasswordLogin(event.target.value)}
            ></input>
          </div>
          <div className='text-center'>
            <button
              type='button'
              className='btn btn-secondary text-center'
              onClick={() => handleLogin()}
            >
              Login
            </button>
          </div>
          <span className='text-center'>Forgotten your password ?</span>
          <hr />
          <div className='text-center'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={() => handleCreatNewAccount()}
            >
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
