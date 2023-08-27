import React from 'react'
import Card from 'react-bootstrap/Card';
import QRContainer from '../components/QRContainer';

export default function QRSign() {
  return (
    <div>
      <h1>Códigos QR</h1>
      <Card className='card-qr'>
        <Card.Header>DICCIONARIO</Card.Header>
        <Card.Body className='card-body-qr-container'>
          <div className='qr-container'>
            <QRContainer section={process.env.REACT_APP_URL + '/dictionary/Abecedario'} title={'ABECEDARIO'} />
            <QRContainer section={process.env.REACT_APP_URL + '/dictionary/Números'} title={'NÚMEROS'} />
            <QRContainer section={process.env.REACT_APP_URL + '/dictionary/Palabras%20Mágicas'} title={'PALABRAS MÁGICAS'} />
            <QRContainer section={process.env.REACT_APP_URL + '/dictionary/Relaciones%20Familiares%20y%20Personales'} title={'FAMILIA'} />
            <QRContainer section={process.env.REACT_APP_URL + '/dictionary/Frutas'} title={'FRUTAS'} />
            <QRContainer section={process.env.REACT_APP_URL + '/dictionary/Verduras'} title={'VERDURAS'} />
            <QRContainer section={process.env.REACT_APP_URL + '/dictionary/Bebidas'} title={'BEBIDAS'} />
          </div>
        </Card.Body>
        </ Card>

        <Card className='card-qr'>
        <Card.Header>APARTADOS</Card.Header>
        <Card.Body className='card-body-qr-container'>
          <div className='qr-container'>
            <QRContainer section={process.env.REACT_APP_URL + '/home'} title={'INICIO'} />
          </div>
        </Card.Body>
        </ Card>
        </div>
        )
}