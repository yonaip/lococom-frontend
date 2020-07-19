import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Typography, Fab, ButtonBase } from '@material-ui/core';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { getCommentProfile } from "../services/ProfileService";
import { deleteComment } from "../services/CommentService";
import commentImage from '../resources/hand.jpg';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';

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
  //picture at card top
  media: {
    height: "40%",
    backgroundImage: 'url(' + commentImage + ')',
    backgroundRepeat: "no-repeat",
  },
  content: {
    textAlign: "left",
  },

  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },

  element: {
    maxHeight: 500,
    maxWidth: 400,
    overflow: "auto",

  },

  comment: {
    textTransform: 'none',
    textAlign: "left",
    flexgrow: 1,
    marginTop: "1%",
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

  //stores commentlist
  disc: {

    maxHeight: "350px",
    width: "95%",
    overflow: "auto",
    padding: "5px",
    float: "left",
  },
  ratingNumber: {

    textAlign: 'center',
    float: "right",
  },
  deletecomment: {
    float: "right",
    marginTop: "8px",
    height: "30px",
  },
  com: {
    textTransform: 'none',
    textAlign: "left",
    flexgrow: 1,
    marginTop: "1%",
    float: 'left',
    minHeight: "40px",
    width: "95%",
    padding: "3px",
    display: "flex",
    flexDirection: "row",

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
    //call getCommentProfile from ProfileService to get all comments from loggenin User
    if (props.profile == "") {
      getCommentProfile(config.currentlyLoggedUsername).then(({ data }) => {
        setComments(data)
      });
      setUser(config.currentlyLoggedUsername);
    }
    else {
      //call getCommentProfile from ProfileService to get all comments from clicked User
      getCommentProfile(props.profile).then(({ data }) => {
        setUser(config.currentlyLoggedUsername);
        setComments(data)
      });
    };
  }

  //calls deleteComment function from CommentService
  const removeComment = (event) => {
    deleteComment(event);
    //reload view after deleting comment with call of handletick()
    handleTick();
    alert("Comment deleted");
  }

  //single Comment of Commentlist, links to discussion where comment was posted
  function Comment(props) {
    return (
      <div className={classes.comment}>

        <div className={classes.com}>
          <Link to={`/map/${props.discussionid}`} style={{ color: "black" }}>
            <span style={{ fontWeight: "bold" }}>{props.username}: </span>
            <span> {props.content}</span>
          </Link>
        </div>

        <DeleteIcon onClick={e => removeComment(props.id)} color="default" className={classes.deletecomment} />
      </div>

    );
  }
  //Commentlist with mapping
  function CommentList(props) {
    return (
      <div className={classes.disc}>
        {props.commentList.map(c => <Comment id={c._id} discussionid={c.discussionId} content={c.content} username={c.username} />)}
      </div>
    );
  }

  //Comments from another clicked User without the possibility to delete comment
  function Commentprofile(props) {
    return (
      <div className={classes.comment}>
        <div className={classes.com}>
          <span style={{ fontWeight: "bold" }}>{props.username}: </span>
          <Link to={`/map/${props.discussionid}`} style={{ color: "black" }}>
            <span> {props.content}</span>
          </Link>
        </div>

      </div>

    );
  }
  //CommentList from clicked User
  function CommentListprofile(props) {
    return (
      <div className={classes.disc}>
        {props.commentList.map(c => <Commentprofile id={c._id} discussionid={c.discussionId} content={c.content} username={c.username} />)}
      </div>
    );
  }

  //display element CommentList when loggedin User is on his profile, display CommentListProfile when another Profile is observed
  let grid;
  if (props.profile == "") {
    grid = (<Grid container justify="center">
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

                <Divider />
            Comments
          </Typography>

              <div className={classes.element}>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                </Typography>
                <Divider />
                <CommentList commentList={comments} />
              </div>
            </CardContent>
          </Card>
        </div>

      </Grid>

    </Grid>)
  }
  else {
    grid = (<Grid container justify="center">
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

                <Divider />
            Comments
          </Typography>

              <div className={classes.element}>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                </Typography>
                <Divider />
                <CommentListprofile commentList={comments} />
              </div>
            </CardContent>
          </Card>
        </div>

      </Grid>

    </Grid>)
  }

  return (<div>
    {grid}</div>
  );
}