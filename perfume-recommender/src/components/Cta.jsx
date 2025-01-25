import React from 'react';
import { Link } from 'react-router';
import Background from './Background';

export default function Cta() {
  return (
    <section className="py-0" id="header" style={{ marginTop: '-23rem' }}>
      <div className="container">
        <div className="row g-0">
          <div className="col-md-6">
            <div className="card card-span h-100 text-white">
              <img className="img-fluid" src="src/assets/img/gallery/her.png" width="790" alt="For Her" />
              <div className="card-img-overlay d-flex flex-center">
                <Link className="btn btn-lg btn-light" to={'recommend'} style={{ borderRadius: "15px", backgroundColor: "#DDCFCC", boxShadow: "-4px 3px teal" }}>
                  For Her
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card card-span h-100 text-white">
              <img className="img-fluid" src="src/assets/img/gallery/cover2.jpg" width="790" alt="For Him" />
              <div className="card-img-overlay d-flex flex-center">
                <Link className="btn btn-lg btn-light" to={'recommend'} style={{ borderRadius: "15px", backgroundColor: "#F5F5F5", boxShadow: "4px 3px teal" }}>
                  For Him
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of .container */}
    </section>
  );
}
