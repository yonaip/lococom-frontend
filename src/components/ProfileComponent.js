import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Typography, Fab, ButtonBase } from '@material-ui/core';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import defaultUser from '../resources/benutzer.svg';
import { getCommentProfile, getUser } from "../services/ProfileService";
import { getDiscussion } from "../services/DiscussionService";

const config = require("../services/ConfigService");
const useStyles = makeStyles((theme) => ({
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
    borderRadius: "50%",
    backgroundImage: 'url(' + defaultUser + ')',
    backgroundRepeat: "no-repeat",
    backgroundSize: "70%",
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



export default function ProfileComponent(props) {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [discnumber, setDiscNumber] = useState(0);
  const [discnumberprofile, setDiscNumberProfile] = useState(0);
  const [commentnumber, setCommentnumber] = useState(0);
  const [commentnumberprofile, setCommentnumberProfile] = useState(0);
  const [email, setEmail] = useState("");
  const [emailprofile, setEmailprofile] = useState("");
  const [votes, setVotes] = useState(0);
  const [votesprofile, setVotesProfile] = useState(0);

  useEffect(() => {
    handleTick()
    const interval = setInterval(() => handleTick(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, [props.profile]);
  
  const handleTick = () => {
    // gets the number of Comments made by the User from the backend
    if (props.profile == "") {
      getCommentProfile(config.currentlyLoggedUsername).then(({ data }) => {
        setCommentnumber(data.length);
        setUser(config.currentlyLoggedUsername);
      });

      // gets the number of Discussions + Votes made by the User from the backend
      getUser(config.currentlyLoggedUsername).then(({ data }) => {
        setDiscNumber(data.discussions.length)
        setVotes(countVotes(data));
        setEmail(data.email)
        getdiscussions(data.discussions).then(data => {
          setVotesProfile(countVotes(data));
        });
      })
    }

    // gets the number of Comments made by the clicked Profile from the backend
    else {
      getCommentProfile(props.profile).then(({ data }) => {
        setCommentnumberProfile(data.length);
        setUser(config.currentlyLoggedUsername);
        });
      // gets the number of Discussions + Votes made by the clicked Profile from the backend

      getUser(props.profile).then(({ data }) => {
        setDiscNumberProfile(data.discussions.length)
        setEmailprofile(data.email);
        setVotesProfile(countVotes(data));
        getdiscussions(data.discussions).then(data => {
        setVotesProfile(countVotes(data))}
      )});
    }
  };

  const getdiscussions = async (discussionids) => {
    try {
      var i;
      var arrayresult = [];
      for (i = 0; i < discussionids.length; i++) {
        arrayresult.push(
          await getDiscussion(discussionids[i]))

      }
      return arrayresult;
    }
    catch{ }
  }

  const countVotes = (array) => {
    var i;
    var x = 0;

    for (i = 0; i < array.length; i++) {
      x = x + array[i].data.votes;
    }
    return x;
  }

  let grid;
  if (props.profile == "") {
    grid = (
      <Grid container justify="center">
        <Grid item xs={12} >
          <Typography variant="h5" className={classes.headline}>

          </Typography>
        </Grid>

        <Grid item xs={11} style={{ height: "100%" }}>
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
  else {
    grid = (
      <Grid container justify="center">
        <Grid item xs={12} >
          <Typography variant="h5" className={classes.headline}>

          </Typography>
        </Grid>

        <Grid item xs={11} style={{ height: "100%" }}>
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
                  {props.profile}
                </Typography>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                </Typography>
                <Divider className={classes.divider} light />
   E-Mail: {emailprofile}
                <Divider className={classes.divider} light />
   Number of Discussions: {discnumberprofile}
                <Divider className={classes.divider} light />
   Number of Comments: {commentnumberprofile}
                <Divider className={classes.divider} light />
   Votes: {votesprofile}
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
    );
  }

  return <div>{grid}</div>;
}