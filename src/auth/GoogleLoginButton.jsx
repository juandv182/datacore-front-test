import GoogleButtom from 'react-google-button';
import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate} from 'react-router-dom';


const GoogleLoginButton = () => {

     //const [ windowWidth, setWindowWidth ] = useState(window.innerWidth) 

     const navigate = useNavigate() 
     const handleSuccess = (codeResponse)=>{
           const authorizationCode = codeResponse.code
           
           fetch("/user/login-with-google/",{
              method: "POST",
              headers: {
                "Content-Type":"application/json",

              },
              body: JSON.stringify({code: authorizationCode}),
           })
              .then((response)=> response.json())
              .then((data)=>{
                if(data.error){
                  navigate('/error');
                }
                else{
                  localStorage.setItem("access_token",data["access_token"])
                  localStorage.setItem("username", data["username"])
                  localStorage.setItem("first_name", data["first_name"]);
                  localStorage.setItem("last_name", data["last_name"]);
                  navigate('/welcome')
                  window.location.reload()
                }
              })
              .catch((error)=> {
                  console.error("Error exchanging authorization code:",error)
              })
     } 
     const login = useGoogleLogin({
        onSuccess: handleSuccess,
        flow: "auth-code"
      })  
//      useEffect(()=>{
//        const handleResize = () => setWindowWidth(window.innerWidth);
//        window.addEventListener('resize', handleResize);
//        return () => window.removeEventListener('resize', handleResize);
//      },[]);



  return (
    <div className='google-login-button-container'>
      <div className='button-container'>
        <GoogleButtom onClick={login} label="Continuar con Google"/>
        </div>
    </div>
  );
};

export default GoogleLoginButton