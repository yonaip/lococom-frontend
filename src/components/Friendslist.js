import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Typography, Fab, ButtonBase } from '@material-ui/core';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import friendsImage from '../resources/friends.svg';

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
height: 750,
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
backgroundImage: 'url('+ friendsImage+')',
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
   newComment: {
            maxheight: '10px', 
            float: 'left',
            color: "white",
            borderRadius: theme.shape.borderRadius,
            overflow: "hidden",
            width: '70%',
            marginTop: "70%",
            background: "white",
            marginLeft: "5px",
            marginBottom: "3px",
    },
    
    post: {
        float: 'left',
       marginTop: "70%",
        marginLeft: "2.5%"
    },
    ele:{
     
        position: 'relative',
        justifyContent: 'inherit',
      
    },

}));



export default function Friendslist(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState(null);
  const [inputfriends, setinputfriends] = React.useState("");
  const [showfriends, setshowfriends] = React.useState([]);
  const getUser = React.useCallback(() => {
   setUser(config.currentlyLoggedUsername); 
}, []);

React.useEffect(() => {
    if(user == null){
    setInterval(() => {
        getUser();
        const url = "/api/friendslist/" +config.currentlyLoggedUsername
        axios
        .get(url)
        .then(({ data }) => {
          setshowfriends(data);
          });
      }, 10000); ;}
}, [getUser]);

const onChangeContent = (event) => {
  setinputfriends(event.target.value);
};
const test = () => {
  console.log("erwischt")
}

const handleSubmit = (event) => {
  const friendslist = {
   username: user,
   friends: [{name: inputfriends}]
  };
  axios
  .post('/api/friendslist', friendslist)
  .then(response => {console.log('handle submit')})
  .catch(err => {
    console.error(err);
  });
  
  };
function Friend(props) {
    return (
        <div className={classes.friend}>
            <span style={{fontWeight: "bold"}}>{props.username}</span>
        </div>
        
    );
}

function Listoffriends(props) {
  return (
      <div>
          {props.friendList.map(c => <Friend username={c} />)}
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
         My Friends
        </Typography>

        <div className={classes.element}>
        <Typography
          className={"MuiTypography--subheading"}
          variant={"caption"}
        >
        </Typography>
        <Divider className={classes.divider} light />
        <Listoffriends friendList={showfriends}></Listoffriends>
        </div>
      </CardContent>
      <Grid item xs={12} className={classes.ele}>
      <TextField
              onChange={onChangeContent}
              className={classes.newComment}
              id="outlined-margin-none"
              placeholder="Add Friend"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
          />
      <Button size="large" onClick={handleSubmit} variant="contained" color="primary" className={classes.post}>
            Add
        </Button>
        </Grid>
    </Card>
    
  </div>
  

      </Grid>
     
      </Grid>

  );
  }  