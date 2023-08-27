import React, { useEffect, useState } from 'react';
import { useParams, NavLink, /* useNavigate,*/ useLocation } from 'react-router-dom'
import ContainerItem from '../ContainerItem';
import '../../Styles/Dictionary.css';
import ClipLoader from "react-spinners/ClipLoader";
import Nav from 'react-bootstrap/Nav';
import dataVS from '../../components/Data.json'
import { BsSearch } from "react-icons/bs";


export default function Category() {
  const params = useParams();
  const location = useLocation();
  // const navigate = useNavigate();

  //Loading
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])


  const searchSignLanguage = async () => {
    const nombreSearch = document.getElementById('value-input');
    dataVS['signs'].map(sign => (
      sign.Title === nombreSearch.value ? (
        window.location.replace('https://voicesignalsapp.netlify.app/dictionary/' + sign.CodeCategory + '/' + sign.Code)
        // navigate(sign.CodeCategory + "/" + sign.Code)
      ) :

        console.log('No encontrado')
    ))
  }

  return (
    <div>

      {/* Navegation */}
      <div className='container-prev'>

        <Nav variant="tabs" className='container-nav-prev'>
          <Nav.Item>
            <NavLink
              to={'/dictionary'}>
              Diccionario
            </NavLink>
          </Nav.Item>

          <Nav.Item className='nav-item-active'>
            <NavLink
              to={'/dictionary/' + params.categoryId}>
              {params.categoryId}
            </NavLink>
          </Nav.Item>
        </Nav>

      </div>

      <h1 className='title-sign-language'><b>{params.categoryId}</b></h1>

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

      <div className={'contenedor'}>
        <ClipLoader color={'#2783e1'} loading={loading} size={150} className={loading ? 'Notbily' : ''} />
      </div>

      <div className={loading ? 'visibility' : 'Notvisibility'}>

        <ul className={'container-signes star-sign-favorite'}>
          {
            dataVS['signs'].map(
              signLanguageMap =>
              (
                signLanguageMap.CodeCategory === params.categoryId ? (
                  <li key={signLanguageMap.Code}>
                    <ContainerItem
                      estado={true}
                      star={true}
                      CodeReference={signLanguageMap.Code + location.search}
                      UrlImage={signLanguageMap.UrlImage}
                      Title={signLanguageMap.Title}
                    />
                  </li>
                ) : null
              )
            )
          }
        </ul>
      </div>
    </div>
  )
}