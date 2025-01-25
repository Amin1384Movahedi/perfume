import React, { useState, useEffect } from 'react';
import PerfumeCard from './PerfumeCard';
import { items } from '../constants/baseData.json';
import axios from 'axios';

export default function ListPerfumes() {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perfumesPerPage = 10; // Number of perfumes per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/items');
        setPerfumes(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (perfumes !== null)
    if (perfumes.length > 0) {
      let j = 0;
      for (let i = 0; i < perfumes.length; i++) {
        if (!perfumes[i].description) {
          perfumes[i].description = items[j % 100].description;
          perfumes[i].price = items[j % 10].price;
          ++j;
        }
      }
    }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calculate the index of the first and last perfumes on the current page
  const indexOfLastPerfume = currentPage * perfumesPerPage;
  const indexOfFirstPerfume = indexOfLastPerfume - perfumesPerPage;
  const currentPerfumes = perfumes.slice(indexOfFirstPerfume, indexOfLastPerfume);

  const totalPages = Math.ceil(perfumes.length / perfumesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generatePageNumbers = () => {
    const pages = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-7 mx-auto text-center mt-7 mb-5">
          <h5 className="fw-bold fs-3 fs-lg-5 lh-sm" id="collection">
            Our Best Perfumes
          </h5>
        </div>
        <div className="col-12">
          <div className="row align-items-center g-2">
            {currentPerfumes.map((perfume) => (
              <div className="col-sm-6 col-md-3 mb-3 mb-md-0 h-100" key={perfume.id}>
                <PerfumeCard perfume={perfume} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center mt-4">
          {pageNumbers.map((number, index) =>
            number === '...' ? (
              <li key={index} className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            ) : (
              <li
                key={number + 3 * index}
                className={`page-item ${number === currentPage ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                <span className="page-link" onClick={() => paginate(number)}>
                  {number}
                </span>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
}
