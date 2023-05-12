import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { myBets } from '../eth';

function createData(name, participants, odd, createTime, pool, betAmount, joinTime, result, prediction) {
  return { name, participants, odd, createTime, pool, betAmount, joinTime, result, prediction };
}
const rows = [
  createData('Will it rain tomorrow', 159, 6.0, '1991-01-01', 10000, 200, '1991-02-03', 1, 1),
  createData('Will the sun drop down', 237, 100.0, '2009-09-21', 200, 10, '2010-01-01', -1, 1),
  createData('Will QS rank of UoB goes up', 237, 100.0, '2019-09-21', 800, 60, '2022-03-01', 0, 0),
];

export default function MyBets() {

  const fetchData = () => {
    return new Promise((resolve) => {
      myBets().then((res) => {
        resolve(res);
      })
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper} style={{marginTop: 20}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Odd</TableCell>
            <TableCell align="right">Bet Amount</TableCell>
            <TableCell align="right">Pool</TableCell>
            <TableCell align="right">Prediction</TableCell>
            <TableCell align="right">Result</TableCell>
            <TableCell align="right">Join Time</TableCell>
            <TableCell align="right">Create Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.odd}</TableCell>
              <TableCell align="right">{row.betAmount}</TableCell>
              <TableCell align="right">{row.pool}</TableCell>
              <TableCell align="right">{row.prediction ? 'Will Happen' : 'Will Not Happen'}</TableCell>
              <TableCell align="right">{row.result === 0 ? 'Lose' : row.result === -1 ? 'On Going' : 'Win'}</TableCell>
              <TableCell align="right">{row.joinTime}</TableCell>
              <TableCell align="right">{row.createTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
