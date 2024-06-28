import React, { useState, useRef } from 'react';
// import './FeedbackForm.css';
import "./contactUs.css"
import CircleAnimationPopup from '../payments/circleAnimationPopup';


const contact = () => {
    const [showPopup, setShowPopup] = useState(false);
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
        setShowCircle(true);
        let myObj = {
            contactDate: formatDate(),
            name: e.target.Name.value,
            email: e.target.Email.value,
            text: e.target.Text.value,
            phone: e.target.Phone.value,
        }
        fetch("http://localhost:5000/api/contact", {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(myObj)

        })
            .then(el => {
                setShowCircle(false)
                if (formRef.current) {
                    formRef.current.reset();
                }
                setShowPopup(true)
            })
    };

    return (
        <>
            <div className="contact">
                <div className="container">
                {showCircle?(<CircleAnimationPopup/>):null}
                    <h2>Contact Us</h2>
                    <form onSubmit={handleSubmit} ref={formRef}>
                        <input type="text" id="Name" placeholder='Name ' required />
                        <input type="email" id="Email" placeholder='Email ' required />
                        <input type="tel" id="Phone" placeholder='Phone Number ' />
                        <textarea id="Text" placeholder='Remarks' required></textarea>
                        <button type="submit" className='contactBtn'>Submit</button>
                    </form>
                </div>
                {showPopup && (
                    <div className="popup-contact">
                        <div className="cross" onClick={el=>setShowPopup(false)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="21" fill="none">
                            <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" stroke="#574707be" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></div>
                        <p>Thank You for Contacting Us!</p>
                        <p>Your message has been successfully sent. We will get back to you shortly.</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default contact