import React /*, { useEffect, useState }*/ from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { BsSearch } from "react-icons/bs";
import ContainerItem from '../components/ContainerItem';
import axios from 'axios';
// import ClipLoader from "react-spinners/ClipLoader";

import categories from '../components/Data.json'

import '../Styles/Dictionary.css';


// import { useAuth0 } from "@auth0/auth0-react";



export default function Dictionary() {
  // const [categories, setCategories] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();



  // const { user,isAuthenticated } = useAuth0();


  // const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 500)
  // }, [])


  // useEffect(() => {
  //   //getAllCategories();
  //   listaCategorias.map(xmap=>(
  //     setCategories(listaCategorias)
  //   ))
    

  // }, [])

  // const getAllCategories = async () => {
  //   const response = await axios.get(process.env.REACT_APP_DATABASE_URL + '/api/category-vigentes-sign-language')
  //   setCategories(response.data)
  // }

  const searchSignLanguage = async () => {
    const nombreSearch = document.getElementById('value-input');
    const response = await axios.get(process.env.REACT_APP_DATABASE_URL + `/api/sign-language-title/${nombreSearch.value}`)
    response.data.map(
      signLanguageMap =>
        navigate(signLanguageMap.Type + "/" + signLanguageMap.Code)
    )
    if (response.data.length === 0) {
      window.location.replace(window.location.origin + '/notpage');
    }
  }

  return (
    <div className='container-dictionary'>
      <h1 className='title-dictionary'>Diccionario</h1>

      {/* {
        isAuthenticated && (
          console.log(user)
        )
      } */}
      <div className='search'>
        <input
          id='value-input'
          className='input-search'
          type='text'
          placeholder='Buscar Seña'
          autoComplete="off"
        />
        <button className='button-search' onClick={searchSignLanguage}>
          <BsSearch />
        </button>
      </div>

      {/* <div className={'contenedor'}>
        <ClipLoader color={'#2783e1'} loading={loading} size={150} className={loading ? 'Notbily' : ''} />
      </div> */}

      {/* <div className={loading ? 'visibility' : 'Notvisibility'}> */}

      <ul className={'container-signes'}>
        {
          categories.map(
            categoryMap =>
              <li key={categoryMap.Code}>
                <NavLink
                  to={categoryMap.Type + location.search}>
                  <ContainerItem
                    estado={false}
                    UrlImage={categoryMap.UrlImage}
                    Title={categoryMap.Type}
                  />
                </NavLink>
              </li>
          )
        }
      </ul>

      {/* </div> */}

    </div>
  )
}
