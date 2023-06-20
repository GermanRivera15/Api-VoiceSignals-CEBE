import React from 'react'
import QRCode from "react-qr-code"


export default function QRExample() {
  return (
    <div className="qr-container">
      <h1> QR</h1>
      <QRCode value="https://voicesignals.netlify.app/melyssa" />
    </div>
  )
}