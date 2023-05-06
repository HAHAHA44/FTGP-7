import TextField from '@mui/material/TextField';
import {IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {Stack} from "@mui/material";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const SearchBar = () => {
    return (
    <Stack direction={'row'} spacing={0}>
      <TextField size="small" margin="dense" id="outlined-basic" label="Search" variant="outlined"/>
      <Item>
        <IconButton aria-label="delete">
          <SearchIcon />
        </IconButton>
      </Item>
    </Stack>)
}