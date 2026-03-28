import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar'; 
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayments';
import Notfound from './components/Notfound';
import Forgotpassword from './components/Forgotpassword';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './Footer';

function App() {

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

        {/* Pass isAdmin and handleLogout to the Navbar */}
        <Navbar />

        <main className="container">
          <Routes>
            <Route path='/' element={<Getproducts />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgot' element= {<Forgotpassword/>}/>
            <Route path='/addproducts' element={<Addproducts />} />
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