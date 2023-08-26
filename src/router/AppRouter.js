import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Home from '../pages/Home'
import Dictionary from '../pages/Dictionary'
import SignLanguage from '../components/Dictionary/SignLanguage'
// import Notfound from '../pages/NotFound'
import Footer from '../components/Footer'
import Category from '../components/Dictionary/Category'
import NotPage from '../pages/NotPage'
import VideoSign from '../pages/VideoSign'
import QRSign from '../pages/QRSign'

export default function AppRouter() {
  return (
    <section>
      <Router>
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />

            <Route path='dictionary' element={<Dictionary />} />
            <Route path='dictionary/:categoryId' element={<Category />} />
            <Route path='dictionary/:categoryId/:signId' element={<SignLanguage />} />
          
            <Route path='Video-sign' element={<VideoSign/>} />

            <Route path='qr-sign' element={<QRSign/>} />

            
            <Route path='*' element={<NotPage />} />
            
          </Route>
        </Routes>
      </Router>
      <Footer />
    </section>
  )
}
