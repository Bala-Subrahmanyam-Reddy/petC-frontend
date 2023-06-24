import orderImage from '../../assests/success_order.png';

const Successful = () => {
  return (
    <div>
      <div className='container mt-5'>
        <div className='row pt-5'>
          <div className='col-12 d-flex flex-row justify-content-center'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <img src={orderImage} alt='success' className='w-50 d-block' />
              <h3 className='text-success pt-2'>Your order placed successfully</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Successful;
