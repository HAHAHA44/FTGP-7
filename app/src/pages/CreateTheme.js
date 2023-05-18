import React, {useState} from 'react';
import { TextField, Button, Container, Stack, Radio, FormControl, RadioGroup, FormLabel, FormControlLabel } from '@mui/material';
import { Link } from "react-router-dom"
import { createGuessTheme } from "../eth/index"
import { useNavigate } from "react-router-dom";
import { EventBus, notification } from '../eventbus';

 
const CreateTheme = () => {
    const [themeName, setThemeName] = useState('')
    const [desc, setDesc] = useState('')
    const [endTime, setEndTime] = useState("0");
    const [source, setSource] = useState('');
    const [pool, setPool] = useState(100000)
    const [odd, setOdd] = useState(2)
    const [prediction, setPrediction] = useState(true)
    const navigate = useNavigate();
 
    async function handleSubmit(event) {
        event.preventDefault();
        console.log(themeName, prediction, pool, odd);
        const ret = await createGuessTheme(pool, themeName, desc, Math.floor((Date.parse(endTime) - Date.now())/1000), source);
        console.log("create theme success", ret);
        navigate("/");
        notification('create theme success');
    }
 
    return (
        <React.Fragment>
            <h1>Create a guess theme</h1>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Theme name"
                    onChange={e => setThemeName(e.target.value)}
                    value={themeName}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Description"
                    onChange={e => setDesc(e.target.value)}
                    value={desc}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                 <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Source"
                    onChange={e => setSource(e.target.value)}
                    value={source}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />

                {/* <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Last Name"
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    fullWidth
                    required
                /> */}
                <TextField
                    type="datetime-local"
                    variant='outlined'
                    color='secondary'
                    label="End time"
                    onChange={e => setEndTime(e.target.value)}
                    value={endTime}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                {/* <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>

                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Pool(Gwei)"
                        onChange={e => setPool(e.target.value)}
                        value={pool}
                        fullWidth
                        required
                    />
                    <TextField
                        type="datetime-local"
                        variant='outlined'
                        color='secondary'
                        label="End time"
                        onChange={e => setEndTime(e.target.value)}
                        value={endTime}
                        fullWidth
                        required
                    />
                </Stack> */}

                {/* <FormControl component="fieldset" sx={{mb: 4}}>
                    <FormLabel component="legend">Your Prediction</FormLabel>
                    <RadioGroup value={prediction} aria-label="gender" name="radio-buttons-group" onChange={e => setPrediction(e.target.value)}>
                        <FormControlLabel value={true} control={<Radio />} label="Will happen" />
                        <FormControlLabel value={false} control={<Radio />} label="Will not happen" />
                    </RadioGroup>
                </FormControl> */}

                <Button variant="outlined" color="primary" type="submit" style={{ display: 'block' }}>Create</Button>
            </form>
            {/* <small>Already have an account? <Link to="/login">Login Here</Link></small> */}
     
        </React.Fragment>
    )
}
 
export default CreateTheme;