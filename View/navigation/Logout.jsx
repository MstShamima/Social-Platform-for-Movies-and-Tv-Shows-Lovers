import React from 'react'
import { useState } from "react";
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) =>({
      
     Menu:{
          marignTop:theme.spacing(10)
     }
     
                   

}))

const Logout = () => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const logout = Boolean(anchorEl);
    const history = useHistory();
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      
      localStorage.removeItem("authToken");
      history.push('/login');
      setAnchorEl(null);

    };

    const closeMenu = ()=>{
        setAnchorEl(null);
    }
    return (
        <div>
        <SettingsIcon style={{ fontSize: 30 }} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} />
           <div className={classes.Menu}>
           <Menu
           id="fade-menu"
           anchorEl={anchorEl}
           keepMounted
           open={logout}
           onClose={closeMenu}
           TransitionComponent={Fade}
           >
           <MenuItem onClick={handleClose}>Logout</MenuItem>
       
           </Menu>
           </div>
        </div>
    )
}

export default Logout;