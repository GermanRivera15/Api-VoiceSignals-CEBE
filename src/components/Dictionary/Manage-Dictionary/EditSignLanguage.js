import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';

import { AiOutlineClose } from "react-icons/ai";


import '../../../Styles/ManageSignLanguages.css'

export default function EditSignLanguage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [urlImage, setUrlImage] = useState('')
  const [codeDictionary, setCodeDictionary] = useState(0)
  const [codeCategory, setCodeCategory] = useState(0)
  const [vigente, setVigente] = useState(1)
  const [categories, setCategories] = useState([])
  const [dictionaries, setDictionaries] = useState([])
  
  const navigate = useNavigate()
  const params = useParams();

  const update = async (e) => {
    e.preventDefault()
    await axios.put(process.env.REACT_APP_DATABASE_URL + `/api/sign-language-update/${params.signId}`, {
      Title: title,
      Description: description,
      UrlImage: urlImage,
      CodeDictionary: codeDictionary,
      CodeCategory: codeCategory,
      Vigente: vigente
    })
    navigate('/manage-dictionary')
  }

  useEffect(() => {
    const getSignLanguages = async () => {
      const response = await axios.get(process.env.REACT_APP_DATABASE_URL + `/api/sign-language-code/${params.signId}`)
      setTitle(response.data[0].Title)
      setDescription(response.data[0].Description)
      setUrlImage(response.data[0].UrlImage)
      setCodeDictionary(response.data[0].CodeDictionary)
      setCodeCategory(response.data[0].CodeCategory)
      setVigente(response.data[0].Vigente)
    }
    getSignLanguages();
    getAllCategories();
    getAllDictionaries();
  }, [params])


  const getAllDictionaries = async () => {
    const response = await axios.get(process.env.REACT_APP_DATABASE_URL + '/api/dictionaries-vigentes')
    setDictionaries(response.data)
  }

  const getAllCategories = async () => {
    const response = await axios.get(process.env.REACT_APP_DATABASE_URL + '/api/categories-vigentes')
    setCategories(response.data)
  }

  return (
    <div className='container-add-sign-language'>

      {/* Icon Close */}
      <div className='container-close'>
        <NavLink
          to={'/manage-dictionary'}>
            <AiOutlineClose className='icon-close'/>
        </NavLink>
      </div>

      {/* Edit Sign Language */}

      <Card >
        <Card.Header as="h1" className="text-center">Editar Lenguaje de Señas</Card.Header>

        <Card.Body className='container-add-body'>

          <Form onSubmit={update}>

            <Row className="g-2">
              <Col md>
                <Row className="g-2">
                  <FloatingLabel controlId="floatingInputCustom" label="Título" className="mb-3">
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Título de la Seña"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FloatingLabel>
                </Row>

                <Row className="g-2">
                  <FloatingLabel controlId="floatingInputCustom" label="Diccionario" className="mb-3">
                    <Form.Select
                      aria-label="Floating label select example"
                      value={codeDictionary}
                      onChange={(e) => setCodeDictionary(e.target.value)}
                    >
                      <option value="DEFAULT" disabled>Seleccione una Opción</option>
                      {
                        dictionaries.map((dictionariesMap) => (
                          <option key={dictionariesMap.Code} value={dictionariesMap.Code}>{dictionariesMap.Country}</option>
                        ))
                      }
                    </Form.Select>
                  </FloatingLabel>
                </Row>
              </Col>

              <Col md>
                <FloatingLabel controlId="floatingTextarea2" label="Descripción" className='mb-3'>
                  <Form.Control
                    as="textarea"
                    placeholder="Ingrese una descripción"
                    style={{ height: '130px', resize: 'none' }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FloatingLabel>
              </Col>

            </Row>


            <Row className="g-2 container-second">
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="Categoría" className='mb-3'>
                  <Form.Select
                    aria-label="Floating label select example"
                    value={codeCategory}
                    onChange={(e) => setCodeCategory(e.target.value)}
                  >
                    <option value="DEFAULT" disabled>Seleccione una Opción</option>
                    {
                      categories.map((categoriesMap) => (
                        <option key={categoriesMap.Code} value={categoriesMap.Code}>{categoriesMap.Type}</option>
                      ))
                    }
                  </Form.Select>
                </FloatingLabel>
              </Col>

              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="Vigencia" className='mb-3'>
                  <Form.Select
                    aria-label="Floating label select example"
                    value={vigente}
                    onChange={(e) => setVigente(e.target.value)}
                  >
                    <option value="1">Vigente</option>
                    <option value="0">No Vigente</option>

                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="g-2">
              <FloatingLabel controlId="floatingInputCustom" label="UrlImagen" className="mb-3">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Url de la Imagen"
                  // defaultValue={urlImage}
                  value={urlImage}
                  onChange={(e) => setUrlImage(e.target.value)}
                />
              </FloatingLabel>
            </Row>

            <button type='submit' className='btn btn-primary'>Guardar</button>

          </Form>

        </Card.Body>
      </Card>
    </div>
  )
}