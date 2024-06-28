import React, { useState, useContext, useEffect } from 'react'
import { mycontext } from "../../context";

const hamburger = () => {
    const myctxt = useContext(mycontext);
    if(!myctxt.isSmallScreen){
        return null;
    }
    function handleClick(){
        myctxt.setIsLeftOpen(1);
    }
  return (
    <>
    <div className="hCont" onClick={handleClick}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#574707" fill="none">
    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
</div>
    </>
  )
}

export default hamburger