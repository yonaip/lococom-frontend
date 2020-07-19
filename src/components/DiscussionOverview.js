import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Typography, Fab, ButtonBase } from '@material-ui/core';
import axios from 'axios';
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
//import discussionImage from '../resources/plaudern.svg';
import discussionImage from '../resources/globe.jpg';
import { getUser, getDiscussions } from "../services/ProfileService";

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
    // paddingTop: "10%",
    //width: "30vw",
    height: "40%",
    backgroundImage: 'url(' + discussionImage + ')',
    backgroundRepeat: "no-repeat",
    //backgroundSize: "40%",
    //backgroundPosition: "right",
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
    backgroundColor: "#B5CDD0",
    //marginTop: "2%",
    width: "5px",
    height: "60px",
    borderRadius: "50%",
    backgroundImage: 'url(' + requestimg + ')',
    backgroundRepeat: "no-repeat",
    backgroundSize: "60%",
    backgroundPosition: "center",
    //float: 'left',
  },
  walking: {
    backgroundColor: "#B5CDD0",
    //marginTop: "2%",
    width: "5px",
    height: "60px",
    borderRadius: "50%",
    backgroundImage: 'url(' + walkerimg + ')',
    backgroundRepeat: "no-repeat",
    backgroundSize: "60%",
    backgroundPosition: "center",
    //float: 'left',
  },
  nature: {
    backgroundColor: "#B5CDD0",
    //marginTop: "2%",
    width: "5px",
    height: "60px",
    borderRadius: "50%",
    backgroundImage: 'url(' + natureimg + ')',
    backgroundRepeat: "no-repeat",
    backgroundSize: "60%",
    backgroundPosition: "center",
    //float: 'left',
  },
  photo: {
    backgroundColor: "#B5CDD0",
    //marginTop: "2%",
    width: "5px",
    height: "60px",
    borderRadius: "50%",
    backgroundImage: 'url(' + photoimg + ')',
    backgroundRepeat: "no-repeat",
    backgroundSize: "60%",
    backgroundPosition: "center",
    //float: 'left',
  },
  hint: {
    backgroundColor: "#B5CDD0",
    overflow: "hidden",
    width: "5px",
    height: "60px",
    borderRadius: "50%",
    backgroundImage: 'url(' + alertimg + ')',
    backgroundRepeat: "no-repeat",
    backgroundSize: "60%",
    backgroundPosition: "center",
    //float: 'left',
  },
  topic: {
    width: 60,
    height: 60,
    float: 'left',
    margin: theme.spacing(1, 3),
  },

  discussion: {
    background: '#DFE0F5',
    textTransform: 'none',
    textAlign: "left",
    //flexgrow: 1,
    marginTop: "2%",
    borderRadius: theme.shape.borderRadius,
    fontSize: "20",
    float: 'left',
    height: "60px",
    width: "95%",
    padding: "4px",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "row",


  },
  wrapper: {
    width: "60px",
    float: "left",
  },
  block: {
    display: "inline-block",
    width: "50px",
    float: "left",
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

  const handleTick = () => {
    if (props.profile == "") {
      getUser(config.currentlyLoggedUsername).then(({ data }) => {
        setUser(config.currentlyLoggedUsername);
        getDiscussions(data.discussions).then(data => {
          setDiscussions(createnewarray(data))
        });
      })
    }

    else {

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

  function Discussion(props) {
    return (
      <Link to={`/map?lat=${props.lat}&lng=${props.lng}&discId=${props.id}`}>

        <div className={classes.discussion}>

          <Button size="small" variant="outlined" className={props.topic === 'Nature' ? classes.nature : props.topic === 'Request' ? classes.request : props.topic === 'Walking' ? classes.walking : props.topic === 'Photo' ? classes.photo : props.topic === 'Hint' ? classes.hint : classes.hint}/>

          {props.title}

          <div className={classes.ratingNumber} style={{ fontSize: 25 }}>
            {props.votes}
          </div>

        </div>
      </Link>
    );
  }

  function DiscussionList(props) {
    return (
      <div className={classes.disc}>
        {props.discussionList.map(c => <Discussion lat={c.lat} lng={c.lng} id={c._id} topic={c.topic} title={c.title} votes={c.votes} />)}
      </div>
    );
  }

  return (
    <Grid container justify="center">
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

              <Divider className={classes.divider} light />
              Discussions
              </Typography>
              <div className={classes.element}>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                </Typography>
                <Divider className={classes.divider} light />
                <DiscussionList discussionList={discussions}></DiscussionList>
              </div>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
}