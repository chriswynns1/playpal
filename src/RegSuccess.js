import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegSuccess() {
  const navigate = useNavigate();

  // Function to navigate when a button is clicked
  const handleNavigate = () => {
    // You can navigate to a different route like this
    navigate('/login');
  };

  return (
    <div>
      <div className='redirect-p'>
        <h1>Thank you for registering!</h1>
        <button onClick={handleNavigate}>Click here to login</button>
      </div>
    </div>
  );
}

export default RegSuccess;