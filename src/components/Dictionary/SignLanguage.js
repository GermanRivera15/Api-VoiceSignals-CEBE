import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LazyLoad from 'react-lazy-load';
import ClipLoader from "react-spinners/ClipLoader";
import Iframe from 'react-iframe'

import Nav from 'react-bootstrap/Nav';

import '../../Styles/ShowSignLanguage.css'

import dataVS from '../../components/Data.json'


export default function SignLanguage() {
  const params = useParams();

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    // setTimeout(() => {
    //   setLoading(false)
    // }, 500)
  }, [])

  return (

    <div>

      {/* Navegation */}
      <div className='container-prev'>

        <Nav variant="tabs" className='container-nav-prev'>
          <Nav.Item>
            <NavLink
              to={'/dictionary'}>
              Diccionario
            </NavLink>
          </Nav.Item>

          <Nav.Item>
            <NavLink
              to={'/dictionary/' + params.categoryId}>
              {params.categoryId}
            </NavLink>
          </Nav.Item>

          <Nav.Item className='nav-item-active'>
            <NavLink
              to={'/dictionary/'+params.categoryId+'/'+ params.signId}>
              {dataVS['signs'][params.signId-1].Title}
            </NavLink>
          </Nav.Item>
        </Nav>

      </div>

    <div className='container-show-signLanguage'>

      <ClipLoader className='loading-clipLoader' color={'#2783e1'} loading={loading} size={150} />
      {
            <Card className={loading ? 'visibility' : 'text-center container-signLanguage'} >
              <Card.Header className='title-signLanguage'>{dataVS['signs'][params.signId-1].Title}</Card.Header>
              <Card.Body>
                <Row className="g-2 container-second">
                  <Col sm>
                  {/* <Iframe url={"https://drive.google.com/file/d/" + dataVS['signs'][params.signId-1].Video + "/preview"} */}
                  <Iframe 
                  url={"https://drive.google.com/file/d/1Gy11zkKRbDFafO03EmYlBe1tNs8cAbgy/preview"}
                    id=""
                    className="video"
                    display="block"
                    position="relative"
                    // allow="accelerometer; autoplay; full"
                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    // frameBorder="2"
                    // allowFullScreen
                  />
                  </Col>
                  <Col sm>
                    <LazyLoad className='este' width={280} height={280} once onContentVisible={() => {setLoading(false)}}>
                      <Card.Img variant="top" src={'https://drive.google.com/uc?export=download&id=' + dataVS['signs'][params.signId-1].UrlImage} alt={dataVS['signs'][params.signId-1].Title} />
                    </LazyLoad>
                    <Card.Text className='text-description'>
                      {dataVS['signs'][params.signId-1].Description}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
      //   )
      }
    </div>

    </div>
  )
}