import './index.css';
import Sliders from '../../components/Sliders';
import ProductsByCategory from '../../components/ProductsByCategory';

const Home = () => {
  return (
    <div className='home-section'>
      <div className='container'>
        <div className='row banner-container'>
          <div className='col-12 col-md-6'>
            <h1 className='banner-heading'>
              Shop for Quality Pet Products at Our PetC Ecommerce Store
            </h1>
            <p className='banner-para'>
              Discover a wide range of top-notch pet products that cater to your
              furry companions' needs. From nutritious food to cozy beds and
              stylish accessories, we have it all.Shop now and give your pets
              the best!
            </p>
            <button className='btn btn-primary'>Shop Now</button>
          </div>
          <div className='col-12 col-md-6 banner-right-container'>
            <Sliders />
          </div>
        </div>
        <div className='row'>
          <ProductsByCategory />
        </div>
      </div>
    </div>
  );
};

export default Home;
