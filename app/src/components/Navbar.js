import * as React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link, BrowserRouter, useLocation } from "react-router-dom";
import { Button } from '@mui/material';
import { connect, disconnect } from '../eth';
import { green } from '@mui/material/colors';
import { Box } from '@mui/material';
import { Popover } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

// const LinkBehavior = React.forwardRef((props, ref) => (
//   <Link ref={ref} to="/dashboard" {...props} />
// ));

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

const breathingAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.4);
  }
  50% {
    transform: scale(1.01);
    box-shadow: 0 0 0 5px rgba(0, 255, 0, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0);
  }
`;

const BreathingAvatar = styled(Box)(({ theme }) => ({
  backgroundColor: green[500],
  width: 8,
  height: 8,
  display: 'inline-block',
  borderRadius: 50,
  animation: `${breathingAnimation} 2s ease-in-out infinite`,
}));

export default function CustomizedTabs() {
  const location = useLocation();

  const [value, setValue] = React.useState(location.pathname === '/createTheme' ? 1 : 0);


  const [btn, setBtn] = React.useState("Connect Wallet");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const connectAccount = async (event) => {
    if (btn === "Connect Wallet") {
      const account = await connect();
      setBtn(account);
    } else {
      setAnchorEl(event.currentTarget);
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    // <BrowserRouter>
      <Grid
        sx={{ bgcolor: '#2e1544' }}
        justifyContent="space-between"
        container
        px={4}
        py={2}
        direction="row"
        wrap="nowrap"
      >
        <Grid item>
          <Typography type="title" color="white"  variant="h4">
            R7Bet
          </Typography>
        </Grid>
        <Grid item>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
            style={{display: 'inline-block', verticalAlign: 'middle'}}
          >
            <StyledTab label="Home" component={Link}  to="/" />
            <StyledTab label="Create Theme" component={Link}  to="/createTheme" />
            {/* <StyledTab label="Connections" component={Link} to="/guess" /> */}
          </StyledTabs>
          <Button
            variant="outlined"
            onClick={connectAccount}
            style={{ width: 160, whiteSpace: "nowrap" }}
            >
              <Typography style={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }} noWrap>
                {/* {btn !== 'Connect Wallet' && <BreathingAvatar/>} */}
                {btn}
              </Typography>
            </Button>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Button
                variant="outlined"
                startIcon={<LogoutIcon style={{fontSize:"inherit"}}/>}
                onClick={() => {
                  disconnect();
                  setBtn("Connect Wallet");
                  setAnchorEl(null);
                }}
              >Logout</Button>
            </Popover>
        </Grid>
      </Grid>
    // </BrowserRouter>

  );
}
