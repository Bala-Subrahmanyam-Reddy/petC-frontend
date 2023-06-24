import { useEffect, useRef, useState } from 'react';
import { useShoppingCart } from 'shopping-cart-provider';
import './index.css';
import cartEmptyImage from '../../assests/cart_empty.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    cartTotal,
  } = useShoppingCart();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState(null);
  const addressRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem('loginObj') !== null) {
        const authObj = await JSON.parse(localStorage.getItem('loginObj'));
        setUserId(authObj.data.id);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + '/getAllAddressesById',
          {
            params: {
              token: process.env.REACT_APP_AUTH_TOKEN,
              userId,
            },
          }
        );

        if (response.status === 200) {
          if (response.data.data.length > 0) {
            setData(response.data.data);
          } else {
          }
        }
      } catch (error) {
        setMessage('Error: Something went wrong');
      }
    };

    fetchData();
  }, [userId]);

  const placeOrder = () => {
    const data = {
      address_id: addressRef.current.value,
      order_amount: cartTotal(),
      payment_method: 'COD',
    };
    const queryParams = { token: process.env.REACT_APP_AUTH_TOKEN, userId };

    axios
      .post(process.env.REACT_APP_API_URL + '/createOrder', data, {
        params: queryParams,
      })
      .then((response) => {
        if (response.data.status === 201) {
          navigate('/successful');
        }
      })
      .catch((error) => {
        console.error('Error making POST request:', error);
      });
  };

  return (
    <div className='cart'>
      <div className='container'>
        <h1 className='cart-heading'>Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <div className='row'>
            <div className='col-12 col-md-7 h-50 cart-left'>
              <ul className='cart-items-list'>
                {cartItems ? (
                  cartItems.map((eachItem, index) => (
                    <li key={eachItem.id} className='each-cart-item'>
                      <div>
                        <p>{index + 1}</p>
                      </div>
                      <div>
                        {' '}
                        <p>{eachItem.data.name}</p>
                      </div>
                      <div>
                        {' '}
                        <p>{eachItem.data.soldPrice}</p>
                      </div>
                      <div className='add-cart-button'>
                        <button
                          onClick={() =>
                            decreaseCartQuantity({ id: eachItem.id })
                          }
                        >
                          -
                        </button>
                        <label>{getItemQuantity(eachItem.id)}</label>
                        <button
                          onClick={() =>
                            increaseCartQuantity({
                              id: eachItem.id,
                              price: eachItem.data.soldPrice,
                              data: eachItem.data,
                            })
                          }
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No data found</p>
                )}
              </ul>
            </div>
            <div className='col-0 col-md-1'></div>
            <div className='col-12 col-md-4 cart-right'>
              <p className='text-center'>Order Details</p>
              <ul className='cart-items-list'>
                <li className='each-cart-item'>
                  <p>Total price</p>
                  <p>{cartTotal()}</p>
                </li>
                <li className='each-cart-item'>
                  <p>Shipping price</p>
                  <p>0</p>
                </li>
                <li className='each-cart-item'>
                  <p>Payment method</p>
                  <p>COD</p>
                </li>
                <li className='each-cart-item'>
                  <p>Total</p>
                  <p>{cartTotal()} INR </p>
                </li>
                {userId !== null ? (
                  <>
                    {data.length > 0 ? (
                      <li className='each-cart-item border-0 mt-4'>
                        <p>Address</p>
                        <select
                          class='form-select w-50'
                          aria-label='Default select example'
                          ref={addressRef}
                        >
                          {data.map((eachAddress) => (
                            <option value={eachAddress.id}>
                              {eachAddress.city},{eachAddress.pincode},
                              {eachAddress.address}
                            </option>
                          ))}
                        </select>
                      </li>
                    ) : (
                      <p className='pt-2'>
                        No address found{' '}
                        <button className='btn btn-primary'>Add one +</button>
                      </p>
                    )}
                    <li>
                      <button className='btn btn-warning' onClick={placeOrder}>
                        Place order
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <p className='pt-2 text-danger'>Please login to continue</p>
                    <Link className='btn btn-warning' to='/logIn'>
                      Login
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className='row '>
            <div className='col-12 d-flex flex-row justify-content-center'>
              <img src={cartEmptyImage} className='w-50 d-block' alt='empty' />
            </div>
            <div className='col-12'>
              <p className='text-center font-weight-bold'>
                Cart empty add some items
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
