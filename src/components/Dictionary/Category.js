import React, { useEffect, useState } from 'react';
import { useParams, NavLink, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import ContainerItem from '../ContainerItem';
import '../../Styles/Dictionary.css';

import { BsSearch } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";

import Nav from 'react-bootstrap/Nav';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useAuth0 } from '@auth0/auth0-react';


export default function Category() {
  const [signLanguage, setSignLanguage] = useState([]);
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  //Loading
  const [loading, setLoading] = useState(false)

  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Modal2
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  //Modal3
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);


  //Loading
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  //All Sign Languages for Category
  useEffect(() => {
    const getAllSignLanguagesCategory = async () => {
      const response = await axios.get(process.env.REACT_APP_DATABASE_URL + `/api/sign-language-category/${params.categoryId}`)
      setSignLanguage(response.data)
    }
    getAllSignLanguagesCategory();
    console.log(params.categoryId)
  }, [params])


  //Search Sign Language
  const searchSignLanguage = async () => {
    const nombreSearch = document.getElementById('value-input');
    const response = await axios.get(process.env.REACT_APP_DATABASE_URL + `/api/sign-language-title/${nombreSearch.value}`)
    response.data.map(
      signLanguageMap =>
        navigate('' + signLanguageMap.Code)
    )
    if (response.data.length === 0) {
      window.location.replace(window.location.origin + '/notpage');
    }
  }





  // Login with Auth0
  const { user } = useAuth0();
  const [loginCorrect, setLoginCorrect] = useState([]);

  //Favorite
  // const [starFavorite, setStarFavorite] = useState(false);

  //Local Storage (se elimino el setLoginData)
  const [loginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  //User Registered
  const ShowUser = async (name, email) => {
    const response = await axios.get(process.env.REACT_APP_DATABASE_URL + `/api/user-show/${name}/${email}`)
    setLoginCorrect(response.data)
    handleClose()
  }

  useEffect(() => {
    const UserLoginBD = async (name, email) => {
      const response = await axios.get(process.env.REACT_APP_DATABASE_URL + `/api/user-show/${name}/${email}`)
      setLoginCorrect(response.data)
    }

    if (loginData !== null)
      UserLoginBD(loginData.name, loginData.email)
  }, [loginData])



  //Favorite
  function Favorite(CodeSign) {

    if (loginCorrect.length !== 0) {
      // console.log('usuario ya registrado')

      const favoriteSignUser = axios.get(process.env.REACT_APP_DATABASE_URL +
        `/api/favorite-user-sign-language/${CodeSign}/${loginCorrect[0].Code}`)

      favoriteSignUser.then(val => {
        if (val.data.length === 0) {
          axios.post(process.env.REACT_APP_DATABASE_URL + '/api/favorite-add', {
            CodeUser: loginCorrect[0].Code,
            CodeSignlanguage: CodeSign,
            Vigente: 1,
          }).catch(function (error) {
            console.log(error)
          })

        } else {

          const favoriteSignUser = axios.get(process.env.REACT_APP_DATABASE_URL +
            `/api/favorite-user-sign-language/${CodeSign}/${loginCorrect[0].Code}`)
          favoriteSignUser.then(val => {
            if (val.data[0].Vigente === 1) {
              axios.put(process.env.REACT_APP_DATABASE_URL + `/api/favorite-update-vigente/${val.data[0].Code}`, {
                Vigente: 0
              })
            handleShow3()

            } else {
              axios.put(process.env.REACT_APP_DATABASE_URL + `/api/favorite-update-vigente/${val.data[0].Code}`, {
                Vigente: 1
              })
              handleShow()
            }
          })

          // console.log('favorito ya registrado - actualizado')
        }

      })


    } else {
      // console.log('no registrado - recien registrarse')
      if (user !== undefined) {
        axios.post(process.env.REACT_APP_DATABASE_URL + '/api/user-add', {
          Name: user.name,
          Email: user.email,
          Rol: 'Usuario',
          Active: 1
        }).then(() => {
          const userloginBD = axios.get(process.env.REACT_APP_DATABASE_URL + `/api/user-show/${user.name}/${user.email}`)
          userloginBD.then((val) => {
            axios.post(process.env.REACT_APP_DATABASE_URL + '/api/favorite-add', {
              CodeUser: val.data[0].Code,
              CodeSignlanguage: CodeSign,
              Vigente: 1,
            }).catch(function (error) {
              console.log(error)
            })
            // console.log('favorite register')
          })
          handleShow()
        })
        handleShow()
      } else {
        /*console.log('no logueado')*/
        handleShow2()
      }
    }
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
            signLanguage.map(
              signLanguageMap =>
                <li key={signLanguageMap.Code}>
                  <ContainerItem
                    estado={true}
                    star={true}
                    CodeReference={signLanguageMap.Code + location.search}
                    starFavorite={() => { Favorite(signLanguageMap.Code) }}
                    UrlImage={signLanguageMap.UrlImage}
                    Title={signLanguageMap.Title}
                  />

                </li>
            )
          }
        </ul>

      </div>



      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        keyboard={false}
        className='container-modal-favorite'
      >
        <Modal.Header>
          <Modal.Title className='title-modal-favorite'>Guardado</Modal.Title>
        </Modal.Header>
        <Modal.Body className='body-modal-favorite'>
          Vea su lista de Favoritos
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              ShowUser(loginData.name, loginData.email)
            }
            }
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        centered
        keyboard={false}
        className='container-modal-favorite'
      >
        <Modal.Header>
          <Modal.Title className='title-modal-favorite'>No has iniciado sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body className='body-modal-favorite'>
          Debes iniciar sesión para poder guardar una seña a Favoritos
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              handleClose2()
            }
            }
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        centered
        keyboard={false}
        className='container-modal-favorite'
      >
        <Modal.Header>
          <Modal.Title className='title-modal-favorite'>Quitado de Favoritos</Modal.Title>
        </Modal.Header>
        <Modal.Body className='body-modal-favorite'>
          El lenguaje de seña se ha quitado de favoritos
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              handleClose3()
            }
            }
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>

  )
}