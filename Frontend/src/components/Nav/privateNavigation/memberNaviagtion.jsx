import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../Navigation.scss';
import logoImage from '../../../image/logo1.png';
import { AuthContext } from '../../../context/authContext';

const MemberNavigation = () => {
  const [scrolling, setScrolling] = useState(false);
  const {currentUser,logout} = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  return (
    <div>
      <div className={`header ${scrolling ? 'scrolled' : ''}`}>
        <a className="logo" href="/post">
          <img src={logoImage} alt="Logo" />
          
        </a>
        <div className='qoute'> Shaken not Stirred</div>
        <div className='nameuser'>Welcome {currentUser.username} <img className='user-avatar' src={currentUser.image}></img></div>
        <nav> 
          <Link to="/post">Post</Link>
          <Link to="/wine">Wine</Link>
          <Link to="/cocktail">Cocktail</Link>
          <Link to="/profile">Profile</Link>
          {(currentUser)?<Link to="#" onClick={logout} >Logout</Link> : <Link to="/login">Login</Link>}        
        </nav>
      </div>
    </div>
  );
};

export default MemberNavigation;
