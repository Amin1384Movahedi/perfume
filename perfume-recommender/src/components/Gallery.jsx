import React from 'react';

export default function Gallery() {
  return (
    <section className="py-0" id="outlet">
      <div className="container">
        <div className="row h-100 g-0">
          <div className="col-md-6">
            <div className="card card-span h-100 text-white">
              <img className="card-img h-100" src="src/assets/img/gallery/summer.png" alt="Fragrances of '24" />
              <div className="card-img-overlay bg-dark-gradient rounded-0">
                <div className="p-5 p-md-2 p-xl-5 d-flex flex-column flex-end-center align-items-baseline h-100">
                  <h1 className="fs-md-4 fs-lg-7 text-light">Fragrances of '24</h1>
                </div>
              </div>
              <a className="stretched-link" href="#!" />
            </div>
          </div>
          <div className="col-md-6 h-100">
            <div className="row h-100 g-0">
              <div className="col-md-6 h-100">
                <div className="card card-span h-100 text-white">
                  <img className="card-img h-100" src="src/assets/img/gallery/sunglasses.png" alt="Perfumed Shower Gel" />
                  <div className="card-img-overlay bg-dark-gradient rounded-0">
                    <div className="p-5 p-xl-5 p-md-0">
                      <h3 className="text-light">Perfumed Shower Gel</h3>
                    </div>
                  </div>
                  <a className="stretched-link" href="#!" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="card card-span h-100 text-white">
                  <img className="card-img h-100" src="src/assets/img/gallery/office.jpg" alt="Office Spaces" />
                  <div className="card-img-overlay bg-dark-gradient rounded-0">
                    <div className="p-5 p-xl-5 p-md-0">
                      <h3 className="text-light">Office Spaces</h3>
                    </div>
                  </div>
                  <a className="stretched-link" href="#!" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="card card-span h-100 text-white">
                  <img className="card-img h-100" src="src/assets/img/gallery/gym.png" alt="Gym Sessions" />
                  <div className="card-img-overlay bg-dark-gradient rounded-0">
                    <div className="p-5 p-xl-5 p-md-0">
                      <h3 className="text-light">Gym Sessions</h3>
                    </div>
                  </div>
                  <a className="stretched-link" href="#!" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="card card-span h-100 text-white">
                  <img className="card-img h-100" src="src/assets/img/gallery/social.jpg" alt="Social Gatherings" />
                  <div className="card-img-overlay bg-dark-gradient rounded-0">
                    <div className="p-5 p-xl-5 p-md-0">
                      <h3 className="text-light">Social Gatherings</h3>
                    </div>
                  </div>
                  <a className="stretched-link" href="#!" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
