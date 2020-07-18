import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Typography, Fab, ButtonBase } from '@material-ui/core';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import defaultUser from '../resources/benutzer.svg';

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
  text: {
    color: "black",
    padding: theme.spacing(2),
    flexGrow: 2,
    marginTop: "2%"
  },

card: {
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
    borderRadius:"50%",
    backgroundImage: 'url('+ defaultUser+')',
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
 
  

}));



export default function CreateDiscussion(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState(null);
  const [discnumber, setDiscNumber] = React.useState(0);
  const [commentnumber, setCommentnumber] = React.useState(0);
  const [email, setEmail] = React.useState("Email");
  const [votes, setVotes] = React.useState(0);
  const [discussionId, setDiscussionId] = React.useState("");
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
        let counter = 0;
        data.map(x=>counter = counter + x.votes)
        setDiscNumber(data.length);
        setVotes(counter)
          }); 

        let route = "/api/comment/getCommentProfile/" + config.currentlyLoggedUsername
          axios
          .get(route)
          .then(({ data }) => {
          setCommentnumber(data.length);
            }); 
      }, 10000); ;}
    
}, [getUser]);


  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={12} >
          <Typography variant="h5" className={classes.headline}>
          
          </Typography>
      </Grid>
      
      <Grid item xs={11} style={{ height: "100%"}}>
          <div />

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
           {user}
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
          </Typography>
          <Divider className={classes.divider} light />
         E-Mail: {email}
         <Divider className={classes.divider} light />
         Number of Discussions: {discnumber}
         <Divider className={classes.divider} light />
         Number of Comments: {commentnumber}
         <Divider className={classes.divider} light />
         Votes: {votes}
        </CardContent>
      </Card>
    </div>
      </Grid>
      </Grid>
  );
}