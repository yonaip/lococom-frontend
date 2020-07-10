import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Typography, Fab, ButtonBase } from '@material-ui/core';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import commentImage from '../resources/comment.svg';
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
backgroundImage: 'url('+ commentImage+')',
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

comment: {
    background: '#E5E5E5',
    textTransform: 'none',
    textAlign: "left",
    flexgrow: 1,
    marginTop: "1%",
    borderRadius: theme.shape.borderRadius,
    color: "black",
    fontSize: 15,
    float: 'left',
    minHeight: "20px",
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


},
}));



export default function CommentOverview(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState(null);
  const [comments, setComments] = React.useState([])
  const getUser = React.useCallback(() => {
   setUser(config.currentlyLoggedUsername); 
}, []);
React.useEffect(() => {
    if(user == null){
    setInterval(() => {
        getUser();
        let url = "/api/comment/getCommentProfile/" + config.currentlyLoggedUsername
        axios
        .get(url)
        .then(({ data }) => {
            setComments(data);
        }); 
      }, 10000); ;}
}, [getUser]);


function Comment(props) {
    return (
        <div className={classes.comment}>
            <span style={{fontWeight: "bold"}}>{props.username}  :  </span>
            <span>{props.content}</span>
        </div>
        
    );
}

function CommentList(props) {
    return (
        <div>
             {props.commentList.map(c => <Comment content={c.content} username={c.username}  />)}
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
         My Comments
        </Typography>

        <div className={classes.element}>
        <Typography
          className={"MuiTypography--subheading"}
          variant={"caption"}
        >
        </Typography>
        <Divider className={classes.divider} light />
        <CommentList commentList={comments} />
        </div>
      </CardContent>
    </Card>
  </div>

      </Grid>
     
      </Grid>
  );
}