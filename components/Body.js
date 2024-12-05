import React from 'react';
import {createBrowserRouter,RouterProvider } from "react-router-dom";
import Profile from './Profile';
import Login from './Login';
import Aboutus from'./Aboutus';
import Contact from './Contact';
import Patientprofile from './Patientprofile';
import Patientreport from './Patientreport';
export default function body() {
    const appRouter=createBrowserRouter([
        {
            path:'/',
            element:<Profile/>
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/aboutus',
            element:<Aboutus/>
        },
        {
          path:'/contactus',
          element:<Contact/>
        },
        {
          path:'/patientprofile',
          element:<Patientprofile/>
        },
        {
          path:'/patientreport',
          element:<Patientreport/>
        }

])
  return (
    <div>
    <RouterProvider router={appRouter}/>
    </div>
  )
}
