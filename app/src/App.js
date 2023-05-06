import './App.css';

import Navbar from "./components/Navbar"
import { Grid } from '@mui/material';
import {
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Grid container>
        <Grid item xs={1} sm={2} md={2} />
        <Grid item xs={10} sm={8} md={8}>
          <Outlet></Outlet>
        </Grid>
        <Grid item xs={1} sm={2} md={2} />
      </Grid>
    </div>
  );
}

export default App;
