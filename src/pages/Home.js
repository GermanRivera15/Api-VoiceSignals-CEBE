import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import '../Styles/Home.css';
//import slider1 from '../Images/slider-1.png';
//import slider2 from '../Images/slider-2.png';
//import slider3 from '../Images/slider-3.png';
// import slider4 from '../Images/slider-4.gif';



import logomision from '../Images/logo-mision.png';
import senias1 from '../Images/imagensenia.jpg';
import logovision from '../Images/logo-vision.png';
import logoseñas from '../Images/logosenia2.png';

import Figure from 'react-bootstrap/Figure';



export default function Home() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item interval={7000}>
          <img
            className="d-block w-100"
            src={senias1}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Quienes somos</h3>
            <p>
              Descubre quien es el equipo de trabajo detrás de Voice Signals...
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={7000}>
          <img
            className="d-block w-100"
            src={senias1}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Aprende el Lenguaje de Señas de tu país</h3>
            <p>
              A través de un juego aprende el lenguaje de señas...
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={7000}>
          <img
            className="d-block w-100"
            src={senias1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Diccionario de Lenguaje de Señas</h3>
            <p>
              Busca señas del diccionario de tu país en base a sus categorías...
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* <Carousel.Item interval={7000}>
          <img
            className="d-block w-100"
            src={senias1}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Traducir lenguaje de señas en tiempo real</h3>
            <p>
              Traduce el lenguaje de señas utilizando la cámara de tu computadora...
            </p>
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>



			<span className='span'>Voice Signals...</span>
      <div className="contenedor">
		</div>


        <h2 className='title-vision-mision-history'>VISION - MISION - HISTORIA</h2>

    <div className='contenedor-2'>

        <div className='container-mision-vision'>
        <Figure>
          <Figure.Image
            width={360}
            height={309}
            alt="571x711"
            src={logovision}
          />
          <div className='capa'>
            <h3>Vision</h3>
            <p>Nuestra vision es brindar una aplicacion web
              que permita el aprendizaje de lenguaje de señas
              peruana en personas con discapacidad auditiva
              y oyentes.
            </p>
          </div>
        </Figure>

        <Figure>
          <Figure.Image
            width={360}
            height={309}
            alt="571x711"
            src={logomision}
          />
          <div className='capa'>
            <h3>Mision</h3>
            <p>Nuestra vision es brindar una aplicacion web
              que permita el aprendizaje de lenguaje de señas
              peruana en personas con discapacidad auditiva
              y oyentes.
            </p>
          </div>
        </Figure>
        </div>


        <div className='container-history'>
        <Figure>
          <Figure.Image
            width={512}
            height={512}
            alt="512x512"
            src={logoseñas}
          />
          <div className='capa'>
            <h3>Historia</h3>
            <p>Según la (OMS)
              “En el mundo, 1500 millones de personas
              viven con algún grado de pérdida de audición, de
              las cuales unos 430 millones necesitan servicios
              de rehabilitación”.
            </p>
          </div>
        </Figure>
        </div>
      </div>

    </div>
  )
}
