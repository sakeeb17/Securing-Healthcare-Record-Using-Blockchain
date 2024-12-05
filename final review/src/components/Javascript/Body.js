import React from 'react';
import {createBrowserRouter,RouterProvider } from "react-router-dom";
import { UserProvider } from './contexts/UserContext';
import { MessageProvider } from './contexts/MessageContext';
import Profile from './Profile';
import Login from './Login';
import Aboutus from'./Aboutus';
import Contact from './Contact';
import Patientprofile from './Patientprofile';
import Patientreport from './Patientreport';
import Doctorprofile from './Doctorprofile';
import Doctorreport from './Doctorreport';
import Hospitalreport from'./Hospitalreport';
import Parentcomponent from './Parentcomponent';
import Doctorlogin from './Doctorlogin';
import Hospitallogin from './Hospitallogin';
import Reseacherlogin from './Reseacherlogin';
import Doctorcomponent from'./Doctorcomponent';
import Hospitalprofile from './Hospitalprofile';
import Hospitalcomponent from './Hospitalcomponent';
import Reseacherprofile from './Reseacherprofile';
import Reseacherreport from './Reseacherreport';
import Reseachercomponent from'./Reseachercomponent';
import Patientdataexchange from './Patientdataexchange'; 
import Requestrecord from './Requestrecord';
import Approve from './Approve';
const Body = ()=> {
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
        },
        {
          path:'/Doctorprofile',
          element:<Doctorprofile/>
        },
        {
          path:'/Doctorreport',
          element:<Doctorreport/>
        },
        {
          path:'/Hospitalreport',
          element:<Hospitalreport/>
        },
        {
          path:'Patientprofile/Parentcomponent',
          element:<Parentcomponent/>
        },
        {
          path:'/Doctorlogin',
          element:<Doctorlogin/>
        },
        {
          path:'/Hospitallogin',
          element:<Hospitallogin/>
        },
        {
          path:'/Reseacherlogin',
          element:<Reseacherlogin/>
        },
        {
          path:'Doctorprofile/Doctorcomponent',
          element:<Doctorcomponent/>
        },
        {
          path:'Hospitalprofile/Hospitalcomponent',
          element:<Hospitalcomponent/>
        },
        {
          path:'/Hospitalprofile',
          element:<Hospitalprofile/>
        },
        {
          path:'/Reseacherprofile',
          element:<Reseacherprofile/>
        },
        {
          path:'/Reseacherreport',
          element:<Reseacherreport/>
        },
        {
          path:'/Reseacherprofile/Reseachercomponent',
          element:<Reseachercomponent/>
        },
        {
          path:'Patientprofile/Patientdataexchange',
          element:<Patientdataexchange/>
        },
        {
          path:'/Requestrecord',
          element:<Requestrecord/>
        },
        {
          path:'/Approve',
          element:<Approve/>
        },
        {
          path:'/Doctorprofile/Patientdataexchange',
          element:<Patientdataexchange/>
        },
        {
          path:'/Hospitalprofile/Patientdataexchange',
          element:<Patientdataexchange/>
        },
        {
          path:'/Reseacherprofile/Patientdataexchange',
          element:<Patientdataexchange/>
        }
]);
  return (
    <UserProvider>
            <MessageProvider>
              <div>
                <RouterProvider router={appRouter} />
                </div>
            </MessageProvider>
        </UserProvider>
  );
};
export default Body;
