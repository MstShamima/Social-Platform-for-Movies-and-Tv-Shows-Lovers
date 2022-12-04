import { Avatar,TextField,Card, Container, makeStyles,CardActions, CardActionArea, CardMedia, CardContent, Typography,Button,Grid } from "@material-ui/core";
import React,{useState,useEffect,useRef } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Comments from "./Comments";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) =>({
    container:{
        
        marginTop:theme.spacing(2),
        height:'100%',
        display:'flex',
        flexDirection: 'column'
        
     },
     media:{
         height:150,
         paddingTop:'56.25%',
         [theme.breakpoints.down("sm")]:{
              height:150
         }
     },
     Button:{
         marginTop:theme.spacing(2),
         display:'flex',
         flexDirection: 'row',
         justifyContent:'right'
     },
     avatar:{
         display:'flex',
         
         
     },
     Name:{
         marginTop:5,
         marginLeft:5,
         
     },
     Status:{
         marginTop:theme.spacing(2),
     },
     root: {
        width: '100%',
        maxWidth: '100vh',
        backgroundColor: theme.palette.background.paper,
        
    
      },
      inline: {
        display: 'inline',
      },
      Comments:{
           display:"flex",
           flexDirection:"column",
           marginLeft:theme.spacing(2),
      },
      dividerColor: {
       Color: 'blue',
      },
      CommentWrite:{
        
          display: 'flex',
          width: '100%',
          maxWidth: '100vh',
          backgroundColor: theme.palette.background.paper,
          
        
      },
      avatarComment:{
         marginTop: theme.spacing(1.5),
         color: theme.palette.getContrastText(deepPurple[500]),
         backgroundColor: deepPurple[500],
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
      },
      orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
      },
      
    
     
    
}))
const Post = () => {

   const [postValue,setPostValue]= useState();
   const classes = useStyles();
   const [postData,setPostData] = useState([]);
   const history = useHistory();
   const [createPost, setCreatePost]= useState();
   const [change,setChange] = useState(true);

   const [contentVisible, setContentState] = useState(false);
   const [selectComment,setSelectComment] = useState();
   const [name, setName] = useState();


    const toggleCardContent = (result) => {
      
        setSelectComment(result);
        setContentState(!contentVisible);

    };   

   const handleRoute = (result) =>{
      
    history.push('/'+result)
   }
   let value;
   let Comment;

   const makeComment = async(e) =>{  
       console.log(e)       

        try {

        const config = {
            headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }

        const data = await axios.put("http://localhost:8000/api/posts/comment/"+[e],{text: Comment},config);
        console.log(data);
        
        setChange(!change);
        exampleInput.current.value = " "
       
        
       } catch (error) {
        
       }
     }
      const makePost = async(e) =>{         
        e.preventDefault();
        try {

            const config = {
                headers:{
                    "content-Type":"application/json",
                    "x-auth-token": localStorage.getItem("authToken")
                }
            }
    
            const data = await axios.post("http://localhost:8000/api/posts",{text: value},config);
            
            setChange(!change);
            exampleInput.current.value = " "
           
            
        } catch (error) {
            
        }
   }

   useEffect(async(e) => {
        
    let config = {
        headers:{
            "content-Type":"application/json"
        }
    }
    try {
        config = {
            headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = await axios.get("http://localhost:8000/api/posts",config);
        const auth = await axios.get("http://localhost:8000/api/auth",config);
        console.log(auth);

        console.log(data)
        if(data.data){
            setName(auth.data.name);
            setPostData(data.data)
        }
 
    }   catch (error) {
     
        history.push('/login')
    }
  
   },[change])
    
    const exampleInput = useRef();

    const handleSubmit =(e)=>{
          
    }
    const onChange = (e)=>{
        value = e.target.value

    }
    const onComments = (e)=>{
        Comment = e.target.value
    }


   let count = 0;

   return (
       <>
        <Grid>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className={classes.root}>
          <TextField
          id="outlined-multiline-static"
          label="What's on your mind?"
          multiline
          rows={6}
          inputRef={exampleInput}
          fullWidth    
          onChange={(e)=> onChange(e)}
          variant="outlined"
          
        />
          </div>
          <div className={classes.Button} >
        <Button variant="contained" color="primary" type="submit" onClick={(e)=> makePost(e)} >
          Post
        </Button>
         </div>
        </form>
        </Grid>
        
       <Grid container spacing={2}>
           {postData.slice().reverse().map(result => {
               return ( 
            <Grid key={result._id} item md={12} xs={12} sm={6}>
                <Card className={classes.container}>
                   <CardActionArea>                      
                     <CardContent>
                     <div className={classes.avatar}>
                     <Avatar
                     alt={result.name}
                     src="/static/images/avatar/1.jpg"
                     sx={{ width: 24, height: 24 }}
                     className={classes.orange}
                     />
                    <Typography gutterBottom variant="h6" className={classes.Name}>{result.name}</Typography>
                    </div>
                    <Typography variant="body2" className={classes.Status}>{result.text}</Typography>
                    </CardContent>              
                   </CardActionArea>
                   <CardActions>
                       <Button size="small" color="Primary">Like</Button>
                       <Button size="small" color="Primary" onClick={() => 
                         
                          (result.comments.length>0)?toggleCardContent(result._id):toggleCardContent(result._id)
                                     
                        }>Comments ({result.comments.length})</Button>
                   </CardActions>
                   {(result._id == selectComment && contentVisible == true ) ? (
                   <CardActions className={classes.Comments}>
                        {result.comments.map(comments=>{
                              if(comments.length !== 0){
                                  return (
                                <List className={classes.root} key={comments._id}>
                                <ListItem alignItems="flex-start">
                                  <ListItemAvatar>
                                    <Avatar className={classes.purple} alt={comments.name} src="/static/images/avatar/1.jpg" />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={comments.name}
                                    secondary={
                                      <React.Fragment>
                                        <Typography
                                          component="span"
                                          variant="body2"
                                          className={classes.inline}
                                          color="textPrimary"
                                        >
                                          {comments.text}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                  />
                                </ListItem>
                                <Divider classname={classes.dividerColor} variant="inset" component="li"/>
                                                            
                                </List> 
                                
                                )
                            } 
                        })}
                   
                        <div className={classes.CommentWrite}>
                        <Avatar className={classes.avatarComment}
                        
                          alt={name}
                          src="/static/images/avatar/1.jpg"
                          sx={{ width: 15, height: 17 }}
                          />
                        <TextField
                            id="standard-full-width"
                            label="Comment Here"
                            style={{ margin: 8 }}
                            placeholder="Write Here"
                            inputRef={exampleInput}
                            fullWidth
                            onChange={(e)=> onComments(e)}
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <Button className={classes.Button}  variant="contained" color="primary"  onClick={()=> makeComment(result._id)} >
                            Post
                          </Button>
                        </div>                        
                   </CardActions> ):null} 
                   
               </Card>
                     
            </Grid>)
           })}
       </Grid>
        {console.log(count)}
       </>
   )
};

export default Post;