import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdNavigateBefore} from 'react-icons/md';

const ProductDetails = (props) => {
  const [products, setProducts] = useState([]);
  let { id } = useParams();
  id = id - 1;

  useEffect(() => {
    setProducts(...products, props[id]);
  }, []);
  const { name, brand, price, img, info } = products;

  return (
    <div className="container car_details">
      <Link to="/">
        <MdNavigateBefore />
        Back to Shop
      </Link>
      <div className="product__item">
        <img src={`${process.env.PUBLIC_URL}/${img}`} alt={name} />
        {/* public\img\auto2.jpg */}
        <div className="product__details">
          <ul>
            <li>
              <h1>{name}</h1>
            </li>
            <li>
              <h3>{brand}</h3>
            </li>
            <li>
              <p>${price}</p>
            </li>
            <li>
              <p>{info}</p>
            </li>
          </ul>

          <button onClick={() => props.addToCart(products)}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
