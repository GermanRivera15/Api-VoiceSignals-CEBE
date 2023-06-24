import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import QRCode from "react-qr-code"
import '../Styles/QRSign.css'

export default class QRContainer extends Component {

  render() {
    return (
      <div className='QRItem'>

        <Card>
          <Card.Header>
          <QRCode
          size={100}
          style={{ height: "auto", width: "100%" }}
          value={this.props.section}
          viewBox={`0 0 256 256`}
        />
        </Card.Header>
          <Card.Body className='card-body-qr-sign'>
            <Card.Title className='card-title-qr-sign'>{this.props.title}</Card.Title>
          </Card.Body>
        </Card>

      </div>
    )
  }
}