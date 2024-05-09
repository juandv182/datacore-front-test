import React, {useContext} from 'react'
import GoogleLoginButton from './GoogleLoginButton'
import UserContext from '../context/UserContext'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Header = () => {
  const { userInfo } = useContext(UserContext);
  const location = useLocation();

  return (
    <div>
      {!userInfo.access_token && location.pathname !== '/error' && (
        <GoogleLoginButton />
      )}
    </div>
  );
};

export default Header;