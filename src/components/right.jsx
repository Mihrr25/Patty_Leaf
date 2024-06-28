import React from 'react'

import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom'

const right = () => {
      const router = createBrowserRouter([
    {
      path: "/",
      element: <><RightHome /></>
    },
    {
        path:"/aboutUs",
        element:<><About/></>
    }
   
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default right