// src/components/Dice.js
import React from "react";

const Dice = ({ value, onClick, locked, onLockClick, showManualControls }) => {
  return (
    <div>
      <div className={`dice ${locked ? "locked" : ""}`} onClick={onLockClick}>
        {value}
      </div>
      {showManualControls && (
        <button className="manual-controls button" onClick={onClick}>
          +1
        </button>
      )}
    </div>
  );
};

export default Dice;
