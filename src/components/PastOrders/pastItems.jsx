import React, { useState, useContext, useEffect } from 'react'
import { mycontext } from "../../context";

const pastItems = ({abt}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleHiddenContent = () => {
        setIsExpanded(!isExpanded);
    };
  return (
    <div className="click-area" onClick={toggleHiddenContent}>
                <div className="click-area-head">
                    <span className='click-text-Block1'>Order No. {abt.orderId} </span>
                    <span className='click-text-Block2'>{abt.orderDate}</span>
                    <span className='click-text-Block3'> &#8377; {abt.totalAmount}</span>
                    <span className='click-text-Block4'>{abt.status}  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000b3" fill="none"><path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg></span>
                </div>
                <div className={`hidden-content ${isExpanded ? 'expanded' : ''}`}>
                    <table>
                        <colgroup>
                            <col span="1" className='pastCol1' />
                            <col span="1" className='pastCol2' />
                            <col span="1" className='pastCol3' />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {abt.cartItem.map((ele,index)=>(
                            <tr key={index}>
                                <td>{ele.name}</td>
                                <td>{ele.quantity}</td>
                                <td>{ele.price*ele.quantity}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
  )
}

export default pastItems