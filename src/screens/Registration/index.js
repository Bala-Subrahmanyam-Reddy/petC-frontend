/* eslint-disable jsx-a11y/img-redundant-alt */
import Image from '../../assests/banner1.png';
import './index.css';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Registration = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const ageRef = useRef();
  const breadRef = useRef();
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const [registerMsg, setRegisterMsg] = useState(null);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + '/getAllBreads',
          {
            params: {
              token: process.env.REACT_APP_AUTH_TOKEN,
            },
          }
        );

        if (response.status === 200) {
          // setMessage(response.data.message);
          setData(response.data.data);
        } else {
          setMessage('Error: Unable to fetch data');
        }
      } catch (error) {
        setMessage('Error: Something went wrong');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      pet_age: ageRef.current.value,
      pet_bread: breadRef.current.value,
    };
    const queryParams = { token: process.env.REACT_APP_AUTH_TOKEN };

    axios
      .post(process.env.REACT_APP_API_URL + '/newUser', data, {
        params: queryParams,
      })
      .then((response) => {
        if (response.data.status === 202) {
          alert(response.data.msg);
        } else if (response.data.status === 201) {
          alert(response.data.msg);
        }
      })
      .catch((error) => {
        console.error('Error making POST request:', error);
      });
  };

  return (
    <div className='registration'>
      <div className='container'>
        <div className='row login-container'>
          <div className='col-12 col-md-6'>
            <div className='login-form'>
              <h1 className='login-heading'>Registration</h1>
              <div className='mb-3'>
                <label className='form-label'>Name *</label>
                <input
                  type='text'
                  ref={nameRef}
                  className='form-control'
                  required
                />
              </div>
              <div className='mb-3 d-flex flex-row justify-content-between'>
                <div className='mb-3 mr-1'>
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
              </div>
              <div className='mb-3 d-flex flex-row justify-content-between'>
                <div className='mb-3 '>
                  <label className='form-label'>Pet Bread</label>
                  <select
                    className='form-select w-100'
                    aria-label='Default select example'
                    ref={breadRef}
                  >
                    {data ? (
                      data.map((eachBread) => (
                        <option value={eachBread.id} key={eachBread.id}>
                          {eachBread.name}
                        </option>
                      ))
                    ) : (
                      <option value=''>default</option>
                    )}
                  </select>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Pet age</label>
                  <select
                    className='form-select w-100'
                    aria-label='Default select example'
                    ref={ageRef}
                  >
                    <option value='0-6' selected={true}>
                      0-6
                    </option>
                    <option value='6-12'>6-12</option>
                    <option value='12-25'>12-25</option>
                  </select>
                </div>
              </div>
              <button
                className='btn btn-primary'
                onClick={(e) => handleSubmit(e)}
              >
                Register
              </button>

              <p className='text-primary pt-2 text-center'>
                Already had an account <Link to='/logIn'>Login here</Link>
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

export default Registration;
