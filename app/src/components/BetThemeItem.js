import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, ButtonGroup } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {name, createTime, img, prediction, participants, pool, odd} = props.data;
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={createTime}
      /> */}
      <CardMedia
        component="img"
        height="194"
        image={img}
        alt="Theme"
      />
      {/* <CardContent>
        <Typography variant="head3">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.{name}
        </Typography>
      </CardContent> */}
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
        title={name}
        titleTypographyProps={{variant: 'h6'}}
        subheaderTypographyProps={{variant: 'subtitle1'}}
        subheader={createTime}
      />
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions> */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant='subtitle1'>Top Handicap</Typography>
          <Typography variant='body2'>
            Prediction: {prediction ? 'Will happen' : 'Will not happen'}
          </Typography>
          <Typography variant='body2'>
            Odd: {odd}
          </Typography>
          <Typography variant='body2'>
            Pool: {pool}
          </Typography>
          <Typography variant='body2' paragraphz>
            Total participants: {participants}
          </Typography>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button startIcon={<MonetizationOnIcon></MonetizationOnIcon>}>Join handicap</Button>
            <Button startIcon={<AccountBalanceIcon></AccountBalanceIcon>}>Join as Banker</Button>
          </ButtonGroup>

        </CardContent>
      </Collapse>
    </Card>
  );
}