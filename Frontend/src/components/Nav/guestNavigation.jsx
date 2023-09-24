import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';
import logoImage from '../../image/logo1.png';


const GuestNavigation = () => {
  const [scrolling, setScrolling] = useState(false);

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
        <nav>
          <Link to="/post">Post</Link>
          <Link to="/wine">Wine</Link>
          <Link to="/cocktail">Cocktail</Link>
           <Link to="/login">Login</Link>      
        </nav>
      </div>
    </div>
  );
};

export default GuestNavigation;
