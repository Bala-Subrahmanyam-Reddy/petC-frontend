import { useEffect, useState } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import './index.css';
import Products from '../Products';
import { AiFillForward } from 'react-icons/ai';

const ProductsByCategory = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + '/getProductsByCategories',
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

  return (
    <div className='products-by-category'>
      <ul className='ul-bg'>
        {data ? (
          data.map((eachCategory) =>
            eachCategory.products.length > 0 ? (
              <li className='list-group-item' key={eachCategory.categoryId}>
                <div className='category-heading-con d-flex flex-row justify-content-between'>
                  <h1 className='category-heading'>
                    {' '}
                    {eachCategory.categoryName}
                  </h1>
                  <span className='text-primary view-all-button'>
                    <a>
                      View All{' '}
                      <span>
                        <AiFillForward />
                      </span>
                    </a>
                  </span>
                </div>

                <Products products={eachCategory.products} />
              </li>
            ) : (
              ''
            )
          )
        ) : (
          <ColorRing
            visible={true}
            height='80'
            width='80'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
      </ul>
    </div>
  );
};

export default ProductsByCategory;
