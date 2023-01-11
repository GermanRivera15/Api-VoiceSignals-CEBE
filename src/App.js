import AppRouter from './router/AppRouter'
import './Styles/App.css'

/*
import React, { useEffect} from 'react'

import { useLocalStorage } from './components/useLocalStorage';
import { useAuth0 } from "@auth0/auth0-react";
*/

function App() {

  
  // const [dataLogin, setDataLogin] = useLocalStorage('loginData', [])
  // const { user, isAuthenticated } = useAuth0();


  // useEffect(() => {
  //   //  console.log(user)
  //   if(user!==undefined){
  //     setDataLogin(user)
  //   }else{
  //     setDataLogin(null)
  //   }
  
  //   // ShowUser(dataLogin.name,dataLogin.email)
  //   // console.log(loginCorrect)
  //   }, [user,setDataLogin /*,dataLogin.name,dataLogin.email,loginCorrect*/])



  return (
    <div className='App'>
      <AppRouter />
    </div>
  );
}

export default App;
