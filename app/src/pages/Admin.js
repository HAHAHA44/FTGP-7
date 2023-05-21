import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { cancel, connect, getGuessThemes, myBets, settle } from '../eth';
import CancelIcon from '@mui/icons-material/Cancel';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { notification } from '../eventbus';


export default function Admin() {
  const [rows, setRows] = React.useState([]);

  const handleSettle = async (id, option) => {
    if (option === -1) {
        const res = await cancel(id);
        if (res) {
          notification("cancel theme " + id + " success");
        } else {
          notification("cancel theme " + id + " failed", "error");
        }
    }
    else {
        const res = await settle(id, option);
        if (res) {
          notification("settle theme " + id + " success");
        } else {
          notification("settle theme " + id + " failed", "error");
        }
    }
    return;
  }
  // const yesIcon = (
  //   <IconButton onClick={console.log("delete")}>
  //     <CheckCircleIcon color="success" />
  //   </IconButton>
  // );

  // const noIcon = (
  //   <IconButton onClick={console.log("edited")}>
  //     <CancelIcon color="error" />
  //   </IconButton>
  // );

  // const cancelIcon = (
  //   <IconButton onClick={console.log("cancelled")}>
  //     <DeleteIcon color="" />
  //   </IconButton>
  // );

  const fetchData = async () => {
    const r = await getGuessThemes(0, 10000);
    setRows(r);
    return;
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper} style={{ marginTop: 20 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Options</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Ended</TableCell>
            <TableCell align="right">FinalOption</TableCell>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">noOdd</TableCell>
            <TableCell align="right">yesOdd</TableCell>
            <TableCell align="right">noPool</TableCell>
            <TableCell align="right">yesPool</TableCell>
            <TableCell align="right">Create Time</TableCell>
            <TableCell align="right">Source</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <IconButton disabled={row.ended} onClick={() => {handleSettle(row.id, 1)}}>
                  <CheckCircleIcon color="success" />
                </IconButton>
                <IconButton disabled={row.ended} onClick={() => {handleSettle(row.id, 0)}}>
                  <CancelIcon color="error" />
                </IconButton>
                <IconButton disabled={row.ended} onClick={() => {handleSettle(row.id, -1)}}>
                  <DeleteIcon color="" />
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.ended ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{row.finOp === 9999 ? "None" : row.finOp === 0 ? "No" : "Yes"}</TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.noOdd}</TableCell>
              <TableCell align="right">{row.yesOdd}</TableCell>
              <TableCell align="right">{row.noPool}</TableCell>
              <TableCell align="right">{row.yesPool}</TableCell>
              <TableCell align="right">{row.startTime}</TableCell>
              <TableCell align="right">{row.source}</TableCell>
              <TableCell align="right">{row.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
