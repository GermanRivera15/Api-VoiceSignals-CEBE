import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas';

import { HiMenu } from "react-icons/hi";
// import { FiLogIn } from "react-icons/fi";

import logoVS from '../Images/VoiceSignals.png'
// import avatarTest from '../Images/avatarTest.JPG'
import '../Styles/NavBar.css'


export default function NavBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
          <NavLink to='/qr-sign' onClick={handleClose}> QR Sign</NavLink>
          {/* <NavLink to='/video-sign' onClick={handleClose}> Video</NavLink> */}
        </nav>

        <div className="icon-bars" onClick={handleShow}>
          <HiMenu />
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

            <div className='offcanva-container-menu'>
              <NavLink to='/dictionary' onClick={handleClose}>Diccionario</NavLink>
              {/* <NavLink to='/learn-sl' onClick={handleClose}>Aprender Lenguaje de Señas</NavLink> */}
              <NavLink to='/qr-sign' onClick={handleClose}> QR Sign</NavLink>
              {/* <NavLink to='/video-sign' onClick={handleClose}> Video</NavLink> */}
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
