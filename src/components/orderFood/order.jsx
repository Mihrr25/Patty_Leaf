import React, { useState, useContext, useEffect } from 'react'
import { mycontext } from "../../context";
import ManuCont from './manuCont';
import "./orderFood.css"
import { Link } from 'react-router-dom';
const order = () => {
    const myctxt = useContext(mycontext);
    useEffect(() => {
        (async function() {
            let fet = await fetch("http://localhost:5000/menu");
            let ans = await fet.json();
            console.log(ans);
            myctxt.setMenuCont(ans);
        })();
    }, [])

    return (
        <div className="orderFood">
            <h2>Our Menu</h2>
            <div className="order-head">
                <a href="#Burgers" ><div className="order-head-block">Burgers</div></a>
                <a href="#Beverages"><div className="order-head-block">Beverages</div></a>
                <a href="#Sides"><div className="order-head-block">Sides</div></a>
                <a href="#Desserts" ><div className="order-head-block">Dessert</div></a>
            </div>
            {myctxt.menuCont.map((ele,index) => (
                (<ManuCont key={index} abt={ele}/>)
            ))}
            <div className='hr11' >
                <hr className='hr1' />
            </div>
            <footer>
             All rights reserved © 2024 Patty Leaf Restaurant. Designed with passion.
            </footer>
        </div>
    )
}

export default order