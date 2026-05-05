import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextWidget } from '@livechat/widget-react'

import Navbar from './Navbar'; 
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayments';
import Notfound from './components/Notfound';
import Forgotpassword from './components/Forgotpassword';
import Footer from './Footer';
import AdminRoute from './components/AdminRoute';
import Cart from './components/Cart';
import FloatingCart from './components/FloatingCart';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);  // ✅ single source of truth

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => (item.product_id || item.id) === (product.product_id || product.id)
      );
      if (existingItem) {
        return prevCart.map((item) =>
          (item.product_id || item.id) === (product.product_id || product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="App min-h-screen" id='entire'>

        <header className="py-4 text-center" id='head'>
          <img 
            src="/lebadge.jpg" 
            alt="L'Atelier Luxe Badge" 
            className="img-fluid rounded-circle shadow" 
            style={{ maxHeight: '300px' }} 
          />
        </header>

        <Navbar user={user} handleLogout={handleLogout} defaultAvatar="👤" />

        <main className="container">
          <Routes>
            <Route path='/' element={<Getproducts addToCart={addToCart} />} />
            <Route path='/signin' element={<Signin setUser={setUser} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgot' element={<Forgotpassword />} />
            {/* ✅ cart and setCart passed here */}
            <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />} />

            <Route
              path='/addproducts'
              element={
                <AdminRoute>
                  <Addproducts />
                </AdminRoute>
              }
            />

            <Route path='/makepayment' element={<Makepayment />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </main>

        <Footer />
        {/* ✅ FloatingCart receives cart so badge stays in sync */}
        <FloatingCart cart={cart} />
        <TextWidget organizationId="358b0d53-c09e-4c31-b5ca-448a80829f74" />

      </div>
    </Router>
  );
}

export default App;