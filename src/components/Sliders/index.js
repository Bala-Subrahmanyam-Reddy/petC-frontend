import Carousel from 'react-bootstrap/Carousel';
import banner1Image from '../../assests/banner1.png';
import banner2Image from '../../assests/banner2.png';
import banner3Image from '../../assests/banner3.png';
import './index.css';

const Sliders = () => {
  return (
    <div>
      <img src={banner2Image} alt="banner" className='w-100 d-block'/>
    </div>
  );
};

export default Sliders;
