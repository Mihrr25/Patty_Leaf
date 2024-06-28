import React, { useState, useContext, useEffect } from 'react'
import { mycontext } from "../../context";
import "./payments.css"
import CircleAnimationPopup from './circleAnimationPopup';



const paymnet = () => {
    const myctxt = useContext(mycontext);
    let lCart = localStorage.getItem("cart")
    let lTime = localStorage.getItem("sTime")
    if (!lTime || !lCart) {
        window.location = "/cart"
    }
    lTime = parseInt(lTime);
    let myDate = Date.now();
    if (myDate - lTime > 300000) {
        localStorage.removeItem("cart");
        localStorage.removeItem("sTime");
        window.location = "/cart"
    }
    lCart = JSON.parse(lCart)
    let [timeLeft, setTimeLeft] = useState(Math.round(300 - (myDate - lTime) / 1000));
    let [disP, setDisP] = useState(0);
    useEffect(() => {
        if (timeLeft > 0) {
            const timeout = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timeout);
        } else {
            localStorage.removeItem("cart");
            localStorage.removeItem("sTime");
            setTimeout(() => {
                window.location = "/cart";
            }, 5500);
        }
    }, [timeLeft]);
    function formatTime(seconds) {
        if (isNaN(seconds)) {
            return "00:00";
        }
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = Math.round(seconds) % 60;
        let formattedSeconds = ('0' + remainingSeconds).slice(-2);
        return `${minutes}:${formattedSeconds}`;
    }
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
    console.log(formatDate());
    function handleSubmit(event) {
        event.preventDefault();
        setDisP(1);
        let myObj = {
            cartItem: lCart.cartItem,
            totalAmount: lCart.totalAmount,
            totalquantity: lCart.totalQuantity,
            status: "In Process",
            transactionId: event.target.tId.value,
            transactionImage: "",
            orderId: 0,
            orderDate:formatDate()
        }
        let reader = new FileReader();
        reader.readAsDataURL(event.target.file.files[0]);
        reader.onload = function () {
            let ob = { image: reader.result };
            // console.log(ob);
            fetch("http://localhost:5000/api/imgupload", {
                method: "post",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({ image: reader.result })
            })
                .then(el => el.json())
                .then((data) => {
                    myObj.transactionImage = data.url;
                    fetch("http://localhost:5000/api/order", {
                        method: "post",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        },
                        body: JSON.stringify(myObj)

                    })
                        .then(el => el.json())
                        .then(data1 => {
                            console.log(myctxt.currentUser)
                            setDisP(0);
                            myctxt.currentUser.orders.unshift(data1);
                            myctxt.currentUser.cart = [];
                            localStorage.setItem("pUser", myctxt.currentUser);
                            myctxt.updateEv();
                            localStorage.setItem("sTime", lTime - 2000);
                            setTimeout(() => {
                                window.location = "/pastOrders"
                            }, 1500);

                        })
                })
                ;
        }
    }
    return (
        <div className="payment">
            <div className="paymentForm">
                {disP ? (<CircleAnimationPopup />) : null}
                <h2>Complete the Payment and upload the screenshot in {formatTime(timeLeft)} to complete the order</h2>
                <div className="pQrCont">
                    <img src="https://res.cloudinary.com/dyi9bebju/image/upload/v1719483365/Pattyleaf%20Folder/wiagx1x82vz2tngwfav0.png" alt="" />
                    <p>upi id: paatyFakeLeaf@payUs</p>
                    <p> &#8377; {lCart.totalAmount}</p>
                </div>
                <form onSubmit={handleSubmit} >
                    <div className="uSec">
                        <label className='uploadImg'>Payment Screenshot:</label>
                        <input className='uploadImg2' type="file" name='file' id='file' accept="image/*" required />
                    </div>
                    <input type="text" name="tId" id="tId" className='input' placeholder='Transac. Id' required />
                    <button type="submit">Place Order</button>
                </form>
            </div>
        </div>
    )
}

export default paymnet