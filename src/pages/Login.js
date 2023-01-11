import '../Styles/Login.css'

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';


export default function Login() {

  const { user,isAuthenticated } = useAuth0();
  console.log(user);

  // const [loginData, setLoginData] = useState(
  //   localStorage.getItem('loginData')
  //     ? JSON.parse(localStorage.getItem('loginData'))
  //     : null
  // );

  // const handleFailure = (result) => {
  //   console.log(result);
  // };

  // const handleLogin = async (googleData) => {
  //   const res = await fetch('/api/google-login', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       token: googleData.tokenId,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   const data = await res.json();
  //   setLoginData(data);
  //   localStorage.setItem('loginData', JSON.stringify(data));
  // };
  // const handleLogout = () => {
  //   localStorage.removeItem('loginData');
  //   setLoginData(null);
  // };

  return (
    <div className="App">

      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      {
        isAuthenticated && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        )
      }


    </div>
  );

}
