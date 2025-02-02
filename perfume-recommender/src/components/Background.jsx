import React from 'react';

export default function Background() {
  return (
    <section className="py-11 bg-light-gradient border-bottom border-white border-5">
      <div
        className="bg-holder overlay overlay-light"
        style={{
          backgroundImage: 'url(src/assets/img/gallery/header-bg.png)',
          backgroundSize: 'cover',
        }}
      ></div>

      <div className="container">
        <div className="row flex-center">
          <div className="col-12 mb-10">
            <div className="d-flex align-items-center flex-column">
              <h1 className="fw-normal mb-1" style={{ fontSize: '5rem' }}>ESSENZA</h1>
              <h1 className="fw-normal">An exclusive scent</h1>
              <h1 className="fs-4 fs-lg-8 fs-md-6 fw-bold">Designed for you</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
