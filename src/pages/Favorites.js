import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { BsSearch } from "react-icons/bs";
import ContainerItem from '../components/ContainerItem';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';


export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  //User with Auth0
  const { user } = useAuth0();


  useEffect(() => {
    if (user !== undefined) {
      const response = axios.get(process.env.REACT_APP_DATABASE_URL + `/api/user-show/${user.name}/${user.email}`)
      response.then(val => {
        const responseFavorites = axios.get(process.env.REACT_APP_DATABASE_URL + `/api/favorites-user/${val.data[0].Code}`)
        responseFavorites.then(val => {
          setFavorites(val.data)
        })
      })
    }
  }, [user, setFavorites, favorites])


  const searchSignLanguageFavorite = async () => {
    const nombreSearch = document.getElementById('value-input');

    const responseUserData = axios.get(process.env.REACT_APP_DATABASE_URL + `/api/user-show/${user.name}/${user.email}`)
    responseUserData.then(val => {
      const responseDataSign = axios.get(process.env.REACT_APP_DATABASE_URL + `/api/sign-language-title-favorite/${nombreSearch.value}/${val.data[0].Code}`)
      responseDataSign.then(valDataSign => {
        if (valDataSign.data.length === 0) {
          window.location.replace(window.location.origin + '/notpage');
        } else {
          navigate("" + valDataSign.data[0].Code)
        }
      })
    })
  }

  return (
    <div className='container-dictionary'>
      <h1 className='title-dictionary'>Favoritos</h1>

      <div className='search'>
        <input
          id='value-input'
          className='input-search'
          type='text'
          placeholder='Buscar Favoritos'
          autoComplete="off"
        />
        <button className='button-search' onClick={searchSignLanguageFavorite}>
          <BsSearch />
        </button>
      </div>

      <ul className={'container-signes'}>
        {
          favorites.map(
            favoritesMap =>
              <li key={favoritesMap.Code}>
                <NavLink
                  to={favoritesMap.Code + location.search}>
                  <ContainerItem
                    estado={false}
                    UrlImage={favoritesMap.UrlImage}
                    Title={favoritesMap.Title}
                  />
                </NavLink>
              </li>
          )
        }
      </ul>

    </div>
  )
}
