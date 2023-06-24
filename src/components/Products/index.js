import './index.css';
import { BsCurrencyRupee } from 'react-icons/bs';
import { useShoppingCart } from 'shopping-cart-provider';

const Products = ({ products }) => {
  const { increaseCartQuantity, decreaseCartQuantity, getItemQuantity } =
    useShoppingCart();

  const increaseCart = (id, name, soldPrice, originalPrice, Image) => {
    const cartObject = {
      name,
      soldPrice,
      originalPrice,
      Image,
    };
    increaseCartQuantity({ id, price: soldPrice, data: cartObject });
  };
  return (
    <div className='products'>
      <div className='container'>
        <div className='row row-cols-md-5 row-cols-sm-2'>
          {products.map((eachProduct) => (
            <div className='col each-product' key={eachProduct.id}>
              <img
                className='w-100 d-block product-image'
                src={eachProduct.p_image}
                alt={eachProduct.name}
              />
              <div className='product-top-con'>
                <h1 className='product-heading'>{eachProduct.name}</h1>
                <p className='product-age-text'>Age: {eachProduct.pet_ages}</p>
              </div>
              <div className='cart-con'>
                <div className='products-price-container'>
                  <p className='product-original-price'>
                    {eachProduct.original_price}
                  </p>
                  <p className='product-sold-price'>
                    <BsCurrencyRupee /> {eachProduct.sold_price}
                  </p>
                </div>
                <div className='add-cart-button'>
                  <button
                    onClick={() => decreaseCartQuantity({ id: eachProduct.id })}
                  >
                    -
                  </button>
                  <label>{getItemQuantity(eachProduct.id)}</label>
                  <button
                    onClick={() =>
                      increaseCart(
                        eachProduct.id,
                        eachProduct.name,
                        eachProduct.sold_price,
                        eachProduct.original_price,
                        eachProduct.p_image
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
