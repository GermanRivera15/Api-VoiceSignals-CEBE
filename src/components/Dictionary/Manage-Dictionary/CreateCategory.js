import axios from 'axios'
import { NavLink } from 'react-router-dom'
import React from 'react'
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
  // const navigate = useNavigate()

  return (
    <div className='container-add-sign-language'>

      {/* Icon Close */}
      <div className='container-close'>
        <NavLink
          to={'/manage-dictionary'}>
            <AiOutlineClose className='icon-close'/>
        </NavLink>
      </div>

      {/* Category */}
      <Card >
        <Card.Header as="h1" className="text-center element-data-title">Registrar Categoría</Card.Header>
        <Card.Body className='container-add-body'>

          <Formik
            initialValues={{ type: '', vigente: 1, urlImage: '' }}
            validate={values => {
              const errors = {};

              //validate type
              if (!values.type) {
                errors.type = 'Debe ingresar el título';
              }
              else if (values.type.length > 40) {
                errors.type = 'La categoría es muy larga';
              }
              else if (
                !/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(values.type)
              ) {
                errors.type = 'No se admiten números y caracteres especiales';
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
              axios.post(process.env.REACT_APP_DATABASE_URL + '/api/category-add', {
                Type: values.type, UrlImage: values.urlImage, Vigente: values.vigente
              })

              setSubmitting(false);


              //Alert
              swal({
                title: "Categoría Registrada",
                icon: "success",
              })
              values.type = '';
              values.vigente = 1;
              values.urlImage = '';
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
                    <FloatingLabel controlId="floatingInputCustom1" label="Tipo" className="mb-3">
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Título"
                        name="type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.type}
                        isInvalid={errors.type && touched.type && errors.type}
                      />
                    <Form.Control.Feedback type="invalid">
                        {errors.type}
                    </Form.Control.Feedback>

                    </FloatingLabel>                  
                  </ Col>

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

                <Row className="g-2 container-second">
                  <FloatingLabel controlId="floatingInputCustom2" label="UrlImage" className="mb-3">
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