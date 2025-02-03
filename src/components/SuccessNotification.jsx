import styled from "styled-components";
import PropTypes from "prop-types"; 
import React from "react";

const SuccessNotification = ({ onClose }) => {
  return (
    <StyledWrapper>
      <div className="notifications-container">
        <div className="success">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="succes-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="success-prompt-wrap">
              <p className="success-prompt-heading">
                Recipe Created Successfully! 🎉
              </p>
              <div className="success-prompt-prompt">
                <p>
                  Your delicious recipe has been added! Check it on the home
                  page or in your profile.
                </p>
              </div>
              <div className="success-button-container">
                <button type="button" className="success-button-main">
                  View Recipes
                </button>
                <button
                  type="button"
                  className="success-button-secondary"
                  onClick={onClose}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

// ✅ Add PropTypes validation
SuccessNotification.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const StyledWrapper = styled.div`
  .notifications-container {
    width: 350px;
    height: auto;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: auto;
    margin-top: 20px;
  }

  .flex {
    display: flex;
  }

  .flex-shrink-0 {
    flex-shrink: 0;
  }

  /* Updated Success Box */
  .success {
    padding: 1rem;
    border-radius: 8px;
    background-color: #f3f4f6; /* Light gray background */
    border-left: 5px solid #16a34a; /* Green border */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .succes-svg {
    color: #16a34a; /* Modern green */
    width: 1.5rem;
    height: 1.5rem;
  }

  .success-prompt-wrap {
    margin-left: 0.75rem;
  }

  .success-prompt-heading {
    font-weight: bold;
    color: #065f46; /* Deep green */
  }

  .success-prompt-prompt {
    margin-top: 0.5rem;
    color: #047857; /* Dark teal */
  }

  .success-button-container {
    display: flex;
    margin-top: 1rem;
    gap: 10px;
  }

  .success-button-main {
    padding: 0.5rem 0.75rem;
    background-color: #16a34a; /* Green */
    color: #fff;
    font-size: 0.875rem;
    font-weight: bold;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .success-button-main:hover {
    background-color: #15803d; /* Darker green */
  }

  .success-button-secondary {
    padding: 0.5rem 0.75rem;
    background-color: #e5e7eb; /* Light gray */
    color: #374151; /* Dark gray */
    font-size: 0.875rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .success-button-secondary:hover {
    background-color: #d1d5db;
  }
`;

export default SuccessNotification;
