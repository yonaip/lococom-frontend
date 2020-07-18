import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Typography, Fab, ButtonBase } from '@material-ui/core';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { getCommentProfile } from "../services/ProfileService";
import commentImage from '../resources/hand.jpg';
import { Link } from 'react-router-dom';
const config = require("../services/ConfigService");
const useStyles = makeStyles((theme) => ({

  root: {
    marginTop: "15%",
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
    height: "40%",
    backgroundImage: 'url(' + commentImage + ')',
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

  comment: {
    background: '#DFE0F5',
    textTransform: 'none',
    textAlign: "left",
    flexgrow: 1,
    marginTop: "1%",
    borderRadius: theme.shape.borderRadius,
    color: "black",
    fontSize: 15,
    float: 'left',
    minHeight: "40px",
    width: "95%",
    padding: "4px",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "row",
  },
  disc: {

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
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([])

  useEffect(() => {
    handleTick();
    const interval = setInterval(() => handleTick(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, [props.profile]);

  const handleTick = () => {
    if (props.profile == "") {
      getCommentProfile(config.currentlyLoggedUsername).then(({ data }) => {
        setComments(data)
      });
      setUser(config.currentlyLoggedUsername);
    }
    else {
      console.log(props.profile);
      getCommentProfile(props.profile).then(({ data }) => {
        setUser(config.currentlyLoggedUsername);
        setComments(data)
      });
    };
  }

  /*const handleTick = () => {
    if (props.profile == "") {
      let url = "/api/comment/CommentProfile/" + config.currentlyLoggedUsername
      axios
        .get(url)
        .then(({ data }) => {
          setComments(data);
          setUser(config.currentlyLoggedUsername);
        });
    }
    else {
      let temp = "/api/comment/CommentProfile/" + props.profile
      axios
        .get(temp)
        .then(({ data }) => {
          setUser(config.currentlyLoggedUsername);
          setComments(data);
        });
    }

  };*/



  function Comment(props) {
    return (
      <Link to={`/map?lat=${props.lat}&lng=${props.lng}&discId=${props.id}`}>

        <div className={classes.comment}>
          <span style={{ fontWeight: "bold" }}>{props.username}:</span>
          <span> {props.content}</span>
        </div>

      </Link>
    );
  }

  function CommentList(props) {
    return (
      <div className={classes.disc}>

        {props.commentList.map(c => <Comment discussionid={c.discussionId} content={c.content} username={c.username} />)}
      </div>
    );
  }
  return (

    <Grid container className={classes.root} justify="center">
      <Grid item xs={12} >
        <Typography variant="h5" className={classes.headline} />


      </Grid>

      <Grid item xs={11} style={{ height: "100%" }}>

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
          Comments
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