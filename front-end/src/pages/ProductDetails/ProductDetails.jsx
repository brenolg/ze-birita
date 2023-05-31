import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { getProductDetails } from '../../services/APICommunication';
import Context from '../../context/Context';
import { ProductDetailsStyle } from './styles';
import LocalStorage from '../../services/LocalStorageHandler';
import Carrousel from '../../components/Carrousel';

export default function ProductDetails({ match }) {
  const { cartValue, setCartValue } = useContext(Context);
  const [product, setProduct] = useState({});
  const [cardQuantity, setCardQuantity] = useState(0);
  const { id } = match.params;
  const history = useHistory();

  useEffect(() => {
    getProductDetails(id).then((response) => {
      setProduct(response);
    });
  }, [id]);

  const writeNewQuantity = (oldCart, newQuantity) => {
    const values = oldCart.map((cartProduct) => {
      if (cartProduct.id === product.id) {
        return { ...cartProduct, quantity: newQuantity };
      }
      return cartProduct;
    });

    return values;
  }; // Escreve a nova quantidades dos produtos

  useEffect(() => {
    const oldCart = LocalStorage.get('shopping_cart') || [];

    const findProduct = oldCart.find(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (findProduct) {
      setCardQuantity(findProduct.quantity);
    }
  }, [product.id, setCartValue, cartValue]);
  // Retorna os valores do localStorage e seta cardQuantity

  const addQuantity = () => {
    const newQuantity = cardQuantity + 1;
    setCardQuantity(newQuantity);

    const newCartValue = cartValue + product.price;
    setCartValue(newCartValue);

    const oldCart = LocalStorage.get('shopping_cart') || [];

    const findProduct = oldCart.find(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (findProduct) {
      const values = writeNewQuantity(oldCart, newQuantity);
      LocalStorage.set('shopping_cart', values);
    }

    if (!findProduct) {
      const values = [...oldCart,
        { id: product.id,
          name: product.name,
          price: product.price,
          quantity: newQuantity,
        }];
      LocalStorage.set('shopping_cart', values);
    }
  };

  const removeQuantity = () => {
    if (cardQuantity === 0) return 0;

    const newQuantity = cardQuantity - 1;
    setCardQuantity(newQuantity);

    const newCartValue = cartValue - product.price;
    setCartValue(newCartValue);

    const oldCart = LocalStorage.get('shopping_cart') || [];

    const findProduct = oldCart.find(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (findProduct) {
      const values = writeNewQuantity(oldCart, newQuantity);
      LocalStorage.set('shopping_cart', values);
    }

    if (!findProduct) {
      const values = [...oldCart,
        { id, name: product.name, price: product.price, quantity: newQuantity }];
      LocalStorage.set('shopping_cart', values);
    }
  };

  const totalByItem = () => {
    const total = product.price * cardQuantity;
    return total.toFixed(2);
  };

  return (

    <ProductDetailsStyle>
      <section className="return-products-section">
        <button
          className="return-btn large-text"
          type="button"
          onClick={ () => history.push('/products') }
        >
          <HiArrowNarrowLeft className="arrow-icon" />
          VOLTAR
        </button>

      </section>
      {product.name && (
        <section className="product-detail-section">
          <div className="img-container">
            <img className="product-img" alt="product-img" src={ product.urlImage } />
          </div>

          <div className="infos-container">

            <h1 className="product-name title-text">{ product.name }</h1>
            <span className="product-price large-text">{`R$ ${product.price}`}</span>

            <div className="counter_container">
              <div className="counter">
                <button
                  className="button_counter decrease"
                  type="button"
                  name="decrease"
                  onClick={ removeQuantity }
                >
                  -
                </button>
                <span className="quantity large-text">{cardQuantity}</span>
                <button
                  className="button_counter increase"
                  type="button"
                  name="increase"
                  onClick={ addQuantity }
                >
                  +
                </button>
              </div>
              <button
                className="cart-btn medium-text"
                type="button"
              >
                <span>{`Adicionar (${cardQuantity})`}</span>
                <span>{`R$ ${totalByItem()}`}</span>

              </button>

            </div>
          </div>

        </section>
      )}

      <div className="carrousel-category-container">
        <h2 className="carrousel-title large-text">
          Você também pode gostar
        </h2>
        <Carrousel />
      </div>

    </ProductDetailsStyle>
  );
}

ProductDetails.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
});
