import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import StockChart from './StockChart'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function StockCard(props) {
  const classes = useStyles();
  


const {name , price , units , history } = props.stock
  return (
    <Card className={classes.root}>
      <div>
       
      </div>
      <CardHeader
        title= {name}
        style = {{backgroundColor: 'grey'}}
      />
      <CardContent >
        {/* <StockChart history = {history} name = {name}/> */}
      </CardContent>
      <CardContent>
          <h2>Price: {price}</h2>
          <h2>Units: {units}</h2>
          
      </CardContent>
     

      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
}