import React from 'react';
import { makeStyles, Toolbar,AppBar, Typography,InputBase,alpha,Badge,Avatar } from "@material-ui/core";
import { useState } from "react";
import { Search, Mail, Notifications,Cancel } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import SettingsIcon from '@material-ui/icons/Settings';
import Logout from './navigation/Logout';

const useStyles = makeStyles((theme) =>({
        Toolbar:{
            
             display:"flex",
             justifyContent:"space-between",
            
             
        },
        logoLg:{
            marginLeft: theme.spacing(1),
            display : "none",
            [theme.breakpoints.up("sm")]:{
                display: "block",
            },
        },
        logoSm:{
            marginLeft: theme.spacing(1),
            display : "block",
            [theme.breakpoints.up("md")]:{
                display: "none",
            },
        },
        search:{
            marginLeft: theme.spacing(1),
            display: "flex",
            alignItems: "center",
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            width: "50%",
            borderRadius: theme.shape.borderRadius,
            [theme.breakpoints.down("sm")]:{
                display: (props) => (props.open ? "flex": "none"),
            },


        },
        InputBase:{
            marginLeft: theme.spacing(1),
            color: "white",
            marginLeft: theme.spacing(1),
            width: "100%"
        },
        icons:{
            display: "flex",
            alignItems: "center",
            marginLeft: theme.spacing(1),
            [theme.breakpoints.down("sm")]:{
                display: (props) => (props.open ? "none": "flex"),
            }
            
            
        },
        badge:{ 
            marginRight: theme.spacing(2)
        },
        searchButton:{
             marginRight: theme.spacing(1),
             [theme.breakpoints.up("sm")]:{
                display: "none"
            },
        },
        cancel:{
            display:"none",
            [theme.breakpoints.down("sm")]:{
                display: "flex"
            }
        }
          
}))
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const classes = useStyles({open});
    
   const history = useHistory();

   const handleRoute = (result) =>{
        history.push(result)
   }

   return (
      <AppBar position="fixed">
          <Toolbar className={classes.Toolbar}>
             <Typography variant="h4" className={classes.logoLg} onClick={()=>handleRoute("/")}>
                 Rabib 
             </Typography>
             <Typography variant="h4" className={classes.logoSm}>
                 Hossain 
             </Typography>
             <div className={classes.search}>
                    <Search/>
                    <InputBase placeholder="Search..." className={classes.InputBase}/>
                    <Cancel className={classes.cancel} onClick={()=> setOpen(false)}/>
             </div>
             <div className={classes.icons} >
                 <Search className={classes.searchButton} onClick={()=> setOpen(true)}/>
             <Badge badgeContent={4} color="secondary" className={classes.badge}>
               <Mail />
               </Badge>
               <Badge badgeContent={4} color="secondary" className={classes.badge}>
               <Notifications />
                </Badge>
                <Logout/>
             </div>
             
          </Toolbar>
      </AppBar>
   )
};

export default Navbar;