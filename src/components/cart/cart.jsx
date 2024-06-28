import React, { useState, useContext, useEffect } from 'react'
import { mycontext } from "../../context";
import "./cartC.css"
import CartItem from './cartItem';
const cart = () => {
    const myctxt = useContext(mycontext);
    let lUser=localStorage.getItem("pUser");
    if(!lUser){
        window.location="/login";
    }
    lUser=JSON.parse(lUser)
    function handleClear() {
        myctxt.currentUser.cart = [];
        myctxt.updateEv();
        window.location = "/cart"
    }
    let a1 = 0;
    let a2 = 0;
    for (const i in lUser.cart) {
        let ele = lUser.cart[i];
        a1 += ele.quantity;
        a2 += ele.quantity * ele.price;
    }
    const [tItem, setTItem] = useState(a1);
    const [tAmt, setTAmt] = useState(a2);
    const [dis,setDis]=useState(0);
    function handleMissing(){
        setDis(0);
        window.location="/cart"
    }

    async function handlePlace() {

        let fet = await fetch("http://localhost:5000/menu");
        let ans = await fet.json();
        myctxt.setMenuCont(ans);
        let ischanged=0;
        for(const i in ans){
            for(const j in ans[i].variety){
                let fin=myctxt.currentUser.cart.findIndex(el=> el.myId==ans[i].variety[j].myId)
                if(fin!=-1){
                    if(ans[i].variety[j].available!=1){
                        ischanged=1;
                        myctxt.currentUser.cart.splice(fin,1);
                    }
                }
            }
        }
        if(ischanged){
            myctxt.updateEv();
            setDis(1);
        }
        else{
            let myObj={
                cartItem:myctxt.currentUser.cart,
                totalAmount:tAmt,
                totalQuantity:tItem
            }
            localStorage.setItem("cart",JSON.stringify(myObj));
            localStorage.setItem("sTime",Date.now().toString());
            window.location="/payment"
        }

    }

    return (
        <>
            <div className="cart-container" >
                {dis?(<div className="disp-popup">
                    <p>Some of items have in your cart are not available, We have removed those items from the cart </p>
                    <button onClick={handleMissing}>Ok</button>
                </div>):null}
                <h2>Your Cart</h2>
                <div className="Cart-Content">
                    {myctxt.currentUser.cart && myctxt.currentUser.cart.length > 0 ? (
                        <>
                            <div className="buttonHolder">
                                <button onClick={handlePlace}>Place Order</button>
                                <button onClick={handleClear}>Clear All</button>
                            </div>
                        </>
                    ) : null}
                    {myctxt.currentUser.cart && myctxt.currentUser.cart.length > 0 ? (
                        myctxt.currentUser.cart.map((ele, i) => {
                            return (<CartItem key={i} abtData={ele} ind={i} tItem={tItem} setTItem={setTItem} tAmt={tAmt} setTAmt={setTAmt} />)
                        })
                    ) : null}
                </div>
                <div className='total'><p>Total Items: {tItem} </p> <p>Total Order Amount: &#8377; {tAmt}</p></div>
                <div className='hr11' >
                    <hr className='hr1' />
                </div>
                <footer>
                    All rights reserved © 2024 Patty Leaf Restaurant. Designed with passion.
                </footer>



            </div>
        </>
    )
}

export default cart