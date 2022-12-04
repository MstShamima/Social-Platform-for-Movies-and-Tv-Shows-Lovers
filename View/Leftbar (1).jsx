import { Container, makeStyles, Typography } from "@material-ui/core";
import { Home,Person,List,PhotoCamera,PlayCircleOutline} from "@material-ui/icons";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) =>({
          container:{
             position:"sticky",
             top:0,
             height:"100vh",
             color:"white",
             paddingTop:theme.spacing(10),
             backgroundColor: theme.palette.primary.main,
             [theme.breakpoints.up("sm")]:{
                backgroundColor:"white",
                color:"#555",
                border:"1px solid #ece7e7"
            }
          },
          item:{
             display:"flex",
             alignItems:"center",
             marginBottom:theme.spacing(3),
             [theme.breakpoints.up("sm")]:{
                marginBottom:theme.spacing(3),
                cursor:"pointer"
             }
          },
          text:{
            fontWeight:500,
             [theme.breakpoints.down("sm")]:{
                display:"none",
             }
          },
          icon:{
             fontWeight:500,
             marginRight:theme.spacing(1),
             [theme.breakpoints.up("sm")]:{
                fontSize:"18px"
             }
          }
}))
const Leftbar = () => {
   const classes = useStyles();
   const history = useHistory();

   const handleRoute = (result) =>{
      
        history.push('/'+result)
   }

   return (
       <Container className={classes.container}>
          <div className={classes.item}>

             
             <Home className={classes.icon}/>
             <Typography className={classes.text}>Homepage</Typography>
                       
          </div>
          <div className={classes.item}>
             
             <Person className={classes.icon} onClick={()=> handleRoute("about")}/>
             <Typography className={classes.text} onClick={()=> handleRoute("about")}>About</Typography>
                       
          </div>
          <div className={classes.item}>
             <List className={classes.icon} onClick={()=> handleRoute("trending")} />
             <Typography className={classes.text} onClick={()=> handleRoute("trending")}>Movies & Tv Shows</Typography>            
          </div>
          <div className={classes.item}>
             <PhotoCamera className={classes.icon} onClick={()=> handleRoute("search")}/>
             <Typography className={classes.text} onClick={()=> handleRoute("search")}>Search</Typography>            
          </div>
          <div className={classes.item}>
             <PlayCircleOutline className={classes.icon} onClick={()=> handleRoute("database")}/>
             <Typography className={classes.text} onClick={()=> handleRoute("database")}>Database</Typography>            
          </div>
          <div className={classes.item}>
             <Home className={classes.icon}/>
             <Typography className={classes.text} onClick={()=> handleRoute("landing")}>Landing Page</Typography>            
          </div>
          
          
       </Container>
   )
};

export default Leftbar;