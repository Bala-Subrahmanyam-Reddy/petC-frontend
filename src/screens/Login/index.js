/* eslint-disable jsx-a11y/img-redundant-alt */
import Image from '../../assests/banner1.png';
import './index.css';
import { Link, json } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem('loginObj') !== null) {
        navigate('/');
      }
    };
    fetchUser();
  }, []);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/getUserByEmailAndPassword',
        {
          params: {
            token: process.env.REACT_APP_AUTH_TOKEN,
            userEmail: emailRef.current.value,
            password: passwordRef.current.value,
          },
        }
      );
      if (response.data.status === 200) {
        // setMessage(response.data.message);
        const loginObj = JSON.stringify({
          auth: true,
          data: response.data.data[0],
        });
        localStorage.setItem('loginObj', loginObj);
        navigate('/');
      } else {
        alert('Email or Password is incorrect');
      }
    } catch (error) {
      setMessage('Error: Something went wrong');
    }
  };

  return (
    <div className='registration'>
      <div className='container'>
        <div className='row login-container'>
          <div className='col-12 col-md-6'>
            <div className='login-form'>
              <h1 className='login-heading'>Login</h1>

              <div className='mb-3 '>
                <label className='form-label'>Email *</label>
                <input
                  type='email'
                  ref={emailRef}
                  className='form-control'
                  required
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Password *</label>
                <input
                  type='password'
                  ref={passwordRef}
                  className='form-control'
                  required
                />
              </div>

              <button
                className='btn btn-primary'
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </button>

              <p className='text-primary pt-2 text-center'>
                DOn't have an account <Link to='/signUp'>Create new</Link>
              </p>
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <img src={Image} alt='image' className='d-block w-70 login-image' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
