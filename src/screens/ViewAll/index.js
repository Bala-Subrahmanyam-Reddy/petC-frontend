import { useParams } from 'react-router-dom';
import './index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { endianness } from 'os';
import Products from '../../components/Products';
import { ColorRing } from 'react-loader-spinner';

const ViewAll = () => {
  const params = useParams();
  const id = params.id;
  const isCategory = params.isCategory;
  const [data, setData] = useState(null);
  const [sourceData, setSourceData] = useState(null);
  const [breads, setBreads] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const urlEndpoint =
      isCategory === 'true'
        ? '/getProductsByCategoryId'
        : '/getProductsBySubCategoryId';
    const queryParam =
      isCategory === 'true'
        ? {
            token: process.env.REACT_APP_AUTH_TOKEN,
            categoryId: id,
          }
        : {
            token: process.env.REACT_APP_AUTH_TOKEN,
            subCategoryId: id,
          };
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + urlEndpoint,
          {
            params: queryParam,
          }
        );

        if (response.status === 200) {
          // setMessage(response.data.message);
          setData(response.data.data);
          setSourceData(response.data.data);
        } else {
          setMessage('Error: Unable to fetch data');
        }
      } catch (error) {
        setMessage('Error: Something went wrong');
      }
    };

    fetchData();
  }, [isCategory, id]);

  useEffect(() => {
    const fetchBreads = async () => {
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
          setBreads(response.data.data);
        } else {
          setMessage('Error: Unable to fetch data');
        }
      } catch (error) {
        setMessage('Error: Something went wrong');
      }
    };
    fetchBreads();
  }, []);

  const filterAges = async (val) => {
    const filteredArray = sourceData.filter((item) => {
      const ageRange = item.pet_ages.split('-').map((age) => parseInt(age));
      const lowerBound = ageRange[0];
      const upperBound = ageRange[1];
      return lowerBound < val || upperBound < val;
    });
    setData(filteredArray);
  };

  const filterBreads = async (event) => {
    const val = event.target.value;
    const filteredData = await sourceData.filter((each) =>
      each.pet_breads.includes(val)
    );
    setData(filteredData);
  };

  const filterSort = () => {
    setData(data.reverse());
  };

  return (
    <div className='view-all'>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-12 col-md-2 filter-container'>
            <div className='filter-container-inside'>
              <h1 className='filter-heading'>Filter </h1>
              <div className='pt-2 mt-2 border-top'>
                <p>AGE</p>
                <div class='form-check'>
                  <input
                    class='form-check-input'
                    onChange={() => filterAges(6)}
                    name='age'
                    type='radio'
                  />
                  <label class='form-check-label'>0-6</label>
                </div>
                <div class='form-check'>
                  <input
                    class='form-check-input'
                    onChange={() => filterAges(12)}
                    name='age'
                    type='radio'
                  />
                  <label class='form-check-label'>6-12</label>
                </div>
                <div class='form-check'>
                  <input
                    class='form-check-input'
                    onChange={() => filterAges(25)}
                    name='age'
                    type='radio'
                  />
                  <label class='form-check-label'>12-25</label>
                </div>
              </div>
              <div className='pt-2 mt-2 border-top'>
                <p>BREAD</p>
                {breads
                  ? breads.slice(0, 6).map((eachBread) => (
                      <div class='form-check' key={eachBread.id}>
                        <input
                          class='form-check-input'
                          name='bread'
                          type='radio'
                          value={eachBread.id}
                          onChange={(e) => filterBreads(e)}
                        />
                        <label class='form-check-label'>{eachBread.name}</label>
                      </div>
                    ))
                  : 'No data found'}
              </div>
              <div className='pt-2 mt-2 border-top'>
                <p>SORT BY</p>
                <div class='form-check'>
                  <input
                    class='form-check-input'
                    onClick={filterSort}
                    name='sort'
                    type='radio'
                  />
                  <label class='form-check-label'>Latest</label>
                </div>
                <div class='form-check'>
                  <input
                    class='form-check-input'
                    onClick={filterSort}
                    name='sort'
                    type='radio'
                  />
                  <label class='form-check-label'>Old</label>
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-10'>
            {data ? (
              data.length > 0 ? (
                <Products products={data} />
              ) : (
                <p>No data found</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAll;
