import React from 'react';
import './CircleAnimationPopupS.css';

const CircleAnimationPopup = ({ isOpen, onClose }) => {
    return (
        <div className={`circle-popup ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="circle"></div>
        </div>
    );
}

export default CircleAnimationPopup;