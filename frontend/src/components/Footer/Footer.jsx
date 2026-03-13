import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo2} alt="" className="footer-logo"/>
                <p>Bringing your favorite flavors straight to your doorstep — fast, fresh, and hassle-free.</p>
                <div className="footer-social-icons">
                    <img src={assets.insta_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <a href="/"><li>Home</li></a>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    
                    <li>aryagupta5002@gmail.com</li>
                </ul>
            </div>
           
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2026 &copy; Foodify - Aryan Yadav - All Right Reserved.
        </p>
    </div>
  )
}

export default Footer