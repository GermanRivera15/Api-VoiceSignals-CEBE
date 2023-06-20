import React from 'react'
import Iframe from 'react-iframe'
import 'bootstrap/dist/css/bootstrap.css';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import '../Styles/farronia.css'
export default function Melyssa() {
  return (
    <div>

      <Card.Body>
        <Card.Title>Lenguaje de Señas</Card.Title>
        <Card.Text>
          <Iframe url={"https://drive.google.com/file/d/1BYhlSszFzUcQPIbXeDIhTGrpDGkhW9lO/preview"}
            id=""
            className="farronia"
            // display="block"
            position="relative"
            allow="autoplay"
          />
        </Card.Text>
        {/* <Button variant="primary">GO XD</Button> */}
      </Card.Body>

    </div>
  )
}
