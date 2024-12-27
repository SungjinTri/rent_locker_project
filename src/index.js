import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import SignIn from "./routes/signin";
import SignUp from "./routes/signup";
import Main from './routes/main';
import Locker from './routes/locker';
import Service from './routes/service';
import Payment1 from './routes/payment1';
import Payment2 from './routes/payment2';
import Timereset from './routes/timereset';
import Unlock from './routes/unlock';
import Pin1 from './routes/pin1';
import Pin2 from './routes/pin2';
import Control1 from './routes/control1';
import Control2 from './routes/control2';



import 'bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/service",
    element: <Service />,
  },
  {
    path: "/locker",
    element: <Locker />,
  },
  {
    path: "/payment1",
    element: <Payment1 />,
  },
  {
    path: "/payment2",
    element: <Payment2 />,
  },
  {
    path: "/timereset",
    element: <Timereset />,
  },
  {
    path: "/unlock",
    element: <Unlock />,
  },
  {
    path: "/pin1",
    element: <Pin1 />,
  },
  {
    path: "/pin2",
    element: <Pin2 />,
  },
  {
    path: "/control1",
    element: <Control1 />,
  },
  {
    path: "/control2",
    element: <Control2 />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
