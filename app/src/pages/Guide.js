import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { myBets } from '../eth';
import { Box, Typography } from '@mui/material';

export default function Guide() {
  const [rows, setRows] = React.useState([]);

  const fetchData = async  () => {
    const r = await myBets();
    setRows(r);
    return;
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (<Box marginTop={2}>
    <Typography variant='h3' paragraph>Guidance</Typography>

    <Typography variant='h4' paragraph>Introduction </Typography>
    <Typography variant='body1' paragraph> <span style={{"fontWeight": 'bold'}}>FishBet</span> is a blockchain-based guessing platform, providing a lawful, fair, and transparent way to participate in various kinds of thematic guessing activities. You can create betting themes, act as bankers, and participate in matchmaking based on your preferences, confidence level, guessing style and amount of available funds. Whether you are sports enthusiasts, esports fans, or interested in other topics, <span style={{"fontWeight": 'bold'}}>FishBet</span> can help you to immerse in the guessing world. 
 </Typography>

<Typography variant='h4' paragraph>Pages</Typography>

<Typography variant='h5' paragraph>Home</Typography>
<Typography variant='body1' paragraph>Home page displays all the themes created by users so far, click on the triangle button to show the details and join the handicap. If there is a banker on your choice, click the button to join. You also can become a host if there are no satisfactory odds. Be cautious: if you intend to join as a banker, please ensure that the pool is divisible by the odds. 
</Typography>
<Typography variant='h5' paragraph>Create Theme 
</Typography>
<Typography variant='body1' paragraph>If you wish to create a theme, please switch to Create Theme page and fill in the corresponding information (only payment of gas fees).  
</Typography>
<Typography variant='body1' paragraph> - Theme name: pick a clear and concise theme name to let everyone know what you want to bet 
</Typography>
<Typography variant='body1' paragraph> - Description: describe your theme in detail to make it easier for participants to understand your theme 

</Typography>
<Typography variant='body1' paragraph> - Source: for your theme, you need to provide a link for the participants to verify the results 

</Typography>
<Typography variant='body1' paragraph> - End time: each theme has a closing time for guessing, so please confirm when your theme should stop accepting bets 
</Typography>
<Typography variant='h5' paragraph>My Bets</Typography>
<Typography variant='body1' paragraph> After connecting your wallet, you can check the themes you created or participated in via My Bets page. There is a table that lists theme names, current odds, betting amount, expect returns, whether you are the banker, your predictions, results and other detailed information, and the status of all the relevant themes can be found here. 
</Typography>
<Typography variant='h4' paragraph>Betting </Typography>
<Typography variant='body1' paragraph>In the betting, there are three parties involved: theme owner, bankers, and participants. The owner is responsible for providing all relevant information about the theme. Bankers are the first to create orders. They analyse the information provided by the theme owner, make predictions and set the pool. The pool refers to the total amount of rewards that will be distributed among the winners. Participants are the ones who take the handicaps, and they can choose to participate in the order with the maximum odds of their predictions. Each user can be either one of the parties and receive corresponding rewards after the theme happens. 
  </Typography>
<Typography variant='h4' paragraph>Create an Order 
  </Typography>
<Typography variant='body1' paragraph>When creating an order, the banker needs to make the prediction, provide the initial odds and pay the deposit. The deposit is required to be no less than 100, the odds is an integer, and the deposit should be a whole multiple of the odds. 
  </Typography>
<Typography variant='body1' paragraph>Here are some examples: 
  </Typography>
<Typography variant='body1' paragraph>✔	Prediction: will happen		Deposit: 1,000		Odds: 5 
  </Typography>
<Typography variant='body1' paragraph>✘	Prediction: will not happen	Deposit: 90			Odds: 9 
  </Typography>
<Typography variant='body1' paragraph>✘	Prediction: will happen		Deposit: 5,000		Odds: 3 </Typography>
<Typography variant='h5' paragraph>Join the Handicap 
  </Typography>
<Typography variant='body1' paragraph>The system will automatically display the order with the maximum odds under the selected prediction. If the odds match the requirement of the participants and there is still a pool remaining, the bet can be placed. 
  </Typography>
<Typography variant='h5' paragraph>Definition and Explanation </Typography>
<Typography variant='body1' paragraph>Here are some explanations and calculations of relevant concepts that will hopefully help users understand the process of betting. 
 </Typography>
<Typography variant='h6' paragraph>Odds 
 </Typography>
<Typography variant='body1' paragraph>Odds in <span style={{"fontWeight": 'bold'}}>FishBet</span> is required between 0.1 and 9.9. 
 </Typography>
<Typography variant='body1' paragraph>E.g. Odds = 0.2    →    Odds of 0.2 or 1:5 
 </Typography>
<Typography variant='h5' paragraph>Pool  </Typography>
<Typography variant='body1' paragraph>The pool is calculated by the deposit and the odds provided by the banker when creating an order, which is equal to the deposit divided by the odds. The remaining pool after the banker's deposit is deducted from the total pool is the amount that participants can take part in.                             
 </Typography>
<Typography variant='body1' paragraph>E.g. If the banker set the deposit as 1,000 and the odds as 5, then the total pool of this order is 1,000 / 0.5 = 2,000. For participants, the handicap is 2,000 – 1,000 = 1,000, and no further bets can be placed when the amount invested is over the pool. 
 </Typography>
 <Typography variant='h5' paragraph>Settlement 
  </Typography>
<Typography variant='body1' paragraph>When the results of the theme can be verified, the betting parties will receive the corresponding token settlement according to the odds. The settlement of <span style={{"fontWeight": 'bold'}}>FishBet</span> is manual. During the buffer period administrators will verify the results and ensure that everyone is settled correctly.                              
 </Typography>





  </Box>)
}
