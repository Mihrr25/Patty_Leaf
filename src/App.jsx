import { useState, useContext, useEffect } from 'react'
import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom'
import { mycontext } from "./context";
import './components/style.css'
import './components/utility.css'
import Nav from './components/nav';
import About from './components/aboutUs/about'
import RightHome from './components/righthome/rightHome'
import LegalRights from './components/legalrights/legalRights';
import License from './components/license/license';
import Feedback from './components/feedback/feedback';
import Contact from './components/Contact-Us/contact';
import Order from './components/orderFood/order';
import PastOrders from './components/PastOrders/pastOrders';
import Login from './components/login/login';
import Sign from './components/sighin/sign';
import Cart from './components/cart/cart';
import Paymnet from './components/payments/paymnet';
import Hamburger from './components/ham/hamburger';


function App() {
  const [menuCont, setMenuCont] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLeftOpen, setIsLeftOpen] = useState(0);

  function updateEv() {
    console.log("updating..,", currentUser);;
    (async function () {
      let x = await fetch('http://localhost:5000/api/updateUser', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentUser })
      });
    })();
    localStorage.setItem("pUser", JSON.stringify(currentUser));
  }
  let contextWriter = {
    menuCont,
    setMenuCont,
    currentUser,
    setCurrentUser,
    updateEv,
    isSmallScreen,
    isLeftOpen,
    setIsLeftOpen
  }
  useEffect(() => {
    let avail = localStorage.getItem("pUser")
    if (avail) {
      setCurrentUser(JSON.parse(avail));
      // setCurrentUser(avail.JSON());
    }
  }, [])

    useEffect(() => {
        // Function to handle window resize event
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1100);
        };

        // Initial check on component mount
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up function to remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Nav /><Hamburger/><RightHome /></>
    },
    {
      path: "/aboutUs",
      element: <><Nav /><Hamburger/><About /></>
    },
    {
      path: "/legalRights",
      element: <><Nav /><Hamburger/><LegalRights /></>
    },
    {
      path: "/license",
      element: <><Nav /><Hamburger/><License /></>
    },
    {
      path: "/feedback",
      element: <><Nav /><Hamburger/><Feedback /></>
    },
    {
      path: "/contact",
      element: <><Nav /><Hamburger/><Contact /></>
    },
    {
      path: "/orderFood",
      element: <><Nav /><Hamburger/><Order /></>
    },
    {
      path: "/pastOrders",
      element: <><Nav /><Hamburger/><PastOrders /></>
    },
    {
      path: "/login",
      element: <><Nav /><Hamburger/><Login /></>
    },
    {
      path: "/sighin",
      element: <><Nav /><Hamburger/><Sign /></>
    },
    {
      path: "/cart",
      element: <><Nav /><Hamburger/><Cart /></>
    },
    {
      path: "/payment",
      element: <><Nav /><Hamburger/><Paymnet /></>
    }


  ])
  


  return (
    <>
      <mycontext.Provider value={contextWriter}>
        <RouterProvider router={router} />
      </mycontext.Provider>
    </>
  )
}

export default App
