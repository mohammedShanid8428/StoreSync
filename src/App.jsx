import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Product from './pages/Details'

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
      </Routes>
      <Footer/>
    </main>
  )
}

export default App