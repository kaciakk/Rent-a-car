
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import Cars from './Pages/Cars';
import Offer from './Pages/Offer';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import LoginSignup from './Pages/LoginSignup';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Components/Signup/Signup';

function App() {
  return (
    <main>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cars' element={<Cars />} />
          <Route path='/offer' element={<Offer />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/signup' element={<Signup />} />
         </Routes>
      </BrowserRouter>

    </main>
  );
}

export default App;
