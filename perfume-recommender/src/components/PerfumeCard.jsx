import React, { useState } from 'react';
import { items } from '../constants/baseData.json';

export default function PerfumeCard({ perfume }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (!perfume.description) {
    let rand = Math.random() * items.length;
    perfume.description = items[Math.floor(rand)].description;
    perfume.price = items[Math.floor(rand) % 10].price;
  }

  return (
    <>
      {/* Perfume Card */}
      <div
        className="card border-0 shadow-sm rounded-3 my-4"
        style={{ maxWidth: '18rem', cursor: 'pointer' }}
        onClick={handleShowModal}
      >
        <img
          src={perfume.image_url}
          alt={perfume.brand}
          className="card-img-top rounded-3"
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title text-1000 fw-bold">{perfume.brand}</h5>
          <p className="card-text text-muted">
            {perfume.description.length > 50 ? `${perfume.description.slice(0, 50)}...` : perfume.description}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-primary fs-1 fw-semibold">${perfume.price}</span>
            <button className="btn btn-outline-primary btn-sm px-2">Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block mt-4" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" style={{ color: '#000' }}>
                  {perfume.brand}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="d-flex align-items-center justify-content-between">
                  <img
                    src={perfume.imageUrl}
                    alt={perfume.brand}
                    className="img-fluid rounded mb-3"
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                  <p>{perfume.description}</p>
                </div>
                <p className="text-primary fs-1 fw-semibold" style={{ marginLeft: '4rem' }}>
                  ${perfume.price}
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}