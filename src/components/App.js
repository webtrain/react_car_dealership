import React, { useState } from 'react';
import '../App.css';
import Nav from './Nav';
import ProductList from './ProductList';
import { data } from '../products';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import OrderDetails from './pages/OrderDetails';

function App() {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, action = 'inc') => {
    const exist = cartItems.find((item) => item.id === product.id);

    switch (action) {
      case 'inc':
        if (exist) {
          if (exist.qty < product.inStock) {
            setCartItems(cartItems.map((p) => (p.id === product.id ? { ...exist, qty: exist.qty + 1 } : p)));
          }
        } else {
          setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
        break;

      case 'dec':
        if (exist.qty === 1) {
          setCartItems(cartItems.filter((p) => p.id !== product.id));
        } else {
          setCartItems(cartItems.map((p) => (p.id === product.id ? { ...exist, qty: exist.qty - 1 } : p)));
        }
        break;
    }
  };

  return (
    <div className="app">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Nav addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} />
        <Switch>
          <Route path="/product/:id">
            <ProductDetails {...products} addToCart={addToCart} />
          </Route>
          <Route path="/order-details" component={OrderDetails} />
          <ProductList products={products} addToCart={addToCart} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
