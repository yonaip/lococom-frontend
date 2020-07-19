import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Typography, Fab, ButtonBase } from '@material-ui/core';
import { Link } from 'react-router-dom';
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
import DeleteIcon from '@material-ui/icons/Delete';
import discussionImage from '../resources/globe.jpg';
import { getUser, getDiscussions } from "../services/ProfileService";
import { deleteDiscussion } from "../services/DiscussionService";

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
    backgroundImage: 'url(' + discussionImage + ')',
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

  request: {
    width: "5px",
    height: "60px",
    backgroundImage: 'url(' + requestimg + ')',
    backgroundRepeat: "no-repeat",
    backgroundSize: "60%",
    backgroundPosition: "center",
  },
  walking: {
    width: "5px",
    height: "60px",
    backgroundImage: 'url(' + walkerimg + ')',
    backgroundRepeat: "no-repeat",
    backgroundSize: "60%",
    backgroundPosition: "center",


  },
  nature: {
    width: "5px",
    height: "60px",
    backgroundImage: 'url(' + natureimg + ')',
    backgroundRepeat: "no-repeat",
    backgroundSize: "60%",
    backgroundPosition: "center",
  },
  photo: {
    width: "5px",
    height: "60px",
    backgroundImage: 'url(' + photoimg + ')',
    backgroundRepeat: "no-repeat",
    backgroundSize: "60%",
    backgroundPosition: "center",
  },
  hint: {
    width: "5px",
    height: "60px",
    backgroundImage: 'url(' + alertimg + ')',
    backgroundRepeat: "no-repeat",
    backgroundSize: "60%",
    backgroundPosition: "center",
  },
  topic: {
    width: 60,
    height: 60,
    float: 'left',
    margin: theme.spacing(1, 3),
  },

  discussion: {
    textTransform: 'none',
    textAlign: "left",
    marginTop: "2%",
    borderRadius: theme.shape.borderRadius,
    fontSize: 20,
    float: 'left',
    minHeight: "60px",
    width: "95%",
    padding: "4px",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "row",


  },

  disc: {

    maxHeight: "350px",
    width: "95%",
    overflow: "auto",
    padding: "5px",
    float: "left",
  },

  disctext: {

    textTransform: 'none',
    textAlign: "left",
    flexgrow: 1,
    marginTop: "1%",
    float: 'left',
    minHeight: "60px",
    width: "95%",
    padding: "3px",
    display: "flex",
    flexDirection: "row",

  },

  ratingNumber: {

    textAlign: 'center',
    float: "right",
    height: "30px",
    marginTop: "3px",
  },
  deletedisc: {

    float: "right",
    marginTop: "8px",
    height: "30px",

  },
  package: {

    float: "right",


  },

}));


export default function DiscussionOverview(props) {

  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [ratingNum, setRatingNum] = useState("0");
  const [discussions, setDiscussions] = useState([])


  useEffect(() => {
    handleTick();
    const interval = setInterval(() => handleTick(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, [props.profile]);

  //when on own profile view get user object from name(string)
  const handleTick = () => {
    if (props.profile == "") {
      getUser(config.currentlyLoggedUsername).then(({ data }) => {
        setUser(config.currentlyLoggedUsername);
        //get discussion objects from User object in seperate Array
        getDiscussions(data.discussions).then(data => {
          setDiscussions(createnewarray(data))
        });
      })
    }

    else {
      //same as above but with clicked User
      getUser(props.profile).then(({ data }) => {
        setUser(config.currentlyLoggedUsername);
        getDiscussions(data.discussions).then(data => {
          setDiscussions(createnewarray(data))
        });
      })
    }

  };

  const createnewarray = (array) => {
    const arraynew = array.map(x => x.data);
    return arraynew
  }
  //call deleteDiscussion from DiscussionService
  const removeDiscussion = (event) => {
    console.log(event);
    deleteDiscussion(event).then(({ data }) => {
      //reload page after deleting by calling handleTick
      handleTick();
      alert("Discussion deleted");
    })

  }

  //single Discussion with links to Mapview displaying clicked Discussion
  function Discussion(props) {
    return (
      <div className={classes.discussion}>
        <Button size="small" variant="outlined" className={props.topic === 'Nature' ? classes.nature : props.topic === 'Request' ? classes.request : props.topic === 'Walking' ? classes.walking : props.topic === 'Photo' ? classes.photo : props.topic === 'Hint' ? classes.hint : classes.hint}> </Button>
        <div className={classes.disctext}>
          <Link to={`/map?lat=${props.lat}&lng=${props.lng}&discId=${props.id}`} style={{color:"black"}}>
            {props.title}
          </Link>
        </div>

        <div className={classes.package}>
          <div className={classes.ratingNumber} style={{ fontSize: 25 }}>
            {props.votes}
          </div>
          <div className={classes.deletedisc}>
            <DeleteIcon onClick={e => removeDiscussion(props.id)} />
          </div>
        </div>
      </div>

    );
  }

  function DiscussionList(props) {
    return (
      <div className={classes.disc}>
        {props.discussionList.map(c => <Discussion lat={c.lat} lng={c.lng} id={c._id} topic={c.topic} title={c.title} votes={c.votes} />)}
      </div>
    );
  }

  //Discussionprofile for clicked User without possibility to delete discussion
  function Discussionprofile(props) {
    return (
      <div className={classes.discussion}>
        <Button size="small" variant="outlined" className={props.topic === 'Nature' ? classes.nature : props.topic === 'Request' ? classes.request : props.topic === 'Walking' ? classes.walking : props.topic === 'Photo' ? classes.photo : props.topic === 'Hint' ? classes.hint : classes.hint}> </Button>
        <div className={classes.disctext}>
          <Link to={`/map/${props.id}`} style={{ color: "black" }}>
            {props.title}
          </Link>
        </div>

        <div className={classes.package}>
          <div className={classes.ratingNumber} style={{ fontSize: 25 }}>
            {props.votes}
          </div>
        </div>
      </div>

    );
  }
  //DiscussionListProfile for clicked User
  function DiscussionListProfile(props) {
    return (
      <div className={classes.disc}>
        {props.discussionList.map(c => <Discussionprofile lat={c.lat} lng={c.lng} id={c._id} topic={c.topic} title={c.title} votes={c.votes} />)}
      </div>
    );
  }



  //differentiate between clicked user and own user profile
  let grid;
  if (props.profile == "") {
    grid = (<Grid container justify="center">
      <Grid item xs={12} >
        <Typography variant="h5" className={classes.headline}/>
      </Grid>

      <Grid item xs={12} justify="center" style={{ height: "100%" }}>

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

                <Divider light />
            Discussions
          </Typography>
              <div className={classes.element}>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                </Typography>
                <Divider />
                <DiscussionList discussionList={discussions}></DiscussionList>
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

      <Grid item xs={11} justify="center" style={{ height: "100%" }}>

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
            Discussions
          </Typography>
              <div className={classes.element}>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                </Typography>
                <Divider />
                <DiscussionListProfile discussionList={discussions}></DiscussionListProfile>
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