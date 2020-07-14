import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Typography, Fab, ButtonBase } from '@material-ui/core';
import axios from 'axios';
import requestimg from '../resources/request.png';
import walkerimg from '../resources/shoes.png';
import photoimg from '../resources/photograph.png';
import natureimg from '../resources/nature.png';
import alertimg from '../resources/alert.png';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import commentImage from '../resources/comment.svg';
import discussionImage from '../resources/plaudern.svg';
const config = require("../services/ConfigService");
const useStyles = makeStyles((theme) => ({

    
  root: {
    background: '#CAE2E5',
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    flexGrow: 1,
    height:"140%",
  },


headline: {
color: "black",
textAlign: 'center',
padding: theme.spacing(1),
flexGrow: 2,
marginTop: "2%"
},

card: {
maxHeight: 750,
maxWidth: 400,
margin: "auto",
transition: "0.3s",
boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
"&:hover": {
  boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
}
},
media: {
// paddingTop: "10%",
width: "15vw",
height: "15vw",
backgroundImage: 'url('+ discussionImage+')',
backgroundRepeat: "no-repeat",
backgroundSize:"70%",
backgroundPosition: "right",
},
content: {
textAlign: "left",
//padding: muiBaseTheme.spacing.unit * 3
},
divider: {
// margin: `${muiBaseTheme.spacing.unit * 3}px 0`
},
heading: {
fontWeight: "bold"
},
subheading: {
lineHeight: 1.8
},

  text: {
    color: "black",
    textAlign: 'left',
    padding: theme.spacing(1),
    flexGrow: 2,
    marginBottom: "2%"
  },

  titletext: {
    color: "black",
    textAlign: 'left',
    marginBottom: "2%",
    height: "100%",
    width: "70%",
    marginLeft: "20%",
    overflow: "auto",
  
  },

  element: {
    maxHeight: 500,
    maxWidth: 400,
    overflow: "auto",

  },

  request: {
    backgroundColor:"#B5CDD0",
    marginTop: "2%",
    width: "5",
    height: "100%",
    borderRadius:"50%",
    backgroundImage: 'url('+ requestimg+')',
    backgroundRepeat: "no-repeat",
    backgroundSize:"70%",
    backgroundPosition: "center",
    float: 'left',
  },
  walking: {
    backgroundColor:"#B5CDD0",
    marginTop: "2%",
    width: "5",
    height: "100%",
    borderRadius:"50%",
    backgroundImage: 'url('+ walkerimg+')',
    backgroundRepeat: "no-repeat",
    backgroundSize:"70%",
    backgroundPosition: "center",
    float: 'left',
  },
  nature: {
    backgroundColor:"#B5CDD0",
    //marginTop: "2%",
    width: "5",
    height: "100%",
    borderRadius:"50%",
    backgroundImage: 'url('+ natureimg+')',
    backgroundRepeat: "no-repeat",
    backgroundSize:"60%",
    backgroundPosition: "center",
    float: 'left',
  },
  photo: {
    backgroundColor:"#B5CDD0",
    width: "5",
    height: "100%",
    borderRadius:"50%",
    backgroundImage: 'url('+ photoimg+')',
    backgroundRepeat: "no-repeat",
    backgroundSize:"70%",
    backgroundPosition: "center",
    float: 'left',
  },
  hint: {
    backgroundColor:"#B5CDD0",
    width: "5",
    height: "100%",
    borderRadius:"50%",
    backgroundImage: 'url('+ alertimg+')',
    backgroundRepeat: "no-repeat",
    backgroundSize:"70%",
    backgroundPosition: "center",
    float: 'left',
  },
  topic: {
    width: 60,
    height: 60, 
    float: 'left',
    margin: theme.spacing(1,3),
},
discussion: {
    background: '#E5E5E5',
    textTransform: 'none',
    textAlign: "left",
    flexgrow: 1,
    marginTop: "1%",
    borderRadius: theme.shape.borderRadius,
    color: "black",
    fontSize: 10,
    float: 'left',
    height: "60px",
    width: "95%",
    padding: "2px",
      
  },
  disc:{
  
    maxHeight: "400px", // used fixed values, otherwise overflow doesnt work
    width: "90%",
overflow: "auto",
padding: "5px",
float: "left",
  },

  ratingNumber: {
    
    textAlign: 'center',
    float: "right",
    
    marginTop: "4%",

},
}));



export default function DiscussionOverview(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState(null);
  const [ratingNum, setRatingNum] = React.useState("0");
  const [discussions, setDiscussions] = React.useState([])
  const getUser = React.useCallback(() => {
   setUser(config.currentlyLoggedUsername); 
}, []);
React.useEffect(() => {
    if(user == null){
    setInterval(() => {
        getUser();
        let url = "/api/discussion/getDiscussionProfile/" + config.currentlyLoggedUsername
      axios
      .get(url)
      .then(({ data }) => {
       setDiscussions(data);
        }); 
      }, 10000); ;}
}, [getUser]);


function Discussion(props) {
    return (
        <div className={classes.discussion}>
            <Button variant="outlined" className={props.topic === 'Nature' ? classes.nature : props.topic === 'Request' ? classes.request : props.topic === 'Walking' ? classes.walking : props.topic === 'Photo' ? classes.photo : props.topic === 'Hint' ? classes.hint : classes.hint}> </Button>
            
            <div className={classes.ratingNumber} style={{ fontSize: 25 }}>
                {props.votes}
                </div>
          
            <div className={classes.titletext} style={{ fontSize: 20 }}>
            
            {props.title}
             
             
                </div>
               
            
        </div>
    );
}

function DiscussionList(props) {
    return (
        <div>
            {props.discussionList.map(c => <Discussion topic={c.topic} title={c.title} votes={c.votes}/>)}
        </div>
    );
}

  return (
    
        <Grid container className={classes.root} justify="center">
      <Grid item xs={12} >
          <Typography variant="h5" className={classes.headline}/>
         
         
      </Grid>
     
      <Grid item xs={11} style={{  height: "100%"}}>
    
      <div className="App">
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          
        />
        <CardContent className={classes.content}>

          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
            
            <Divider className={classes.divider} light />
           My Discussions
          </Typography>
          <div className={classes.element}>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
          </Typography>
          <Divider className={classes.divider} light />
          <DiscussionList discussionList= {discussions}></DiscussionList>
          </div>
        </CardContent>
      </Card>
    </div>
    
   
      </Grid>
     
      </Grid>
  );
}