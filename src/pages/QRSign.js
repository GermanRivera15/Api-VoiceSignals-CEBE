import React from 'react'
import QRContainer from '../components/QRContainer';

// import QRCode from "react-qr-code"


export default function QRSign() {
  return (
    <div>
      <h1> QR Example</h1>

      <div className='qr-container'>
        <QRContainer section={'melyssa'} title={'Example video'} />
        <QRContainer section={'home'} title={'Inicio'} />
        <QRContainer section={'translator-sl'} title={'translator-sl'} />


      </div>


    </div>
  )
}