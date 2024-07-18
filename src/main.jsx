import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root.jsx';
import Home from './components/Home/Home.jsx';
import AppliedJobs from './components/AppliedJobs/AppliedJobs.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import JobDetails from './components/JobDetails/JobDetails.jsx';
import { HelmetProvider } from 'react-helmet-async';
const router = createBrowserRouter([
  {
    path: "/",
    element:<Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/applied',
        element:<AppliedJobs></AppliedJobs>,
        loader:() => fetch ('/jobs.json') //warning:only load the data you need.do not load all the data
      },
      {
        path:'/job/:id',
        element:<JobDetails></JobDetails>,
        loader:() => fetch('/jobs.json') //do not load all data.load only what you need
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
    <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
)
