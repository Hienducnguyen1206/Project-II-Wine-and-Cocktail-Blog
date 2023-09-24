import './Register.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../services/userServices';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('1');

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setGender(selectedGender);
  };

  const handleRegister = async () => {
    const check = isValidInputs();

    if (check === true) {
      const response = await registerNewUser(username, password, email, gender);
      const serverData = response.data;

      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        history.push('/login');
      } else {
        toast.error(serverData.EM);
      }
    }
  };

  const isValidInputs = () => {
    if (!username || !password || !confirmPassword || !email) {
      toast.error('All fields are required');
      return false;
    }

    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password do not match');
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const history = useHistory();
  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <div className='register-container mt-3'>
      <div className=''>
        <div className='login-container '>
          <div className='content-right mt-5 d-flex flex-column gap-3 py-3 bg-light'>
            <span className='text-center'>Register</span>
            <input
              type='text'
              className='form-control item'
              placeholder='Username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            ></input>
            <input
              type='password'
              className='form-control item'
              placeholder='Password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></input>
            <input
              type='password'
              className='form-control item'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            ></input>
            <input
              type='email'
              className='form-control item'
              placeholder='Email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></input>
            <div className='form-group'>
              <label htmlFor='inputState'>Gender</label>
              <select
                id='inputState'
                className='form-control item'
                value={gender}
                onChange={handleGenderChange}
              >
                <option value='1'>Male</option>
                <option value='0'>Female</option>
              </select>
            </div>
            <button
              type='button'
              className='btn btn-secondary item'
              onClick={() => handleLogin()}
            >
              I already have an account
            </button>
            <hr />
            <button
              type='button'
              className='btn btn-success item'
              onClick={() => handleRegister()}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
