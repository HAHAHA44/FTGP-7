import './App.css';

import Navbar from "./components/Navbar"
import { Grid } from '@mui/material';
import {
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <CoinFlip></CoinFlip> */}
      <Navbar></Navbar>
      <Grid container>
        {/* 左侧留白 */}
        <Grid item xs={1} sm={2} md={2} />
        {/* 中间内容区 */}
        <Grid item xs={10} sm={8} md={8}>
          <Outlet></Outlet>
        </Grid>
        {/* 右侧留白 */}
        <Grid item xs={1} sm={2} md={2} />
      </Grid>
    </div>
  );
}

export default App;
