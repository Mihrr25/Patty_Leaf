import React, { useState, useContext, useEffect } from 'react'
import { mycontext } from "../../context";
import "./past.css"
import PastItems from './pastItems';
const pastOrders = () => {
    const myctxt = useContext(mycontext);
    let avail = localStorage.getItem("pUser")
    let ct=JSON.parse(avail);
      console.log(myctxt.setCurrentUser)
      return (
          <div className="pastOrders">
            <h2>Your Orders</h2>
            {ct.orders&&ct.orders.length>0?(
                ct.orders.map((ele,index)=>(
                    <PastItems key={index} abt={ele}/>
                ))
            ):null}
        </div>
    )
    
}

export default pastOrders