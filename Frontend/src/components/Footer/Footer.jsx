import React from 'react';
import './Footer.scss';
import 'font-awesome/css/font-awesome.min.css';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <p>&copy; My Blog {new Date().getFullYear()}</p>
                    
                </div>
            </div>
        </footer>
    );
}

export default Footer;
