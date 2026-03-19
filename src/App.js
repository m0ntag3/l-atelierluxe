import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// 1. Import your new Navbar component
import Navbar from './Navbar'; 

// Import your other components
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayments';
import Notfound from './components/Notfound';
import Forgotpassword from './components/Forgotpassword';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-[#0f0f12]">
        
        {/* Header Section */}
        <header className="pt-5 pb-2" id='head'>
          <div className="div h-[10em] w-full max-w-[50rem] bg-[#1a1a1e] m-auto rounded-[1.5em] relative group p-6 z-0 overflow-hidden shadow-sm border border-white/5" id='head'>
            {/* ... (Keep your animated circles here) ... */}
            <h1 className="z-20 font-bold text-dark">L'ATELIER LUXE</h1>
            <b className="z-20 text-white/70 italic">Where both Quality and Professionals concatenate.</b>
          </div>
        </header>

        {/* 2. Place the Navbar here so it appears on all pages */}
        <Navbar />

        {/* 3. The Routes handle the switching of the main content */}
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

      </div>
    </Router>
  );
}

export default App;