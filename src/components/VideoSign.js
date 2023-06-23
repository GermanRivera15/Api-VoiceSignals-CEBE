import React, { Component } from 'react'
import Iframe from 'react-iframe'
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../Styles/Video.css'

export default class VideoSign extends Component {

  render() {
    return (
      <div>
        {/* <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>
            <Iframe url={"https://drive.google.com/file/d/" + this.props.video + "/preview"}
              id=""
              className="farronia"
              display="block"
              position="relative"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
            />
          </Card.Text>
        </Card.Body> */}


        <Card className='text-center container-video-sign'>
          <Card.Header className='title-signLanguage'>{this.props.title}</Card.Header>
          <Card.Body>
            <Row className="g-2 container-second">
              <Col sm className='col-video'>
              <Iframe url={"https://drive.google.com/file/d/" + this.props.video + "/preview"}
              id=""
              className="video"
              display="block"
              position="relative"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
            />    
              </Col>
              <Col sm>
                <Card.Text className='text-description'>
                  {this.props.description}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>


      </div>
    )
  }
}