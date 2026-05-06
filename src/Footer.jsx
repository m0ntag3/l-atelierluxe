import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
return (
<footer className="bg-dark text-light pt-5 pb-4 mt-5" id="footer" style={{ borderTop: '1px solid #c5a059' }}>
    <div className="container text-center text-md-left">
    <div className="row text-center text-md-left">

        {/* Brand/About Section */}
        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
        <h5 className="text-uppercase mb-4 font-weight-bold text-gold" style={{ color: '#c5a059' }}>
            L'Atelier Luxe
        </h5>
        <p className="small" id='details'>
            L’Atelier Luxe represents the pinnacle of bespoke craftsmanship since 2026, where the heritage of traditional artistry meets the bold vision of contemporary refinement. Functioning as a sanctuary for those who seek the extraordinary, L’Atelier Luxe prides itself on a meticulous attention to detail that transforms raw, premium materials into timeless masterpieces. 
        </p>
        </div>

        {/* Quick Links */}
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
        <h6 className="text-uppercase mb-4 font-weight-bold text-warning">Collections</h6>
        <p><Link to="/" className="text-light text-decoration-none small">All Products</Link></p>
        </div>

        {/* Contact Info */}
        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
        <h6 className="text-uppercase mb-4 fw-bold text-warning">Contact</h6>
        <p className="small"><i className="fas fa-home me-2"></i> Nairobi, KE</p>
        <p className="small"><i className="fas fa-envelope me-2"></i> kuminacollins@gmail.com</p>
        <p className="small"><i className="fas fa-phone me-2"></i> +254 118 140 401</p>
        </div>

        {/* Social Media Links */}
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
        <h6 className="text-uppercase mb-4 fw-bold text-warning">Follow Us</h6>
        <div className="d-flex justify-content-center justify-content-md-start gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img className='icons social-img' src="/img/ig.png" alt="Instagram" />
            </a>
            <p>@m0ntag3e</p>
            <a href="https://x.com" target="_blank" rel="noreferrer">
            <img className='icons social-img' src="/img/x.png" alt="X (Twitter)" />
            </a>
        </div>
        </div>

    </div>

    <hr className="mb-4" style={{ backgroundColor: '#daa84b', opacity: '0.5' }} />

    <div className="row align-items-center">
        <div className="col-md-7 col-lg-8 text-center text-md-start">
        <p className="small">
            © {new Date().getFullYear()} All Rights Reserved: 
            <strong style={{ color: '#c5a059' }}> L'Atelier Luxe Workshop</strong>
        </p>
        </div>
        <div className="col-md-5 col-lg-4 text-center text-md-end">
        <span className="small text-uppercase fw-lighter" style={{ letterSpacing: '3px' }}>Excellence in Craft</span>
        </div>
    </div>
    </div>
</footer>
);
};

export default Footer;