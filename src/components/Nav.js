import React, { useState } from 'react';
import { RiShoppingBagLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';

const Nav = ({ addToCart, cartItems, setCartItems }) => {
  const [showCartDetails, setShowCartDetails] = useState(false);

  let history = useHistory();

  const sumQty = cartItems.reduce((arr, acc) => arr + acc.qty, 0);
  const itemsPrice = cartItems.reduce((arr, acc) => arr + acc.price * acc.qty, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice + taxPrice > 35000 ? 'Free' : cartItems.length > 0 ? 200 : 0;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const checkOut = (product) => {
    setShowCartDetails(!showCartDetails);
    setCartItems([]);
    history.push('/order-details');
  };

  return (
    <nav>
      <div className="container">
        <div className="navigation-content">
          <div className="logo">
            <NavLink to="/">Amazona Cars</NavLink>
          </div>
          <div className="basket" onClick={() => setShowCartDetails(!showCartDetails)}>
            <RiShoppingBagLine />
            <span>{sumQty}</span>
          </div>
        </div>
        <div className={`cart-details ${showCartDetails && 'show'}`}>
          <h1>Shoping Cart</h1>
          <span className="cart-details__closeBtn" onClick={() => setShowCartDetails(!showCartDetails)}>
            X
          </span>

          {cartItems.length === 0 ? (
            <div className="cart-details__empty-cart">
              <h3>Your cart is empty.</h3>
              <Link to="/">
                <button onClick={() => setShowCartDetails(!showCartDetails)}>Go To Shopping</button>
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-details__products">
                <ul>
                  {cartItems.map((product) => (
                    <li key={product.id}>
                      <img src={`${process.env.PUBLIC_URL}/${product.img}`} alt={`car-${product.id}-image`} />
                      <h4>{product.name}</h4>
                      <div className="qty">
                        <span data-type="inc" onClick={() => addToCart(product)}>
                          +
                        </span>
                        <div className="quantity">{product.qty}</div>
                        <span data-type="dec" onClick={(e) => addToCart(product, e.target.dataset.type)}>
                          -
                        </span>
                      </div>
                      <p>${product.price}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="summary">
                <div className="summary__details">
                  <div>
                    <p>Items price:</p>
                    <p>{itemsPrice}</p>
                  </div>
                  <div>
                    <p>Tax:</p>
                    <p>{taxPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p>Shipping:</p>
                    <p className={itemsPrice > 35000 ? 'green' : ''}>{shippingPrice}</p>
                  </div>
                </div>
                <div className="summary__total">
                  <h2>Total:</h2>
                  <p>
                    ${shippingPrice !== 'Free' ? totalPrice.toFixed(2) : totalPrice.slice(0, totalPrice.length - 4)}
                  </p>
                </div>
              </div>
              <button onClick={checkOut}>Checkout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
