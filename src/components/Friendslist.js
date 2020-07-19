import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Typography, Fab, ButtonBase } from '@material-ui/core';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
//import friendsImage from '../resources/friends.svg';
import friendsImage from '../resources/people.jpg';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { useState, useEffect } from 'react';
import { currentlyLoggedUsername } from '../services/ConfigService';
import { getUser, getNames, deleteFriend, addFriend } from "../services/ProfileService";
import ChatDialog from '../components/ChatDialog';

const config = require("../services/ConfigService");
const useStyles = makeStyles((theme) => ({

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
    height: "40%",
    backgroundImage: 'url(' + friendsImage + ')',
    backgroundRepeat: "no-repeat",
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
    color: "#E1DEDE",
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    width: '70%',
    marginTop: "1%",
    background: "white",
    marginLeft: "18px",
    marginBottom: "3px",
  },

  post: {
    float: 'right',
    marginTop: "1%",
    marginRight: "5%"
  },
  ele: {

    position: 'relative',
    justifyContent: 'inherit',

  },

  friend: {
    height: "30px",
    padding: "3px",
  },

  delete: {
    float: "right",
  },

  liste: {
    maxHeight: "150px", // used fixed values, otherwise overflow doesnt work
    width: "90%",
    overflow: "auto",
    float: "left",
  },

}));


export default function Friendslist(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState(null);
  const [inputfriends, setinputfriends] = React.useState("");
  const [showfriends, setshowfriends] = React.useState([]); //delete after testing
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [selectedUser, setSelecterUser] = useState(null);

  useEffect(() => {
    handleTick();
    const interval = setInterval(() => handleTick(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleTick = () => {
    getUser(config.currentlyLoggedUsername).then(({ data }) => {
      setUser(config.currentlyLoggedUsername);
      getNames(data.friendlist).then(data => {
        setshowfriends((createnewarray(data)))
      });
  })};

  const createnewarray = (array) => {
    const arraynew = array.map(x => x.data.username);
    return arraynew
  }
  
  const onChangeContent = (event) => {
    setinputfriends(event.target.value);
  };
 
  const removeFriend = (username) => {
    deleteFriend(username)
    handleTick();
    alert("Friend removed")
  }

  const handleSubmit = (event) => {
    if (showfriends.includes(inputfriends) == true) {
      alert('Friend is already in Friendlist');
      clear();
    }
    else {
      const friendslist = {
        username: user,
        friendname: inputfriends
      };
      addFriend(friendslist)
          clear();
          handleTick();
        
    }
  };

  const sendNametoParent = (event) => {
    props.callbackFromParent(event);
    console.log("send");
  }

  const handleDialogClose = () => {
    setChatDialogOpen(false);
  };

  function Friend(props) {
    return (
      <div className={classes.friend}>
        <span style={{ fontWeight: "bold" }} onClick={e => sendNametoParent(props.username)}>{props.username}</span>
        <Button size="small" variant="contained" onClick={e => removeFriend(props.username)} className={classes.delete}>
          delete
        </Button>
        <IconButton edge="end" aria-label="comments" onClick={() => {
          setSelecterUser(props.username);
          setChatDialogOpen(true);
        }}>
          <CommentIcon/>
        </IconButton>
        <Divider className={classes.divider} light />
      </div>
    );
  }

  const clear = () => {
    setinputfriends("");
  }

  function Listoffriends(props) {
    return (
      <div>
        {props.list.map(c => <Friend username={c} />)}
      </div>
    );
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12} >
        <Typography variant="h5" className={classes.headline} />
      </Grid>

      <Grid item xs={12} style={{ height: "100%" }}>
        <div className="App">
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
            />
            <CardContent className={classes.content}>
              <Divider className={classes.divider} light />
              <Typography
                className={"MuiTypography--heading"}
                variant={"h6"}
                gutterBottom
              >   
                My Friends
              </Typography>

              <div className={classes.element}>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                </Typography>
                
                <Divider className={classes.divider} light />
                <div className={classes.liste}>
                  <Listoffriends list={showfriends}></Listoffriends>
                </div>
              </div>
            </CardContent>
          </Card>
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
        </div>
      </Grid>
      <ChatDialog open={chatDialogOpen} handleClose={handleDialogClose} targetUser={selectedUser}/>
    </Grid>
  );
}  