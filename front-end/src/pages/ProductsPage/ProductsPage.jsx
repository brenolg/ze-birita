import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { MdShoppingCartCheckout } from 'react-icons/md';
import Context from '../../context/Context';
import { getProducts } from '../../services/APICommunication';
import ProductCard from './ProductCard';
import ProductsStyle from './styles';
import 'react-toastify/dist/ReactToastify.css';
import Carrousel from '../../components/Carrousel';

export default function ProductsPage() {
  const history = useHistory();
  const { cartValue, productList, setProductList } = useContext(Context);
  const [priceArray] = useState([]);

  useEffect(() => {
    getProducts().then((response) => {
      setProductList(response);
    });
  }, [setProductList]);

  const notify = () => toast('Adicione produtos ao carrinho para finalizar a compra!', {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });

  const handleCheckoutBtn = () => {
    if (cartValue === 0) {
      notify();
      return;
    }
    history.push('/checkout');
  };

  return (
    <>
      <ProductsStyle>

        <div>
          <main className="container_products">
            <Carrousel category="all" />

            {productList.length && productList.map((product) => (
              <ProductCard
                key={ product.id }
                id={ product.id }
                name={ product.name }
                url={ product.urlImage }
                price={ product.price }
                priceArray={ priceArray }
              />
            ))}
          </main>

          <button
            className="cart-value-container animate-shadow"
            type="button"
            name="checkout"
            onClick={ handleCheckoutBtn }
          >

            <MdShoppingCartCheckout className="cart-icon" />
            <span className="cart-value title-text">
              {`Ver Carrinho R$ ${Math.abs(cartValue).toFixed(2)} `}
            </span>

          </button>
        </div>
      </ProductsStyle>
      <ToastContainer
        position="top-center"
        autoClose={ 3000 }
        hideProgressBar={ false }
        newestOnTop={ false }
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"

      />

    </>
  );
}
