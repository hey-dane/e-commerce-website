import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function Home() {
  return (
    <Carousel controls={true}>
      <Carousel.Item>
        <div className="carousel-content">
          <img
            className="carousel-image"
            src="./src/images/jennifer-marquez-QFptmSDb6f8-unsplashb.jpg"
            alt="First slide"
          />
          <div className="carousel-text">
            <h3>
              BUY ONE,
              <p>GET ONE</p>
            </h3>
            <p>50% OFF! FULL PRICED SKIRTS.</p>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-content">
          <img
            className="carousel-image"
            src="./src/images/behrouz-sasani-6OGml3UomZw-unsplash.jpg"
            alt="Second slide"
          />
          <div className="carousel-text">
            <h3>Second Slide</h3>
            <p>This is the second slide of the carousel with content below.</p>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
