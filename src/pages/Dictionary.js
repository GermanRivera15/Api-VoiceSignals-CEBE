import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { BsSearch } from "react-icons/bs";
import ContainerItem from '../components/ContainerItem';
import dataVS from '../components/Data.json'
import '../Styles/Dictionary.css';

export default function Dictionary() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchSignLanguage = async () => {
    const nombreSearch = document.getElementById('value-input');
    dataVS['signs'].map(sign => (
      sign.Title === nombreSearch.value ? (
        navigate(sign.CodeCategory + "/" + sign.Code)
      ) :

        console.log('No encontrado')
    ))
  }

  return (
    <div className='container-dictionary'>
      <h1 className='title-dictionary'>Diccionario</h1>

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

      <ul className={'container-signes'}>
        {
          dataVS['categories'].map(
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
    </div>
  )
}