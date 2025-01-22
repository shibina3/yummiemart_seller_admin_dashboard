import React from 'react';
import './styles.css';

function ToggleSwitch({isToggled, toggleHandler}) {

  return (
    <div className="toggle-container">
      <label className="switch">
        <input 
          type="checkbox" 
          checked={isToggled} 
          onChange={toggleHandler}
        />
        <span className="slider"></span>
      </label>
      <p>{isToggled ? 'Verified Seller' : 'Unverified Seller'}</p>
    </div>
  );
}

export default ToggleSwitch;
