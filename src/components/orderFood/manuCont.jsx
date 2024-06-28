import React, { useState, useContext, useEffect } from 'react'
import { mycontext } from "../../context";
import Menuitem from './menuitem';

const manuCont = ({abt}) => {
    const myctxt = useContext(mycontext);
  return (
        <div className="menu-container" id={abt.heading}>
                <div className="menu-cont-head">{abt.heading}</div>
                <div className="menu-item-cont">

                    {abt.variety.map((ele,index)=>(
                        <Menuitem key={index} abtData={ele}/>
                    ))}
                </div>

            </div>
  )
}

export default manuCont