import axios from 'axios'
import { NavLink } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import { Formik } from 'formik';
import swal from 'sweetalert';

import { AiOutlineClose } from "react-icons/ai";

import '../../../Styles/ManageSignLanguages.css'

export default function CreateSignLanguage() {
  const [categories, setCategories] = useState([])
  const [dictionaries, setDictionaries] = useState([])
  // const navigate = useNavigate()

  useEffect(() => {
    getAllCategories();
    getAllDictionaries();
  }, [])

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

      {/* Sign Language */}
      <Card >
        <Card.Header as="h1" className="text-center element-data-title">Registrar Lenguaje de Señas</Card.Header>
        <Card.Body className='container-add-body'>

          <Formik
            initialValues={{ title: '', dictionary: 1, description: '', category: 1, vigente: 1, urlImage: '' }}
            validate={values => {
              const errors = {};

              //validate title
              if (!values.title) {
                errors.title = 'Debe ingresar el título';
              }
              else if (values.title.length > 40) {
                errors.title = 'El título es muy larga';
              }
              else if (
                !/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(values.title)
              ) {
                errors.title = 'No se admiten números y caracteres especiales';
              }

              //validate description
              if (!values.description) {
                errors.description = 'Debe ingresar una descripción';
              }

              //validate URLImage
              if (!values.urlImage) {
                errors.urlImage = 'Debe ingresar la URL';
              }
              else if (values.urlImage.length > 60) {
                errors.urlImage = 'La URL es muy larga';
              }

              return errors;
            }}

            onSubmit={(values, { setSubmitting }) => {
              axios.post(process.env.REACT_APP_DATABASE_URL + '/api/sign-language-add', {
                Title: values.title, Description: values.description, UrlImage: values.urlImage,
                CodeDictionary: values.dictionary, CodeCategory: values.category, Vigente: values.vigente
              })

              setSubmitting(false);

              //Alert
              swal({
                title: "Lenguaje de Seña Registrado",
                icon: "success",
              })
              values.title = '';
              values.description = '';
              values.urlImage = '';
              values.dictionary = 0;
              values.category = 0;
              values.vigente = 0;
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="g-2">
                  <Col md>
                    <Row className="g-2">
                      <FloatingLabel controlId="floatingInputCustom" label="Título" className="mb-3">
                        <Form.Control
                          size="sm"
                          type="text"
                          placeholder="Título"
                          name="title"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.title}
                          isInvalid={errors.title && touched.title && errors.title}
                          />
                        <Form.Control.Feedback type="invalid">
                            {errors.title}
                        </Form.Control.Feedback>

                      </FloatingLabel>
                    </Row>

                    <Row className="g-2">
                      <FloatingLabel controlId="floatingInputCustom" label="Diccionario" className="mb-3">
                        <Form.Select
                          aria-label="Floating label select example"
                          name="dictionary"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.dictionary}
                        >
                          <option value="DEFAULT" disabled>Seleccione una Opción</option>
                          {
                            dictionaries.map((dictionariesMap) => (
                              <option key={dictionariesMap.Code} value={dictionariesMap.Code}>{dictionariesMap.Country}</option>
                            ))
                          }
                        </Form.Select>
                      </FloatingLabel>
                      {errors.dictionary && touched.dictionary && errors.dictionary && <div className='error'>{errors.dictionary}</div>}

                    </Row>
                  </Col>

                  <Col md>
                    <FloatingLabel controlId="floatingTextarea2" label="Descripción" className='mb-3'>
                      <Form.Control
                        as="textarea"
                        placeholder="Ingrese una descripción"
                        style={{ height: '130px', resize: 'none' }}
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        isInvalid={errors.description && touched.description && errors.description}
                        />
                      <Form.Control.Feedback type="invalid">
                          {errors.description}
                      </Form.Control.Feedback>

                    </FloatingLabel>
                  </Col>

                </Row>

                <Row className="g-2 container-second">
                  <Col md>
                    <FloatingLabel controlId="floatingSelectGrid" label="Categoría" className='mb-3'>
                      <Form.Select
                        aria-label="Floating label select example"
                        name="category"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.category}
                      >
                        <option value="DEFAULT" disabled>Seleccione una Opción</option>
                        {
                          categories.map((categoriesMap) => (
                            <option key={categoriesMap.Code} value={categoriesMap.Code}>{categoriesMap.Type}</option>
                          ))
                        }
                      </Form.Select>
                    </FloatingLabel>
                    {errors.category && touched.category && errors.category && <div className='error'>{errors.category}</div>}

                  </Col>

                  <Col md>
                    <FloatingLabel controlId="floatingSelectGrid" label="Vigencia" className='mb-3'>
                      <Form.Select
                        aria-label="Floating label select example"
                        name="vigente"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.vigente}
                      >
                        <option value="1">Vigente</option>
                        <option value="0">No Vigente</option>

                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>

                <Row className="g-2">
                  <FloatingLabel controlId="floatingInputCustom" label="UrlImage" className="mb-3">
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Url Imagen"
                      name="urlImage"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.urlImage}
                      isInvalid={errors.urlImage && touched.urlImage && errors.urlImage}
                      />
                    <Form.Control.Feedback type="invalid">
                        {errors.urlImage}
                    </Form.Control.Feedback>

                  </FloatingLabel>
                </Row>

                <button type='submit' disabled={isSubmitting} className='btn btn-primary'>Guardar</button>

              </Form>
            )}
          </Formik>

        </Card.Body>
      </Card>

    </div >
  )
}