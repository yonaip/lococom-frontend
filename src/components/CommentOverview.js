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

  root: {
    //marginTop: "15%",
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
    textTransform: 'none',
    textAlign: "left",
    flexgrow: 1,
    marginTop: "1%",
    //borderRadius: theme.shape.borderRadius,
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

    maxHeight: "350px", // used fixed values, otherwise overflow doesnt work
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
    if (props.profile == "") {
      getCommentProfile(config.currentlyLoggedUsername).then(({ data }) => {
        setComments(data)
      });
      setUser(config.currentlyLoggedUsername);
    }
    else {
      getCommentProfile(props.profile).then(({ data }) => {
        setUser(config.currentlyLoggedUsername);
        setComments(data)
      });
    };
  }


  const removeComment = (event) => {
    deleteComment(event);
    handleTick();
    alert("Comment deleted");
  }


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

  function CommentList(props) {
    return (
      <div className={classes.disc}>

        {props.commentList.map(c => <Comment id={c._id} discussionid={c.discussionId} content={c.content} username={c.username} />)}
      </div>
    );
  }

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

  function CommentListprofile(props) {
    return (
      <div className={classes.disc}>

        {props.commentList.map(c => <Commentprofile id={c._id} discussionid={c.discussionId} content={c.content} username={c.username} />)}
      </div>
    );
  }


  let grid;
  if (props.profile == "") {
    grid = (<Grid container className={classes.root} justify="center">
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

    </Grid>)
  }
  else {
    grid = (<Grid container className={classes.root} justify="center">
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
                <CommentListprofile commentList={comments} />
              </div>
            </CardContent>
          </Card>
        </div>

      </Grid>

    </Grid> )
  }





  return (<div>
    {grid}</div>
     );
}