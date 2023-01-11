import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLogIn } from "react-icons/fi";

import '../Styles/Login.css'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>

      {
        props.estadoTooltip ?
        <OverlayTrigger
        placement={'bottom'}
        overlay={
          <Tooltip id={'tooltip-bottom'}>
            <strong>Iniciar Sesión</strong>
          </Tooltip>
        }
      >

        <button onClick={() => loginWithRedirect()} className='button-login'><FiLogIn className='icon-login' />
          {props.estado ? '   Acceder' : ''}
        </button>

      </OverlayTrigger>
      :
      <button onClick={() => loginWithRedirect()} className='button-login'><FiLogIn className='icon-login' />
          {props.estado ? '   Acceder' : ''}
        </button>
      }

    </div>
  );
};

export default LoginButton;