import React, { useState, useContext, useEffect } from 'react'
import { mycontext } from "../../context";
const menuitem = ({ abtData }) => {
    if (abtData.available == 0) {
        return ("");
    }
    const myctxt = useContext(mycontext);
    let defa = 0;
    if (myctxt.currentUser.username) {
        let mCart = myctxt.currentUser.cart;
        let ite = mCart.find(el => el.myId == abtData.myId);
        console.log("REACHEDDDD");
        if (ite) {
            defa = ite.quantity;
        }
    }
    const [itemQty, setItemQty] = useState(defa);
    function handleIncrease() {
        if (myctxt.currentUser.username) {
            let index = myctxt.currentUser.cart.findIndex(el => el.myId === abtData.myId);
            if (index!=-1) {
                myctxt.currentUser.cart[index].quantity=itemQty + 1;
            }
            else{
                let myobj={
                    veg:abtData.veg,
                    available:abtData.available,
                    name:abtData.name,
                    description:abtData.description,
                    image:abtData.image,
                    price:abtData.price,
                    quantity:1,
                    myId:abtData.myId
                }
                myctxt.currentUser.cart.push(myobj);
            }
            setItemQty(itemQty + 1);
            myctxt.updateEv();
        }
        else {
            window.location = "/login"
        }
    }
    function handleDecrease() {
        if (itemQty) {
            let index = myctxt.currentUser.cart.findIndex(el => el.myId === abtData.myId);
            if (index!=-1) {
                if(myctxt.currentUser.cart[index].quantity>1){
                    myctxt.currentUser.cart[index].quantity=itemQty - 1;}
                    else{
                        myctxt.currentUser.cart.splice(index,1);
                    }
                }
                myctxt.updateEv();
                setItemQty(itemQty - 1);
        }
    }
    return (
        <div className="menu-item">
            <div className="itemLeft">
                <p className='itemName'>
                    {abtData.veg ? (<img src="./Restr/Veg.png" alt="" />) : (<img src="./Restr/NV.png" alt="" />)}
                    {abtData.name}</p>
                <p className='itemDesc'> {abtData.description}</p>
                <span className='itemRate'> &#8377; {abtData.price}
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
            <div className="itemRight">
                <img src={abtData.image} alt="" />
            </div>
        </div>
    )
}

export default menuitem