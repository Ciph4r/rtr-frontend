import React from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Authentication from "../middleware/auth"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function MenuAppBar(props) {
  const classes = useStyles();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl ] = React.useState(null);
  const [anchorE2, setAnchorE2, ] = React.useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorE2);

  const history = useHistory()
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenu2 = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorE2(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style = {{backgroundColor: 'grey'}}>


            <div>
                   
          <IconButton 
          color="inherit" 
          aria-label="menu"
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleMenu2}
          >
            <MenuIcon />
            </IconButton>
            <Menu
                id="menu"
                anchorEl={anchorE2}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open2}
                onClose={handleClose2}
              >
                <MenuItem onClick={() => {history.push("/") }}>DashBoard</MenuItem>
                <MenuItem onClick={() => {history.push("/portfolio")}}>My Portfolio</MenuItem>
                <MenuItem onClick={() => {history.push("/createStock")}}>Create Stock</MenuItem>
                <MenuItem onClick={handleClose2}>placeHolder</MenuItem>
                <MenuItem onClick={handleClose2}>placeHolder</MenuItem>
                <MenuItem onClick={handleClose2}>placeHolder</MenuItem>
              </Menu>
          
          </div>
    




          <Typography variant="h6" className={classes.title}>
            {props.children}
          </Typography>
            <h2>{props.user.email}</h2>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {history.push("/profile") }}>Profile</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={() => {
                    Authentication.logout(() => {
                        props.logout(()=> {history.push("/")})
                    })
                }}>LogOut</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}