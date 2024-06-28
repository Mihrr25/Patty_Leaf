import React, { useState, useContext, useEffect } from 'react'
import { mycontext } from "../../context";

const cartItem = ({ abtData, ind,tItem,tAmt,setTItem,setTAmt }) => {
  const myctxt = useContext(mycontext);
  const [itemQty, setItemQty] = useState(abtData.quantity);


  function handleIncrease() {
    myctxt.currentUser.cart[ind].quantity = itemQty + 1;
    setItemQty(itemQty + 1);
    myctxt.setCurrentUser(myctxt.currentUser);
    myctxt.updateEv();
    setTAmt(tAmt+abtData.price)
    setTItem(tItem+1);
  }
  function handleDecrease() {

    if (myctxt.currentUser.cart[ind].quantity > 1) {
      myctxt.currentUser.cart[ind].quantity = itemQty - 1;
      myctxt.setCurrentUser(myctxt.currentUser);
      myctxt.updateEv();
      setItemQty(itemQty - 1);
      setTAmt(tAmt-abtData.price)
      setTItem(tItem-1);
    }
    else {
      setTAmt(tAmt-abtData.price)
      setTItem(tItem-1);
      myctxt.setCurrentUser(myctxt.currentUser);
      myctxt.currentUser.cart.splice(ind, 1);
      myctxt.updateEv();
      // window.location="/cart"
    }
    setItemQty(itemQty - 1);
  }
  return (
    <div className="cart-item">
      <div className="cartItemLeft">
        <p className='cartItemName'>
          {abtData.veg ? (<img src="./Restr/Veg.png" alt="" />) : (<img src="./Restr/NV.png" alt="" />)}
          {abtData.name}</p>
        <p className='cartItemDesc'> {abtData.description}</p>
        <span className='cartItemRate'> &#8377; {abtData.price}
          <button><svg className='removeItem' onClick={handleDecrease} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#ffffff" fill="none">
            <path d="M20 12L4 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg></button>
          <p className='qty'> {itemQty}  </p>
          <button><svg className='addItem' onClick={handleIncrease} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#ffffff" fill="none" >
            <path d="M12 4V20" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12H20" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg></button>
        </span>
      </div>
      <div className="cartItemRight">
        <img src={abtData.image} alt="" />
      </div>
    </div>
  )
}

export default cartItem