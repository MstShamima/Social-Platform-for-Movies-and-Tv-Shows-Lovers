import { Container,makeStyles,Tooltip,Fab, Modal,TextField,MenuItem,RadioGroup,FormControlLabel,Radio,Button,FormLabel,FormControl,InputLabel,Select,Snackbar} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert"
import { Add as AddIcon} from "@material-ui/icons";
import { useState } from "react";
import * as React from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) =>({
    fab:{
        position:"fixed",
        bottom:10,
        right:10
    },
    Container:{
        width:500,
        height:550,
        backgroundColor:"white",
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        margin:"auto",
        [theme.breakpoints.down("sm")]:{
            width:"100vw",
            height: "100vh"
        }
    },
    form:{
        padding:theme.spacing(2),

    },
    item:{
        marginBottom:theme.spacing(3),
        marginTop:theme.spacing(1),
    }
}))
const Add = () => {
   const classes = useStyles();
   const [open, setOpen] = useState(false)
   const [age, setAge] = React.useState('');
   const [alert, setAlert] = useState(false)

   const handleChange = (event) => {
     setAge(event.target.value);
   };

   const handleClick = () => {
    setAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  

   return (
       <>
        <Tooltip title="Add" arial-label="add" onClick={()=> setOpen(true)}>
            <Fab color="primary" className={classes.fab}>
            <AddIcon/>
            </Fab>
        </Tooltip>
        <Modal open={open}>
            <Container className={classes.Container}>
                <form className={classes.form} autoComplete="off">
                    <div className={classes.item}>
                    <TextField id="standard-basic" label="Title" variant="standard" style={{width:"100%"}} />
                    </div>
                    <div className={classes.item}>
                    <TextField 
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Hi, what do you want  ?"
                   label="Description" variant="outlined" style={{width:"100%"}} />
                    </div>
                    <div>
                <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label">Select Your desired Subject</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                     <MenuItem value={10}>BlockChain</MenuItem>
                     <MenuItem value={20}>Internet of things (IOT)</MenuItem>
                     <MenuItem value={30}>Machine learning</MenuItem>
                   </Select>
                  </FormControl>
                    </div>
                    <div>
                    <FormLabel component="legend" style={{marginTop:20,marginBottom:15}}>Your Gender</FormLabel>
                    <RadioGroup
                           aria-label="gender"
                           defaultValue="female"
                           name="radio-buttons-group"
                            >
                       
                          <FormControlLabel 
                          value="female" 
                          control={<Radio />} 
                          label="Female" />
                         <FormControlLabel 
                         value="male" 
                          control={<Radio />} 
                          label="Male" />
                         <FormControlLabel 
                         value="other" 
                         control={<Radio />} 
                         label="Other" />
                    </RadioGroup>
                    </div>
                    <div className={classes.item}>

                        <Button variant="outlined" color="primary" style={{marginRight:20}}
                         onClick={()=>
                           
                           {
                             setAlert(true)
                             setOpen(false)}
                         
                         }>
                          Create
                        </Button>

                        <Button variant="outlined" color="secondary" onClick={()=> setOpen(false)}>
                          Cancel
                        </Button>

                    </div>
                </form>
            </Container>
        </Modal>
        <Snackbar open={alert} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
          
        </Alert>
      </Snackbar>
      
       </>
   )
};
export default Add;