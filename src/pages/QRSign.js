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
            <QRContainer section={process.env.REACT_APP_URL + '/translator-sl'} title={'TRADUCTOR DE LENGUAJE DE SEÑAS PERUANO'} />
            <QRContainer section={'https://voicesignals.us.auth0.com/login?state=hKFo2SBQM24ySVlnVWRScUt2clotaTQ1djNhOVY0dWlJYlpENqFupWxvZ2luo3RpZNkgb3VoTEt0V0p3am9HVG5ONEJvNlZnV3p3UGY2a1pHdDejY2lk2SBYd1Q3Znl2emZVaVJSSWpaQUNpeU84S3VOM3M3cnlBeg&client=XwT7fyvzfUiRRIjZACiyO8KuN3s7ryAz&protocol=oauth2&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=openid%20profile%20email&response_type=code&response_mode=query&nonce=eWJmfnpoeWpMSGNocDViaUVuaXoxR3JBQn5xLnJybHU1TUVMaVVtY0xNUg%3D%3D&code_challenge=mpVKFuJwDbTbFPxLPNJVBW-DXdn11tFbEkTAVyNEP1g&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtcmVhY3QiLCJ2ZXJzaW9uIjoiMS4xMi4wIn0%3D'} title={'INICIAR SESIÓN'} />
          </div>
        </Card.Body>
        </ Card>
        </div>
        )
}