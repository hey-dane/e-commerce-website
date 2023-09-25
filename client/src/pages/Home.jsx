export default function Home() {
  return (
    <Carousel controls={true} aria-label="Homepage Carousel">
      <Carousel.Item>
        <div className="carousel-content d-flex justify-content-center align-items-center">
          <img
            className="carousel-image"
            src="./src/images/jennifer-marquez-QFptmSDb6f8-unsplashb.jpg"
            alt="First slide"
            aria-label="Carousel Image 1"
          />
          <div className="carousel-text text-center d-flex align-items-center justify-content-center min-vh-50">
            <section className="bg-image text-white">
              <div className="container">
                <hr className="border-4 border-white mb-4" />
                <h4
                  className="fs-2 text-uppercase"
                  style={{
                    fontFamily: "var(--font-lato)",
                    color: "var(--color-accent)",
                    fontSize: "1.5em" /* Adjust font size for mobile */,
                  }}
                >
                  50% off all
                </h4>
                <h1
                  className="display-3 text-uppercase"
                  style={{
                    fontFamily: "var(--font-lato)",
                    color: "var(--color-accent)",
                    fontSize: "2.5em" /* Adjust font size for mobile */,
                  }}
                >
                  Accessories
                </h1>
                <h4
                  className="fs-2 text-uppercase"
                  style={{
                    fontFamily: "var(--font-lato)",
                    color: "var(--color-accent)",
                    fontSize: "1.5em" /* Adjust font size for mobile */,
                  }}
                >
                  first friday sale
                </h4>
                <hr className="border-4 border-white mb-4" />
              </div>
            </section>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-content">
          <img
            className="carousel-image"
            src="./src/images/behrouz-sasani-6OGml3UomZw-unsplash.jpg"
            alt="Second slide"
            aria-label="Carousel Image 2"
          />
          <div className="carousel-text py-5 my-auto">
            <section className="container">
              <div className="row">
                <div className="col-md-6 col-12 mx-auto text-end">
                  <div className="container">
                    <h3
                      className="fw-light text-uppercase"
                      style={{
                        fontFamily: "var(--font-kanit)",
                        fontSize: "2em",
                      }}
                      aria-label="Last Chance Heading"
                    >
                      last chance
                    </h3>
                    <h1
                      className="display-1 fw-bold text-uppercase"
                      style={{
                        fontFamily: "var(--font-kanit)",
                        fontSize: "4em",
                      }}
                      aria-label="Discount Percentage"
                    >
                      70%
                    </h1>
                    <h2
                      className="fw-bold text-uppercase"
                      style={{
                        fontFamily: "var(--font-kanit)",
                        fontSize: "2.5em",
                      }}
                      aria-label="Discounted Items Heading"
                    >
                      off all
                    </h2>
                    <p
                      className="fw-light text-uppercase"
                      style={{
                        fontFamily: "var(--font-kanit)",
                        fontSize: "1.5em",
                      }}
                      aria-label="Sale Description"
                    >
                      Summer styles on sale! Basic for less! Fabulous Fashion!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
