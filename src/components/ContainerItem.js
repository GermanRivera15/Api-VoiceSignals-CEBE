import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import LazyLoad from 'react-lazy-load';
import Card from 'react-bootstrap/Card';
import Aos from 'aos';
import 'aos/dist/aos.css'
import '../Styles/Dictionary.css';

import { BsStar } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";


export default class ContainerItem extends Component {
  componentDidMount = () => {
    Aos.init();
  }

  render() {
    return (
      <Card className='card-img-sign' data-aos="zoom-in-up">

        {
          this.props.estado ? (
            <div>
              <div className='container-icon-star'>

                {this.props.star ?
                  <BsStar
                    onClick={() => { this.props.starFavorite() }}
                    className='star-favorite'
                  />
                  :
                  <AiFillStar
                    onClick={() => { this.props.starFavorite() }}
                    className='star-favorite'
                  />
                }
              </div>

              <NavLink
                to={this.props.CodeReference}>

                <LazyLoad width={110} height={110} once >
                  <Card.Img
                    className='imageSignLanguage'
                    variant="top"
                    src={'https://drive.google.com/uc?export=download&id=' + this.props.UrlImage}
                    alt={this.props.Title}
                  />
                </LazyLoad>
                <Card.Body className='card-body-sign'>
                  <Card.Title>
                    {this.props.Title}
                  </Card.Title>
                </Card.Body>

              </NavLink>
            </div>

          ) :
            <div>
              <LazyLoad width={110} height={110} once >
                <Card.Img className='imageSignLanguage' variant="top" src={'https://drive.google.com/uc?export=download&id=' + this.props.UrlImage} alt={this.props.Title} />
              </LazyLoad>
              <Card.Body className='card-body-sign'>
                <Card.Title>{this.props.Title}</Card.Title>
              </Card.Body>
            </div>
        }

      </Card>
    )
  }
}