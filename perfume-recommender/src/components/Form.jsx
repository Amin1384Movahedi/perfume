import React, { useEffect, useState } from 'react';
import PerfumeCard from './PerfumeCard';
import axios from 'axios';

export default function Form() {
  // Initialize state for features
  const [features, setFeatures] = useState({
    feature_Longevity_Men: 0,
    feature_Longevity_Unisex: 0,
    feature_Longevity_Women: 0,
    feature_Occasion_Business: 0,
    feature_Occasion_Daily: 0,
    feature_Occasion_Evening: 0,
    feature_Occasion_Leisure: 0,
    feature_Occasion_Night_Out: 0,
    feature_Occasion_Sports: 0,
    feature_Season_Fall: 0,
    feature_Season_Spring: 0,
    feature_Season_Summer: 0,
    feature_Season_Winter: 0,
    feature_Type_Animalic: 0,
    feature_Type_Aquatic: 0,
    feature_Type_Chypre: 0,
    feature_Type_Citrus: 0,
    feature_Type_Creamy: 0,
    feature_Type_Earthy: 0,
    feature_Type_Floral: 0,
    feature_Type_Fougere: 0,
    feature_Type_Fresh: 0,
    feature_Type_Fruity: 0,
    feature_Type_Gourmand: 0,
    feature_Type_Green: 0,
    feature_Type_Leathery: 0,
    feature_Type_Oriental: 0,
    feature_Type_Powdery: 0,
    feature_Type_Resinous: 0,
    feature_Type_Smoky: 0,
    feature_Type_Spicy: 0,
    feature_Type_Sweet: 0,
    feature_Type_Synthetic: 0,
    feature_Type_Woody: 0,
  });

  // State for managing photo upload
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  // State to track current step in the form
  const [step, setStep] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Handle feature checkbox change
  const handleFeatureChange = (e) => {
    const { name, checked } = e.target;
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [name]: checked ? 1 : 0,
    }));
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      setFile(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Selected Features:', features);
    console.log('Uploaded Photo:', photo);

    const formData = new FormData();

    if (photo) formData.append('image', file);

    for (const key in features) {
      formData.append(key, features[key].toString());
    }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/update_features/', formData);
      setResult(response.data);
      setError(null);
    } catch (error) {
      console.error('Error submitting data:', error);
      setError(error.message || 'An error occurred while submitting data.');
      setResult(null);
    }

    handleNextStep();
  };

  // Handle the next step
  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  // Handle the previous step
  const handlePreviousStep = () => {
    setStep(1);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-7 mx-auto text-center mb-5">
          <h5 className="fw-bold fs-3 fs-lg-5 lh-sm" id="collection">
            Let's choose your perfume
          </h5>
        </div>
        {/* Step 1: Upload Photo */}
        {step === 1 && (
          <div className="col-lg-7 mx-auto">
            <div className="text-center mb-4">
              <h6>Upload a photo of your choice</h6>
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="form-control" />
              {photo && <img src={photo} alt="Uploaded preview" className="img-fluid mt-3" />}
            </div>
            <button type="button" className="btn btn-primary mt-3" onClick={handleNextStep} disabled={!photo}>
              Next Step
            </button>
          </div>
        )}
        {/* Step 2: Select Features */}
        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <div className="col-lg-7 mx-auto">
              <div className="text-center mb-4">
                <h6>Select Features for your perfume</h6>
              </div>

              {/* Longevity Group */}
              <div className="row mb-3">
                <div className="col-6 align-self-center justify-content-center">
                  <h6>Longevity</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Longevity_Men"
                      checked={features.feature_Longevity_Men === 1}
                      onChange={handleFeatureChange}
                      id="feature_Longevity_Men"
                    />
                    <label className="form-check-label" htmlFor="feature_Longevity_Men">
                      Men
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Longevity_Unisex"
                      checked={features.feature_Longevity_Unisex === 1}
                      onChange={handleFeatureChange}
                      id="feature_Longevity_Unisex"
                    />
                    <label className="form-check-label" htmlFor="feature_Longevity_Unisex">
                      Unisex
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Longevity_Women"
                      checked={features.feature_Longevity_Women === 1}
                      onChange={handleFeatureChange}
                      id="feature_Longevity_Women"
                    />
                    <label className="form-check-label" htmlFor="feature_Longevity_Women">
                      Women
                    </label>
                  </div>
                </div>

                {/* Occasion Group */}
                <div className="col-6">
                  <h6>Occasion</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Occasion_Business"
                      checked={features.feature_Occasion_Business === 1}
                      onChange={handleFeatureChange}
                      id="feature_Occasion_Business"
                    />
                    <label className="form-check-label" htmlFor="feature_Occasion_Business">
                      Business
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Occasion_Daily"
                      checked={features.feature_Occasion_Daily === 1}
                      onChange={handleFeatureChange}
                      id="feature_Occasion_Daily"
                    />
                    <label className="form-check-label" htmlFor="feature_Occasion_Daily">
                      Daily
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Occasion_Evening"
                      checked={features.feature_Occasion_Evening === 1}
                      onChange={handleFeatureChange}
                      id="feature_Occasion_Evening"
                    />
                    <label className="form-check-label" htmlFor="feature_Occasion_Evening">
                      Evening
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Occasion_Leisure"
                      checked={features.feature_Occasion_Leisure === 1}
                      onChange={handleFeatureChange}
                      id="feature_Occasion_Leisure"
                    />
                    <label className="form-check-label" htmlFor="feature_Occasion_Leisure">
                      Leisure
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Occasion_Night_Out"
                      checked={features.feature_Occasion_Night_Out === 1}
                      onChange={handleFeatureChange}
                      id="feature_Occasion_Night_Out"
                    />
                    <label className="form-check-label" htmlFor="feature_Occasion_Night_Out">
                      Night Out
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Occasion_Sports"
                      checked={features.feature_Occasion_Sports === 1}
                      onChange={handleFeatureChange}
                      id="feature_Occasion_Sports"
                    />
                    <label className="form-check-label" htmlFor="feature_Occasion_Sports">
                      Sports
                    </label>
                  </div>
                </div>
              </div>

              {/* Season Group */}
              <div className="row mb-3">
                <div className="col-6 align-self-center">
                  <h6>Season</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Season_Fall"
                      checked={features.feature_Season_Fall === 1}
                      onChange={handleFeatureChange}
                      id="feature_Season_Fall"
                    />
                    <label className="form-check-label" htmlFor="feature_Season_Fall">
                      Fall
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Season_Spring"
                      checked={features.feature_Season_Spring === 1}
                      onChange={handleFeatureChange}
                      id="feature_Season_Spring"
                    />
                    <label className="form-check-label" htmlFor="feature_Season_Spring">
                      Spring
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Season_Summer"
                      checked={features.feature_Season_Summer === 1}
                      onChange={handleFeatureChange}
                      id="feature_Season_Summer"
                    />
                    <label className="form-check-label" htmlFor="feature_Season_Summer">
                      Summer
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Season_Winter"
                      checked={features.feature_Season_Winter === 1}
                      onChange={handleFeatureChange}
                      id="feature_Season_Winter"
                    />
                    <label className="form-check-label" htmlFor="feature_Season_Winter">
                      Winter
                    </label>
                  </div>
                </div>

                {/* Type Group */}
                <div className="col-6">
                  <h6>Type</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Animalic"
                      checked={features.feature_Type_Animalic === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Animalic"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Animalic">
                      Animalic
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Aquatic"
                      checked={features.feature_Type_Aquatic === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Aquatic"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Aquatic">
                      Aquatic
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Chypre"
                      checked={features.feature_Type_Chypre === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Chypre"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Chypre">
                      Chypre
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Citrus"
                      checked={features.feature_Type_Citrus === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Citrus"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Citrus">
                      Citrus
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Creamy"
                      checked={features.feature_Type_Creamy === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Creamy"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Creamy">
                      Creamy
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Earthy"
                      checked={features.feature_Type_Earthy === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Earthy"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Earthy">
                      Earthy
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Floral"
                      checked={features.feature_Type_Floral === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Floral"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Floral">
                      Floral
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Fougere"
                      checked={features.feature_Type_Fougere === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Fougere"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Fougere">
                      Fougere
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Fresh"
                      checked={features.feature_Type_Fresh === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Fresh"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Fresh">
                      Fresh
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Fruity"
                      checked={features.feature_Type_Fruity === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Fruity"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Fruity">
                      Fruity
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Gourmand"
                      checked={features.feature_Type_Gourmand === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Gourmand"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Gourmand">
                      Gourmand
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Green"
                      checked={features.feature_Type_Green === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Green"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Green">
                      Green
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Leathery"
                      checked={features.feature_Type_Leathery === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Leathery"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Leathery">
                      Leathery
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Oriental"
                      checked={features.feature_Type_Oriental === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Oriental"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Oriental">
                      Oriental
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Powdery"
                      checked={features.feature_Type_Powdery === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Powdery"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Powdery">
                      Powdery
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Resinous"
                      checked={features.feature_Type_Resinous === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Resinous"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Resinous">
                      Resinous
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Smoky"
                      checked={features.feature_Type_Smoky === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Smoky"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Smoky">
                      Smoky
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Spicy"
                      checked={features.feature_Type_Spicy === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Spicy"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Spicy">
                      Spicy
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Sweet"
                      checked={features.feature_Type_Sweet === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Sweet"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Sweet">
                      Sweet
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Synthetic"
                      checked={features.feature_Type_Synthetic === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Synthetic"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Synthetic">
                      Synthetic
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="feature_Type_Woody"
                      checked={features.feature_Type_Woody === 1}
                      onChange={handleFeatureChange}
                      id="feature_Type_Woody"
                    />
                    <label className="form-check-label" htmlFor="feature_Type_Woody">
                      Woody
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-3 d-flex justify-content-between">
                <button type="button" className="btn btn-secondary me-3" onClick={handlePreviousStep}>
                  Previous Step
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit and See Results
                </button>
              </div>
            </div>
          </form>
        )}
        {step === 3 && result && result.length > 0 && !error && (
          <div className="container mt-5">
            <h2 className="mb-4">Recommended Perfumes</h2>
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center g-2">
                  {result.map((perfume, index) => (
                    <div className="col-sm-6 col-md-3 mb-3 mb-md-0 h-100" key={index}>
                      <PerfumeCard perfume={perfume} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 3 && error && (
          <div className="container mt-5">
            <h2 className="mb-4">Error</h2>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}