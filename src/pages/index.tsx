import React from 'react';
import { Helmet } from 'react-helmet';

const IndexPage = () => {
  return (
    <main className="homepage container-fluid vh-100">
      <Helmet>
        <title>STUDIO GANIMED Architects</title>
      </Helmet>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-9 col-xl-5">
          <div className="p-5 shadow text-center bg-white mt-4">
            <img src="/img/logo.png" className="img-fluid px-0 px-md-10 mb-4" alt="STUDIO GANIMED Logo" />
            <h1 className="h3">STUDIO GANIMED Architects</h1>
            <p className="lead">This website is under construction</p>

            <p>
              <a href="mailto:info@ganimed.bg">info@ganimed.bg</a> | <a href="tel:+359878601027">+359 878 601 027</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
