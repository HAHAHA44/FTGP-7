import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Homepage from "./pages/Homepage"
import Guess from "./pages/Guess"
import Navbar from "./components/Navbar"
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import CreateTheme from './pages/CreateTheme';


const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/createTheme",
        element: <CreateTheme />,
      },
      {
        path: "guess",
        element: <Guess />,
      }
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
