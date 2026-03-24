import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const Mcarousel = () => {
return (
<div className="container mt-4">
    <div className="row">
    <div className="col-md-10 mx-auto">
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
    
    {/* Indicators */}
    <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
    </div>

    {/* Slides */}
    <div className="carousel-inner">

        <div className="carousel-item active">
        <img
            src="img/jew4.jpg"
            className="d-block w-100"
            alt="First slide"
            height="450px"
        />
        <div className="carousel-caption d-none d-md-block bg-dark opacity-50">
            <b className='cap'>L'atelier Luxe Lustrous Silk</b>
            <div style={{ width: '50px', height: '5px', background: '#c5a059', margin: '0 auto' }}></div>
            <p className='capdet'>Crafted with fluid elegance, this piece features a singular, high-luster pearl suspended from a 18K gold 'silk-link' chain. Designed to catch the light at every angle, the minimalist silhouette offers a seamless transition from day to evening wear. A true staple for the modern curator of luxury.</p>
        </div>
        </div>

        <div className="carousel-item">
        <img
            src="img/jew2.jpg"
            className="d-block w-100"
            alt="Second slide"
            height="450px"
        />
        <div className="carousel-caption d-none d-md-block bg-dark opacity-50">
            <b className='cap'>"Starlight Pavé" Domed Ring</b>
            <div style={{ width: '50px', height: '5px', background: '#c5a059', margin: '0 auto' }}></div>
            <p className='capdet'>A true testament to artisanal brilliance, this statement piece features a meticulously crafted domed silhouette completely encrusted with a breathtaking "starlight" pavé setting. Designed for the bold and the sophisticated, it offers a multi-dimensional sparkle that catches the light from every possible angle.</p>
        </div>
        </div>

        <div className="carousel-item">
        <img
            src="img/jew3.jpg"
            className="d-block w-100"
            alt="Third slide"
            height="450px"
        />
        <div className="carousel-caption d-none d-md-block bg-dark opacity-50">
            <b className='cap'>"Twisted Pearl" Wrap Ring</b>
            <div style={{ width: '50px', height: '5px', background: '#c5a059', margin: '0 auto' }}></div>
            <p className='capdet'>A modern interpretation of classic elegance, this delicate statement ring features two slender gold bands that gracefully overlap in a wrap-around design. Each band is studded with a constellation of natural, high-luster freshwater pearls, creating a soft, organic texture that is both sophisticated and effortless.</p>
        </div>
        </div>

    </div>

    {/* Controls */}
    <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
    >
        <span className="carousel-control-prev-icon"></span>
    </button>

    <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
    >
        <span className="carousel-control-next-icon"></span>
    </button>

    </div>
    </div>
    </div>
</div>
)
}

export default Mcarousel;