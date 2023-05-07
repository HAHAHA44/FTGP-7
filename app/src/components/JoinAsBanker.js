import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Radio, Typography, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@mui/material';

export const JoinAsBanker = (props) => {
    const { open, onClose } = props;
    const {name} = props.data;
    const [prediction, setPrediction] = React.useState(true);
    const [pool, setPool] = React.useState(100);
    const [odd, setOdd] = React.useState(4);
    const onGo = () => {
        console.log("You will join this bet theme as a banker", prediction, pool, odd);
        onClose();
    }

    return <Dialog open={open} onClose={onClose}>
    <DialogTitle>Join Handicap</DialogTitle>
    <DialogContent>
      {/* <DialogContentText> */}
        <Typography variant='body2' paragraph>
            You will join this bet theme as a banker:
        </Typography>
        <Typography variant='body2'>
            {name}
        </Typography>
      {/* </DialogContentText> */}
      <FormControl component="fieldset">
            <FormLabel component="legend">Your Prediction</FormLabel>
            <RadioGroup value={prediction} aria-label="gender" name="radio-buttons-group" onChange={e => setPrediction(e.target.value)}>
                <FormControlLabel value={true} control={<Radio />} label="Will happen" />
                <FormControlLabel value={false} control={<Radio />} label="Will not happen" />
            </RadioGroup>
        </FormControl>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="pool"
        type="text"
        fullWidth
        variant="standard"
        value={pool}
        onChange={(e) => setPool(e.target.value)}
      />
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="odd"
        fullWidth
        variant="standard"
        value={odd}
        onChange={(e) => setOdd(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onGo}>Go</Button>
      <Button onClick={onClose}>Cancel</Button>
    </DialogActions>
  </Dialog>
}