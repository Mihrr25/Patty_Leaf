import React, { useState,useRef } from 'react';
import './FeedbackForm.css';
import CircleAnimationPopup from '../payments/circleAnimationPopup';

const feedback = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPSO, setShowPSO] = useState(false);
    const [showCircle, setShowCircle] = useState(false);
    const formRef = useRef(null);
    function formatDate() {
        const currentDate = new Date();

        const options = {
            localeMatcher: 'best fit', // How to handle locale matching
            timeZone: 'Asia/Kolkata', // Timezone to use, e.g., 'Asia/Kolkata'
            hour12: false, // Whether to use 12-hour format (true) or 24-hour format (false)
            hour: '2-digit',
            minute: '2-digit',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        };

        const formattedDate = new Intl.DateTimeFormat('en-IN', options).format(currentDate);
        return formattedDate;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPSO(false);
        if (!e.target.rating.value) {
            setShowPSO(true);
        }
        else {
            setShowCircle(true);
            let myObj = {
                feedDate: formatDate(),
                name: e.target.Name.value,
                email: e.target.Email.value,
                text: e.target.Text.value,
                rating: e.target.rating.value,
                image: ""
            }
            let reader = new FileReader();
            reader.readAsDataURL(e.target.filUp.files[0]);
            reader.onload = function () {
                myObj.image = reader.result;
                fetch("http://localhost:5000/api/feedback", {
                    method: "post",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(myObj)

                })
                    .then(el => {
                        setShowCircle(false)
                        if(formRef.current){
                            formRef.current.reset();
                        }
                        setShowPopup(true)
                    })
            }


        }
        // console.log(e.target)
    };
    return (
        <div className="feedback-form">
            {showCircle?(<CircleAnimationPopup/>):null}
            <h2>Your feedback is greatly appreciated</h2>
            <div className="feedback-container">
                <form onSubmit={handleSubmit} ref={formRef} >
                    <div className="form-group">
                        <input type="text" id="Name" className='input' placeholder='Name' required />
                    </div>
                    <div className="form-group">
                        <input type="email" id="Email" className='input' placeholder='Email' required />
                    </div>
                    <div className="form-group"><textarea id="Text" placeholder='Enter Your Text Here...' required></textarea>
                    </div>
                    <div className="form-group uploadIm">
                        <label className='uploadImg'>Upload Image:</label>
                        <input className='uploadImg2' type="file" id='filUp' accept="image/*" required />
                    </div>
                    <div className="form-group flex1">
                        <label className='expText'>Your Experience :</label>
                        <div className="rating">
                            <input type="radio" id="star5" name="rating" value="5" /><label htmlFor="star5"></label>
                            <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4"></label>
                            <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3"></label>
                            <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2"></label>
                            <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="star1"></label>
                        </div>
                    </div>
                    {showPSO ? (<p className='PSO'>Please select one of the following</p>) : null}
                    <div className="feed-btn-c">
                        <button type="submit" className='feedBtn'>Submit</button>
                    </div>
                </form>
                {showPopup && (
                    <div className="popup">
                        <div className="cross" onClick={el=> setShowPopup(false)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="21" fill="none">
                            <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" stroke="#574707be" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></div>
                        <p>Feedback submitted successfully.</p>
                        <p>Thank you for your valuable feedback!</p>
                    </div>
                )}
            </div>
            <hr className='hr1' />
            <footer>
                All rights reserved © 2024 Patty Leaf Restaurant. Designed with passion.
            </footer>
        </div>
    )
}

export default feedback