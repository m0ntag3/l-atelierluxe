import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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

function App() {
  const [user, setUser] = useState(null);

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
            <Route path='/' element={<Getproducts />} />
            <Route path='/signin' element={<Signin setUser={setUser} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgot' element={<Forgotpassword />} />

            {/* Admin-only route */}
            <Route 
              path='/addproducts' 
              element={
                <AdminRoute>
                  {<Addproducts />}
                </AdminRoute>
              } 
            />

            <Route path='/makepayment' element={<Makepayment />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </main>

        <Footer/>
      </div>
    </Router>               
  );
}

export default App;