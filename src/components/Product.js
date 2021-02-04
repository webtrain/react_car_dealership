import React from 'react';
import { useHistory } from 'react-router-dom';

const Product = ({ product, addToCart }) => {
  const { id, name, brand, price, img, inStock } = product;

  let history = useHistory();

  const displayProductById = (product) => {
    // history.push(`/product/${product.id}?q=name=${product.name}&brand=${product.brand}&price=${product.price}`);
    history.push(`/product/${product.id}`);
  };

  return (
    <div className="product">
      <img src={img} alt={`car-${id}`} onClick={() => displayProductById(product)} />
      <div className="head">
        <h4>{name}</h4>
        <p>${price}</p>
      </div>
      <div className="product-info">
        <p>{brand}</p>
        <p>In Stock: {inStock}</p>
      </div>
      <button onClick={() => addToCart(product)}>Add to cart</button>
    </div>
  );
};

export default Product;
