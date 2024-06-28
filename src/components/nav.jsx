import React, { useState, useContext, useEffect, useRef } from 'react'
import { mycontext } from "../context";
import { Link } from 'react-router-dom';

const Nav = () => {
    let [first,setFirst] = useState(0);
    const myctxt = useContext(mycontext);
    function handlelogOut() {
        localStorage.removeItem("pUser");
        myctxt.setCurrentUser({});
    }
    let myRef = useRef(null);
    useEffect(() => {
        if (myctxt.isLeftOpen) {
            if (myRef.current) {
                myRef.current.style.transform = "translateX(0)"
                setFirst(1);
            }
        }
        else {
            if (myRef.current && first) {
                myRef.current.style.transform = "translateX(-100%)"
            }
        }
    }, [myctxt.isLeftOpen])
    function handleClose(){
        myctxt.setIsLeftOpen(0);
    }

    return (
        <div className="nav" ref={myRef}>
            {myctxt.isLeftOpen ? (
                <>
                    <div className="crsCont" onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#574707b3" fill="none">
                            <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </>
            ) : null}
            <Link to="/" onClick={handleClose}>
                <div className="nav-head flex" >
                    <img src="/Restr/logo.png" alt="Patty Leaf" width="50" />
                    <h1 className="navHeading">Patty Leaf</h1>
                </div>
            </Link>
            <hr className="hr1" />
            <ul onClick={handleClose}>
                {myctxt.currentUser.username ? ("") : (<Link to="/login"> <li>Sign In</li></Link>)}
                <Link to="/aboutUs"> <li>About Us</li></Link>
                <Link to="/orderFood"><li>Order Food</li></Link>
                {myctxt.currentUser.username ? (<><Link to="/cart"> <li>Your Cart</li></Link></>) : ("")}
                {myctxt.currentUser.username ? (<><Link to="/pastOrders"> <li>Past Orders</li></Link></>) : ("")}
                <Link to="/feedback"> <li>Feedback</li></Link>
                <Link to="/contact"><li>Contact Us</li></Link>
                <Link to="/legalRights"><li>Legal Rights</li></Link>
                <Link to="/license"> <li>License</li></Link>
                {myctxt.currentUser.username ? (<><Link to="/"> <li onClick={handlelogOut}>Log Out</li></Link></>) : ("")}
            </ul>
            <footer>
                Established in the 1950s, dedicated to excellence ever since.
            </footer>
        </div>
    );
}

export default Nav;
