import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Searchbar from "./components/Searchbar"
import { ToastContainer, toast } from 'react-toastify';
import Verify from "./pages/Verify"
const App = () => { 
  
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-20">
      <ToastContainer/>
      <Navbar/>
      <Searchbar/>
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path='/collection' element={<Collection/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/product/:productId' element={<Product/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/place-order' element={<PlaceOrder/>}></Route>
      <Route path='/orders' element={<Orders/>}></Route>
      <Route path='/verify' element={<Verify/>}></Route>



     </Routes>
     <Footer/>
    </div>
     
  )
}

export default App
