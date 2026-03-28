import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  // Pull the role from localStorage
  const userRole = localStorage.getItem('role'); 
  const isAdmin = userRole === 'admin';
  const isAuthenticated = !!userRole;

  const handleLogout = () => {
    localStorage.removeItem('role'); 
    window.location.href = '/signin'; 
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

        {/* Pass isAdmin here to hide the button inside the Navbar component */}
        <Navbar isAdmin={isAdmin} isAuthenticated={isAuthenticated} onLogout={handleLogout} />

        <main className="container">
          <Routes>
            <Route path='/' element={<Getproducts />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgot' element={<Forgotpassword/>}/>
            
            {/* Protected Route: Only renders Addproducts if isAdmin is true, else redirects to Home */}
            <Route 
              path='/addproducts' 
              element={isAdmin ? <Addproducts /> : <Navigate to="/" />} 
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