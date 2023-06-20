import React, { Component } from 'react'
// import Card from 'react-bootstrap/Card';
import QRCode from "react-qr-code"
import '../Styles/QRSign.css'

export default class QRContainer extends Component {

  render() {
    return (
      <div className='QRItem'>
        <h2>{this.props.title}</h2>
         <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={'https://voicesignals.netlify.app/' + this.props.section}
          viewBox={`0 0 256 256`}
        />
      </div>
    )
  }
}