
import './App.css';

import Home from './Screens/Home';
import {BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";
import Login from './Screens/Login';
import Myorder from './Screens/Myorder.js';
import Signup from './Screens/Signup.js';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { CartProvider } from './Component/contextReducer.js';


function App() {
  return (
    <CartProvider>
    <Router>
  
   < div>
  <Routes>
    <Route path='/' element={<Home></Home>}/>
    <Route path='/Login' element={<Login></Login>}/> 
    <Route path='/Signup' element={<Signup></Signup>}/>  
    <Route path='/myorder' element={<Myorder></Myorder>}/>
  </Routes>
   </div>
  
    </Router>
    </CartProvider>
  );
}

export default App;
