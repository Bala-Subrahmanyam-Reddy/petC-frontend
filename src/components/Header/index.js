/* eslint-disable jsx-a11y/anchor-is-valid */
import './index.css';
import logoImage from '../../assests/logo.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md';
import { BsCart } from 'react-icons/bs';
import { useShoppingCart } from 'shopping-cart-provider';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';

const Header = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const { cartQuantity } = useShoppingCart();
  const [text, setText] = useState(null);
  const navigation = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + '/getAllSubCategoriesForEachCategory',
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
  }, [userId]);

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem('loginObj') !== null) {
        const authObj = await JSON.parse(localStorage.getItem('loginObj'));
        setUserId(authObj.data.id);
      }
    };
    fetchUser();
  }, [userId]);

  const searchFunction = (event) => {
    event.preventDefault();
    navigation('/search/' + text);
  };

  const logoutHandle = () => {
    localStorage.removeItem('loginObj');
    navigation('/');
  };

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand' href='#'>
          <img
            src={logoImage}
            alt='Logo'
            width='40'
            height='40'
            className='d-inline-block align-text-center'
          />
          PetC
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <form className='d-flex me-auto m-auto' role='search'>
            <input
              className='form-control me-2 rounded-0'
              type='search'
              placeholder='Search'
              aria-label='Search'
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className='btn btn-outline-primary rounded-0'
              onClick={(e) => searchFunction(e)}
            >
              <AiOutlineSearch />
            </button>
          </form>
          <ul className='navbar-nav mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                className='nav-link nav-each-item'
                aria-current='page'
                to='/'
              >
                <AiOutlineHome /> Home
              </Link>
            </li>
            {data ? (
              data.slice(0, 5).map((eachCategory) =>
                eachCategory.subCategories.length > 0 ? (
                  <li
                    className='nav-item dropdown'
                    key={eachCategory.categoryId}
                  >
                    <a
                      className='nav-link dropdown-toggle nav-each-item'
                      href='#'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      {eachCategory.categoryName}
                    </a>
                    <ul className='dropdown-menu'>
                      {eachCategory.subCategories.map((eachSubCategory) => (
                        <li key={eachSubCategory.id}>
                          <Link
                            className='dropdown-item nav-each-item'
                            to={`/viewAll/false/${eachSubCategory.id}`}
                          >
                            {eachSubCategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className='nav-item' key={eachCategory.categoryId}>
                    <Link
                      className='nav-link nav-each-item'
                      aria-current='page'
                      to={`/viewAll/true/${eachCategory.categoryId}`}
                    >
                      {eachCategory.categoryName}
                    </Link>
                  </li>
                )
              )
            ) : (
              <p>Loading..</p>
            )}
          </ul>

          <span className='account-icon'>
            <Link to='/cart' class='btn position-relative'>
              <BsCart />
              <span class='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary'>
                {cartQuantity}
                <span class='visually-hidden'>unread messages</span>
              </span>
            </Link>
          </span>
          {userId !== null ? (
            <>
              <span className='account-icon'>
                <MdAccountCircle />
              </span>
              <span className='account-icon'>
                <button
                  className='btn btn-outline-primary'
                  onClick={logoutHandle}
                >
                  <BiLogIn />
                </button>
              </span>
            </>
          ) : (
            <Link to='logIn' className='ml-2 btn btn-outline-primary'>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
