import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { myBets } from '../eth';

export default function MyBets() {
  const [rows, setRows] = React.useState([]);

  const fetchData = async  () => {
    const r = await myBets();
    setRows(r);
    return;
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
            <TableCell align="right">Expect Income</TableCell>
            <TableCell align="right">Is Banker</TableCell>
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
              <TableCell align="right">{row.amounts}</TableCell>
              <TableCell align="right">{row.income}</TableCell>
              <TableCell align="right">{row.isBanker ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{row.prediction ? 'Will Happen' : 'Will Not Happen'}</TableCell>
              <TableCell align="right">{row.result === 0 ? 'Ongoing' : row.result === 1 ? 'Win' : row.result === 2 ? 'Lose' : 'Cancelled'}</TableCell>
              <TableCell align="right">{row.joinTime}</TableCell>
              <TableCell align="right">{row.createTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
