import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return <button onClick={() => logout()} className='button-logout'>
    <FiLogOut />  Cerrar Sesión
    </button>
}

export default LogoutButton;