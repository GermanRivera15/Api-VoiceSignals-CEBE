import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LazyLoad from 'react-lazy-load';
import ClipLoader from "react-spinners/ClipLoader";

import Nav from 'react-bootstrap/Nav';

import '../../Styles/ShowSignLanguage.css'

export default function SignLanguage() {
  const params = useParams();
  const [signLanguage, setSignLanguage] = useState([]);
  const [nameSignLanguage, setNameSignLanguage] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    // setTimeout(() => {
    //   setLoading(false)
    // }, 500)
  }, [])

  useEffect(() => {
    const getSignLanguage = async () => {
      const response = await axios.get(process.env.REACT_APP_DATABASE_URL + `/api/sign-language-code/${params.signId}`)
      setSignLanguage(response.data)
      setNameSignLanguage(response.data[0].Title)
    }
    getSignLanguage();
  }, [params])


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
              {nameSignLanguage}
            </NavLink>
          </Nav.Item>
        </Nav>

      </div>

    <div className='container-show-signLanguage'>

      <ClipLoader className='loading-clipLoader' color={'#2783e1'} loading={loading} size={150} />
      {
        signLanguage.map(
          signLanguageMap =>
            <Card className={loading ? 'visibility' : 'text-center container-signLanguage'} key={signLanguageMap.Code}>
              <Card.Header className='title-signLanguage'>{signLanguageMap.Title}</Card.Header>
              <Card.Body>
                <Row className="g-2 container-second">
                  <Col sm>
                    <LazyLoad className='este' width={280} height={280} once onContentVisible={() => {setLoading(false)}}>
                      <Card.Img variant="top" src={'https://drive.google.com/uc?export=download&id=' + signLanguageMap.UrlImage} alt={signLanguageMap.Title} />
                    </LazyLoad>
                  </Col>
                  <Col sm>
                    <Card.Text className='text-description'>
                      {signLanguageMap.Description}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
        )
      }
    </div>

    </div>
  )
}