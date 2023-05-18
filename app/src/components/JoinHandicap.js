import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { placeBet } from '../eth/index'
import { notification } from '../eventbus';
import { state } from '../eth/index';

export const JoinHandicap = (props) => {
    const { open, onClose } = props;
    const {name, createTime, prediction, participants, yesPool, yesOdd, noOdd, noPool, id} = props.data;
    const [betAmount, setBetAmount] = React.useState(100);
    const onGo = () => {
        console.log("You will join this handicap with bet amount", betAmount);
        if (!state.connected) {
            notification('please connect to you account first', 'error');
            return;
        }
        placeBet(betAmount, id, prediction ? 1 : 0);
        onClose();
        notification("join handicap success");
    }

    return <Dialog open={open} onClose={onClose}>
    <DialogTitle>Join Handicap</DialogTitle>
    <DialogContent>
      {/* <DialogContentText> */}
        <Typography variant='body2' paragraph>
            You will join the handicap with following information:
        </Typography>
        <Typography variant='body2'>
            Theme: {name}
        </Typography>
        <Typography variant='body2'>
            Prediction: {prediction ? 'Will happen' : 'Will not happen'}
        </Typography>
        <Typography variant='body2'>
            Odd: {prediction ? yesOdd : noOdd}
        </Typography>
        <Typography variant='body2'>
            Pool: {prediction ? yesPool : noPool}
        </Typography>
      {/* </DialogContentText> */}
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Bet Amount(Gwei)"
        type="text"
        fullWidth
        variant="standard"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onGo}>Go</Button>
      <Button onClick={onClose}>Cancel</Button>
    </DialogActions>
  </Dialog>
}