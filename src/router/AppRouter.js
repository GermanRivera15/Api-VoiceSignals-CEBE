import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Home from '../pages/Home'
import Dictionary from '../pages/Dictionary'
import SignLanguage from '../components/Dictionary/SignLanguage'
import SignLanguageFavorite from '../components/Dictionary/SignLanguageFavorite'
import LearnLSP from '../pages/LearnLSP'
import Favorites from '../pages/Favorites'
import Login from '../pages/Login'
// import Notfound from '../pages/NotFound'
import Footer from '../components/Footer'
import Category from '../components/Dictionary/Category'
import ShowSignLanguages from '../components/Dictionary/Manage-Dictionary/ShowSignLanguages'
import EditSignLanguage from '../components/Dictionary/Manage-Dictionary/EditSignLanguage'
import CreateSignLanguage from '../components/Dictionary/Manage-Dictionary/CreateSignLanguage'
import CreateDictionary from '../components/Dictionary/Manage-Dictionary/CreateDictionary'
import CreateCategory from '../components/Dictionary/Manage-Dictionary/CreateCategory'
import TranslatorSL from '../pages/Translator-SL'
import NotPage from '../pages/NotPage'
import VideoSign from '../pages/VideoSign'

import QRSign from '../pages/QRSign'


import Model from '../pages/models'


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
          
            <Route path='learn-sl' element={<LearnLSP />} />
            <Route path='translator-sl' element={<TranslatorSL />} />
            <Route path='favorites' element={<Favorites />} />
            <Route path='login' element={<Login />} />
            
            <Route path='manage-dictionary' element={<ShowSignLanguages />} />
            <Route path='manage-dictionary/:signId' element={<EditSignLanguage />} />
            <Route path='manage-dictionary/create-dictionary' element={<CreateDictionary />} />
            <Route path='manage-dictionary/create-category' element={<CreateCategory />} />
            <Route path='manage-dictionary/create-sign-language' element={<CreateSignLanguage />} />

            <Route path='favorites/:signId' element={<SignLanguageFavorite />} />
            <Route path='model' element={<Model />} />

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
