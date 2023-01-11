import React, { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas';

import NavDropdown from 'react-bootstrap/NavDropdown';
import { HiMenu } from "react-icons/hi";
// import { FiLogIn } from "react-icons/fi";


import { useLocalStorage } from '../components/useLocalStorage';


import logoVS from '../Images/VoiceSignals.png'
// import avatarTest from '../Images/avatarTest.JPG'
import '../Styles/NavBar.css'


import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

import axios from 'axios';



export default function NavBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Login with Auth0
  const { user, isAuthenticated } = useAuth0();

  //Local Storage
  const [dataLogin, setDataLogin] = useLocalStorage('loginData', [])


  //User Admin
  const [ userAdminister, setUserAdminister ] = useState([]);


  useEffect(() => {
    if (user !== undefined) {
      setDataLogin(user)
    } else {
      setDataLogin(null)
    }
  }, [user, setDataLogin])



  //User Adin
  const Admin = async (name,email) => {
    const response = await axios.get(process.env.REACT_APP_DATABASE_URL + `/api/user-admin/${name}/${email}`)
    setUserAdminister(response.data)
    // handleClose()
  }
  
  useEffect(() => {
    if(dataLogin!== null)
    Admin(dataLogin.name,dataLogin.email)
  }, [dataLogin /*,userAdminister*/])



  return (
    <main className='container-nav'>
      <div className="container-navegation">

        <div className="logo">
          <NavLink to='/home'>
            <img src={logoVS} alt='Logo of Voice Signals'></img>
          </NavLink>
        </div>

        <nav className="navegation">
          <NavLink to='/dictionary' onClick={handleClose}>Diccionario</NavLink>
          {/* <NavLink to='/learn-sl' onClick={handleClose}>Aprender LS</NavLink> */}
          <NavLink to='/translator-sl' onClick={handleClose}> Traductor de LS</NavLink>

          {isAuthenticated ?
            (
              <NavLink to='/favorites' onClick={handleClose}>Favoritos</NavLink>
            )
            :
            ''
          }
        </nav>

        <div className="icon-bars" onClick={handleShow}>
          <HiMenu />
        </div>



        <div className="login">

          {
            isAuthenticated ?
              (
                <div className='container-avatar'>

                  <img src={user.picture} alt={'Avatar-' + (user.given_name)} className='avatar'></img>
                  {/* <img src={avatarTest} alt={'Avatar-' + (user.given_name)} className='avatar'></img> */}

                  <NavDropdown className='given-name-avatar' title={user.given_name} id="nav-dropdown">
                    <NavLink to='/configurate' className='Link-Favorite' onClick={handleClose}>Opciones</NavLink>
                    {
                      userAdminister.length!==0 &&(
                        <NavLink to='/manage-dictionary' className='Link-Favorite' onClick={handleClose}>Gestionar Diccionario</NavLink>
                      )
                    }
                    <LogoutButton />
                    <NavDropdown.Item >

                    </NavDropdown.Item>

                  </NavDropdown>

                </div>
              )
              :
              <LoginButton estado={false} estadoTooltip={true} />

          }
        </div>


        <Offcanvas className='offcanva-menu-responsive' placement="end" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton closeVariant='white'>

            <div className="offcanva-header-menu">
              <NavLink to='/home' onClick={handleClose}>
                <img src={logoVS} alt='Logo of Voice Signals'></img>
              </NavLink>
              <Offcanvas.Title>Voice Signals</Offcanvas.Title>
            </div>

          </Offcanvas.Header>

          <Offcanvas.Body>

            {
              isAuthenticated ? (
                <div className='container-avatar-responsive'>
                  <img src={user.picture} alt={'Avatar-' + (user.given_name)} className='avatar-responsive'></img>
                  {/* <img src={avatarTest} alt={'Avatar-' + (user.given_name)} className='avatar-responsive'></img> */}
                  <h4>{user.given_name}</h4>
                </div>
              ) : ''
            }

            <div className='offcanva-container-menu'>
              <NavLink to='/dictionary' onClick={handleClose}>Diccionario</NavLink>
              {/* <NavLink to='/learn-sl' onClick={handleClose}>Aprender Lenguaje de Señas</NavLink> */}
              <NavLink to='/translator-sl' onClick={handleClose}> Traductor de Lenguaje de Señas</NavLink>
            
              {
                isAuthenticated ?
                  (
                    <div className='container-items-login'>
                      <NavLink to='/favorites' onClick={handleClose}>Favoritos</NavLink>
                      {
                        userAdminister.length!==0 &&(
                          <NavLink to='/manage-dictionary' onClick={handleClose}>Gestionar Diccionario</NavLink>
                        )
                      }
                      <LogoutButton />
                    </div>
                  )
                  :
                  <LoginButton estado={true} estadoTooltip={false} />
              }
            </div>

          </Offcanvas.Body>

        </Offcanvas>

      </div>

      <section className='outlet'>
        <Outlet />
      </section>
    </main>
  )
}
