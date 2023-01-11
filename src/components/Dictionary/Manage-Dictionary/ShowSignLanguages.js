import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, useLocation } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ReactPaginate from "react-paginate";
import { useLocalStorage } from '../../../components/useLocalStorage';
import { IoIosEye } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
import LazyLoad from 'react-lazy-load';

import '../../../Styles/ManageSignLanguages.css'


export default function ShowSignLanguages() {
  const [signlanguages, setSignLanguages] = useState([]);
  const [diccionaries, setDictionaries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [codeDictionary, setCodeDictionary] = useState(1)
  const [codeCategory, setCodeCategory] = useState(1)

  //Select Imagen
  const [imageSelct, setImageSelct] = useState('')
  const [nameImageSelct, setNameImageSelct] = useState('')


  //Filter
  const [dataDictionaryStorage, setDataDictionaryStorage] = useLocalStorage('dictionary', 0)
  const [dataCategoryStorage, setDataCategoryStorage] = useLocalStorage('category', 0)
  const location = useLocation();



  //Name Dictionary - Category
  const [nameCountryDictionary, setNameCountryDictionary] = useState('')
  const [nameTypeCategory, setNameTypeCategory] = useState('')



  //Paginate
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;

  //Paginate
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % signlanguages.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(signlanguages.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(signlanguages.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, signlanguages]);


  useEffect(() => {
    getAllDictionaries();
    if (dataDictionaryStorage === 0) {
      getAllSignLanguagesForCategory(1, 1);
      getAllCategories(1)
    } else {
      setCodeDictionary(dataDictionaryStorage)
      getAllCategories(dataDictionaryStorage)
      getAllSignLanguagesForCategory(dataDictionaryStorage, dataCategoryStorage)

      CountryDictionary(dataDictionaryStorage)
      TypeCategory(dataCategoryStorage)

    }

    if (dataCategoryStorage !== 0) {
      setCodeCategory(dataCategoryStorage)
    }
  }, [dataDictionaryStorage, dataCategoryStorage])


  const getAllSignLanguagesForCategory = async (codeDictionary, codeCategory) => {
    const response = await axios.get(process.env.REACT_APP_DATABASE_URL + `/api/sign-language-manage-category/${codeDictionary}/${codeCategory}`)
    setSignLanguages(response.data)
  }

  const StateVigente = (vigente) => {
    if (vigente === 1) {
      return true
    } else {
      return false;
    }
  }

  const UpdateVigenteSignLanguage = async (code, value) => {
    await axios.put(process.env.REACT_APP_DATABASE_URL + `/api/sign-language-update-vigente/${code}`, {
      Vigente: value
    })
    if (dataDictionaryStorage === 0) {
      getAllSignLanguagesForCategory(1, 1);
    } else {
      getAllSignLanguagesForCategory(dataDictionaryStorage, dataCategoryStorage)
    }
  }

  const getAllDictionaries = async () => {
    const response = await axios.get(process.env.REACT_APP_DATABASE_URL + '/api/dictionaries-vigentes')
    setDictionaries(response.data)
  }

  const getAllCategories = async (code) => {
    const response = await axios.get(process.env.REACT_APP_DATABASE_URL + `/api/sign-language-categories/${code}`)
    setCategories(response.data)
  }


  // Name Country - Category
  const CountryDictionary = async (code) => {
    const response = await axios.get(process.env.REACT_APP_DATABASE_URL + `/api/dictionary-code/${code}`)
    setNameCountryDictionary(response.data.Country)
  }

  const TypeCategory = async (code) => {
    const response = await axios.get(process.env.REACT_APP_DATABASE_URL + `/api/category-code/${code}`)
    setNameTypeCategory(response.data.Type)
  }


  function filter() {
    if (codeDictionary !== 0 && codeCategory !== 0) {
      getAllSignLanguagesForCategory(codeDictionary, codeCategory);
      setNameImageSelct('')
      setImageSelct('')

      setItemOffset(0);//Page 1

      setDataDictionaryStorage(codeDictionary)
      setDataCategoryStorage(codeCategory)

      //Name Country - Category
      CountryDictionary(dataDictionaryStorage)
      TypeCategory(codeCategory)

    } else {
      console.log('filter error')
    }
  }

  function deleteFilter() {
    if (codeDictionary !== 0 && codeCategory !== 0) {
      getAllSignLanguagesForCategory(codeDictionary, codeCategory);

      setNameImageSelct('')
      setImageSelct('')

      setDataDictionaryStorage(0);
      setCodeDictionary(1);

      setDataCategoryStorage(0);
      setCodeCategory(1);
    } else {
      console.log('delete filter error')
    }
  }


  //Local Storage (se elimino el setDataLogin)
  const [dataLogin] = useLocalStorage('loginData', [])

  //User Admin
  const [userAdminister, setUserAdminister] = useState([]);

  //User Adin
  const Admin = async (name, email) => {
    const response = await axios.get(process.env.REACT_APP_DATABASE_URL + `/api/user-admin/${name}/${email}`)
    setUserAdminister(response.data)
    // handleClose()
  }

  useEffect(() => {
    if (dataLogin !== null){
      Admin(dataLogin.name, dataLogin.email)
    // console.log(userAdminister)
    }
  }, [dataLogin,setUserAdminister /*,userAdminister*/])


  return (
    <div>
      {
        userAdminister.length !== 0 ? (
          <div className='container-sign-language'>

            <Card className='container-cad-senias'>

              <Card.Header as="h1" className="text-center title-manage-sign-language">Gestionar Diccionario</Card.Header>

              <Card.Body>

                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className='acordion-header-title'>Filtros</Accordion.Header>
                    <Accordion.Body>

                      <Row className="g-2 container-second">
                        <Col sm>
                          <Form.Group controlId="formGridState">
                            <Form.Label className='element-data-title'>Diccionario</Form.Label>
                            <Form.Select
                              className='element-data'
                              value={codeDictionary}
                              onChange={(e) => {
                                setCodeDictionary(e.target.value);
                                getAllCategories(e.target.value)
                              }
                              }
                            >
                              <option value="DEFAULT" disabled>Seleccione una Opción</option>
                              {
                                diccionaries.map((dictionaryMap) => (
                                  <option
                                    key={dictionaryMap.Code}
                                    value={dictionaryMap.Code}
                                  >
                                    {dictionaryMap.Country}
                                  </option>
                                ))
                              }
                            </Form.Select>
                          </Form.Group>

                        </Col>

                        <Col sm>
                          <Form.Group controlId="formGridState">
                            <Form.Label className='element-data-title'>Categoría</Form.Label>
                            <Form.Select
                              className='element-data'
                              value={codeCategory}
                              onChange={(e) => setCodeCategory(e.target.value)}
                            >
                              <option value="DEFAULT" disabled>Seleccione una Opción</option>
                              {
                                categories.map((categoryMap) => (
                                  <option
                                    key={categoryMap.CodeCategory}
                                    value={categoryMap.CodeCategory}
                                  >
                                    {categoryMap.Type}
                                  </option>
                                ))
                              }
                            </Form.Select>
                          </Form.Group>

                        </Col>
                      </Row>

                      <div className='container-option-filter'>
                        <Button variant="primary" className='apply-filter' onClick={filter}>Aplicar Filtro</Button>
                        <Button variant="danger" className='delete-filter' onClick={deleteFilter}>Eliminar Filtro</Button>
                      </div>

                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header className='acordion-header-title'>Agregar</Accordion.Header>
                    <Accordion.Body className='container-body-option-add'>

                      <Row className="g-1 container-second">
                        <Col md>
                          {/* <NavLink
                      to={'create-dictionary'} className='btn btn-primary'>
                        Diccionario
                    </NavLink> */}
                        </Col>
                        <Col md>
                          <NavLink to={'create-category'} className='btn btn-primary'>
                            Categoría
                          </NavLink>
                        </Col>
                        <Col md>
                          <NavLink to={'create-sign-language'} className='btn btn-primary'>
                            Lenguaje de Seña
                          </NavLink>
                        </Col>
                      </Row>

                    </Accordion.Body>
                  </Accordion.Item>

                  {
                    nameImageSelct !== '' &&
                    <Accordion.Item eventKey="2">
                      <Accordion.Header className='acordion-header-title'>Imagen - {nameImageSelct}</Accordion.Header>
                      <Accordion.Body className='container-body-option-add'>

                        <Row className="g-1 container-second">

                          <LazyLoad width={135} height={135} once fallback={<h1>Cargando</h1>}>
                            <Card.Img
                              className='imageSignLanguage'
                              variant="top"
                              src={'https://drive.google.com/uc?export=download&id=' +
                                imageSelct}
                              alt={nameImageSelct}
                            />
                          </LazyLoad>

                        </Row>

                      </Accordion.Body>
                    </Accordion.Item>
                  }

                </Accordion>

                {
                  dataDictionaryStorage !== 0 && categories.length !== 0 &&
                  <div className='result-filter'>
                    <h4><b>Resultados:</b></h4>
                    <h5><b>Diccionario: </b>{nameCountryDictionary}</h5>
                    <h5><b>Categoría: </b>{nameTypeCategory}</h5>
                  </div>
                }

                <Table striped bordered hover responsive='xl' className='table-sign'>
                  <thead className='table-dark'>
                    <tr className='table-senia-tr'>
                      <th>#</th>
                      <th>Título</th>
                      <th>Imagen</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody className='table-senia-tbody'>
                    {
                      currentItems
                        .map((signlanguageMap, index) => (
                          <tr key={signlanguageMap.Code}
                            className={StateVigente(signlanguageMap.Vigente) ? 'vigente' : 'no-vigente'}
                          >
                            <td> {index + 1 + itemOffset} </td>
                            <td> {signlanguageMap.Title} </td>
                            <td>
                              <div className='container-img'>
                                <OverlayTrigger
                                  placement={'top'}
                                  overlay={
                                    <Tooltip id={'tooltip-top'}>
                                      <strong>Ver Imagen</strong>
                                    </Tooltip>
                                  }
                                >
                                  <Button
                                    className='view-img'
                                    onClick={() => {
                                      setNameImageSelct(signlanguageMap.Title);
                                      setImageSelct(signlanguageMap.UrlImage);
                                    }}
                                  >
                                    Ver
                                    <IoIosEye />
                                  </Button>
                                </OverlayTrigger>
                              </div>
                            </td>
                            <td>
                              <div className='contanier-options'>

                                <OverlayTrigger
                                  placement={'top'}
                                  overlay={
                                    <Tooltip id={'tooltip-top'}>
                                      <strong>Editar</strong>
                                    </Tooltip>
                                  }
                                >
                                  <NavLink to={signlanguageMap.Code + location.search}
                                    className='btn btn-warning btn-edit'
                                  >
                                    <BsPencilSquare />
                                  </NavLink>
                                </OverlayTrigger>

                                <OverlayTrigger
                                  placement={'top'}
                                  overlay={
                                    <Tooltip id={'tooltip-top'}>
                                      {signlanguageMap.Vigente === 0 ?
                                        <strong>Dar de Alta</strong>
                                        :
                                        <strong>Dar de Baja</strong>
                                      }
                                    </Tooltip>
                                  }
                                >
                                  <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    defaultChecked={signlanguageMap.Vigente === 0 ? false : true}
                                    onClick={() => {
                                      signlanguageMap.Vigente === 0 ?
                                        UpdateVigenteSignLanguage(signlanguageMap.Code, 1)
                                        :
                                        UpdateVigenteSignLanguage(signlanguageMap.Code, 0)
                                    }}
                                  />
                                </OverlayTrigger>

                              </div>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </Table>

                <ReactPaginate
                  nextLabel="Next >"
                  pageRangeDisplayed={10}
                  onPageChange={handlePageClick}
                  breakLabel="..."
                  pageCount={pageCount}
                  renderOnZeroPageCount={null}
                  previousLabel="< Prev"
                  containerClassName={"pagination"}
                  pageLinkClassName="page-num"
                  previousLinkClassName={"page-num"}
                  nextLinkClassName={"page-num"}
                  activeClassName={"active"}
                  disabledClassName={"paginationDisabled"}
                />

              </Card.Body>

            </Card>

          </div>
        )
          :
          // window.location.replace(window.location.origin + '/home')
          // console.log('sin acceso')
          ''
      }
    </div>
  )
}