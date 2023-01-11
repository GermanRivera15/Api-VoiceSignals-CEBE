import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import React from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';

import { Formik } from 'formik';
import swal from 'sweetalert';

import '../../../Styles/ManageSignLanguages.css'

export default function CreateDictionary() {
  // const navigate = useNavigate()

  return (
    <div className='container-add-dictionary'>

      {/* Dictionary */}
      <Card >
        <Card.Header as="h1" className="text-center">Diccionario</Card.Header>
        <Card.Body className='container-add-body'>

          <Formik
            initialValues={{ country: '', vigente: 1 }}
            validate={values => {
              const errors = {};

              //validate country
              if (!values.country) {
                errors.country = 'Debe ingresar un País.';
              }
              else if (values.country.length > 20) {
                errors.country = 'El país es muy largo';
              }
              else if (
                !/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(values.country)
              ) {
                errors.country = 'No se admiten caracteres especiales';
              }

              return errors;
            }}

            onSubmit={(values, { setSubmitting }) => {
              axios.post(process.env.REACT_APP_DATABASE_URL + '/api/dictionary-add', {
                Country: values.country, Vigente: values.vigente
              })

              setSubmitting(false);
              
              
              //Alert
              swal({
                title: "Diccionario Registrado",
                icon: "success",
              })
              values.country = '';
              values.vigente = 1;
              
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
                    <FloatingLabel controlId="floatingInputCustom" label="País" className="mb-3">
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="País"
                        name="country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                        isInvalid={errors.country && touched.country && errors.country}
                        />
                      <Form.Control.Feedback type="invalid">
                          {errors.country}
                      </Form.Control.Feedback>

                    </FloatingLabel>
                  </Col>

                  <Col>
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

                <button type='submit' disabled={isSubmitting} className='btn btn-primary'>Guardar</button>

              </Form>
            )}
          </Formik>

        </Card.Body>
      </Card>

    </div >
  )
}