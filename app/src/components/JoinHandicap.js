import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

export const JoinHandicap = (props) => {
    const { open, onClose } = props;
    const {name, createTime, prediction, participants, pool, odd} = props.data;
    const [betAmount, setBetAmount] = React.useState(100);
    const onGo = () => {
        console.log("You will join this handicap with bet amount", betAmount);
        onClose();
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
            Odd: {odd}
        </Typography>
        <Typography variant='body2'>
            Pool: {pool}
        </Typography>
      {/* </DialogContentText> */}
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Bet Amount(Wei)"
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