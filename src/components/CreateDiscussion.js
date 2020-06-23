import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Grid, Button, TextField, ToggleButton, Box, TextareaAutosize, Typography, Fab, ButtonBase } from '@material-ui/core';
import requestimg from '../resources/request.png';
import walkerimg from '../resources/shoes.png';
import photoimg from '../resources/photograph.png';
import natureimg from '../resources/nature.png';
import alertimg from '../resources/alert.png';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    background: '#CAE2E5',
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    flexGrow: 1
  },

  element: {
    position: 'relative',
    justifyContent: 'inherit',
  },

  subElement: {
    justifyContent: 'inherit',
  },

  icon: {
    //margin: theme.spacing(0,3),
    float: 'left',
  },

  text: {
    color: "black",
    textAlign: 'left',
    padding: theme.spacing(1),
    flexGrow: 2,
    marginTop: "2%"
  },

  rectangle: {
    background: '#B9CFD4',
    height: '7vh',
    marginBottom: theme.spacing(2),
  },

  rectangleTop: {
    background: '#B9CFD4',
    height: '7vh',
    marginTop: theme.spacing(2),
  },

  titleField: {
    background: "white",
    width: '90%',
    margin: theme.spacing(0,2.5),
  },

  contentField: {
    width: '90%',
    margin: theme.spacing(0,2.5),
  },

  request: {
    backgroundColor:"#B5CDD0",
    width: "3.5vw",
    height: "3.5vw",
    borderRadius:"50%",
    margin: "10px 20px 0px 20px",
    backgroundImage: 'url('+ requestimg+')',
    backgroundRepeat: "no-repeat",
    backgroundSize:"70%",
    backgroundPosition: "center",
  },
  walking: {
    backgroundColor:"#B5CDD0",
    width: "3.5vw",
    height: "3.5vw",
    borderRadius:"50%",
    margin: "10px 20px 0px 20px",
    backgroundImage: 'url('+ walkerimg+')',
    backgroundRepeat: "no-repeat",
    backgroundSize:"70%",
    backgroundPosition: "center",
  },
  nature: {
    backgroundColor:"#B5CDD0",
    width: "3.5vw",
    height: "3.5vw",
    borderRadius:"50%",
    margin: "10px 20px 0px 20px",
    backgroundImage: 'url('+ natureimg+')',
    backgroundRepeat: "no-repeat",
    backgroundSize:"70%",
    backgroundPosition: "center",
  },
  photo: {
    backgroundColor:"#B5CDD0",
    width: "3.5vw",
    height: "3.5vw",
    borderRadius:"50%",
    margin: "10px 20px 0px 20px",
    backgroundImage: 'url('+ photoimg+')',
    backgroundRepeat: "no-repeat",
    backgroundSize:"70%",
    backgroundPosition: "center",
  },
  hint: {
    backgroundColor:"#B5CDD0",
    width: "3.5vw",
    height: "3.5vw",
    borderRadius:"50%",
    margin: "10px 20px 0px 20px",
    backgroundImage: 'url('+ alertimg+')',
    backgroundRepeat: "no-repeat",
    backgroundSize:"70%",
    backgroundPosition: "center",
  },
  pickedRequest: {
    backgroundColor:"#62AEBB",
    width: "4.2vw",
    height: "4.2vw",
    borderRadius:"50%",
    margin: "10px 20px 0px 20px",
    backgroundRepeat: "no-repeat",
    backgroundSize:"70%",
    backgroundPosition: "center",
  },
  pickedWalking: {
    backgroundColor:"#62AEBB",
    width: "4.2vw",
    height: "4.2vw",
    borderRadius:"50%",
    margin: "10px 20px 0px 20px",
    backgroundImage: 'url('+ walkerimg+')',
    backgroundRepeat: "no-repeat",
    backgroundSize:"70%",
    backgroundPosition: "center",
  },
  pickedNature: {
    backgroundColor:"#62AEBB",
    width: "4.2vw",
    height: "4.2vw",
    borderRadius:"50%",
    margin: "10px 20px 0px 20px",
    backgroundImage: 'url('+ natureimg+')',
    backgroundRepeat: "no-repeat",
    backgroundSize:"70%",
    backgroundPosition: "center",
  },
  pickedPhoto: {
    backgroundColor:"#62AEBB",
    width: "4.2vw",
    height: "4.2vw",
    borderRadius:"50%",
    margin: "10px 20px 0px 20px",
    backgroundImage: 'url('+ photoimg+')',
    backgroundRepeat: "no-repeat",
    backgroundSize:"70%",
    backgroundPosition: "center",
  },
  pickedHint: {
    backgroundColor:"#62AEBB",
    width: "4.2vw",
    height: "4.2vw",
    borderRadius:"50%",
    margin: "10px 20px 0px 20px",
    backgroundImage: 'url('+ alertimg+')',
    backgroundRepeat: "no-repeat",
    backgroundSize:"70%",
    backgroundPosition: "center",
  },

  textfield:{
    width: "100",
    height: "50vw",
  },
    user: {
        background: '#62AEBB',
        height: '5vh',
        width: '8vw',
        margin: theme.spacing(1,0,0,0),
        borderRadius: theme.shape.borderRadius,
        color: "white",
        fontSize: 20,
        float: 'left',
        textAlign: 'center'
      },
   
    confirm: {
        background: '#49D147',
        color: "white",
        marginTop: "15%",
        marginLeft: "15%",
    },
    cancel: {
        marginTop: "15%",
        marginLeft: "20%",
    },

  
}));



export default function CreateDiscussion(props) {
  const classes = useStyles();
  const [title, setTitle] = React.useState("SampleTitle");
  const [topic, setTopic] = React.useState("SampleTopic");
  const [content, setContent] = React.useState("SampleContent");

  const handleSubmit = (event) => {
    
    alert('Title: '+title+' Content: '+content+' Topic: '+topic)
    event.preventDefault();
    const tit = title;
    const con = content;
    const top = topic;
    const creator = "Test123";
    const lat = 48.137154;
    const lng = 11.576124;
    const disc = {
     tit,
     con,
     top,
     creator,
     lat,
     lng,
    };
    console.log(disc);
    axios
    .post('/create', disc)
    .then(response => {console.log('Discussion created')})
    .catch(err => {
      console.error(err);
    });
  };


  const onChangeContent = (event) => {
    setContent(event.target.value);
};
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  }
  const topicRequest = (event) => {
    setTopic("Request");
  }
  const topicNature = (event) => {
    setTopic("Nature");
  }
  const topicWalking = (event) => {
      setTopic("Walking");
  }
  const topicPhoto = (event) => {
      setTopic("Photo");
  }
  const topicHint = (event) => {
      setTopic("Hint");
  }

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={12} className={classes.element}>
        <ButtonBase>
          <AccountCircleIcon className={classes.icon} color="disabled" style={{ fontSize: 65 }}/>
          <Typography variant="h6" className={classes.text}>
            Username
          </Typography>
        </ButtonBase>
      </Grid>
      
      <Grid item xs={12} className={classes.element}>
        <div className={classes.text}>
          Create a discussion
        </div>
      </Grid>

      <Grid item xs={12} className={classes.element}>
        <TextField
              onChange={onChangeTitle}
              className={classes.titleField}
              id="outlined-margin-none"
              placeholder="Your Title."
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
          />
      </Grid>
        
      <Grid item xs={12} className={classes.element}>
        <div className={classes.text}>
          Select a Topic
        </div>
      </Grid>
      
      <Grid container xs={12} className={classes.element}>
        <Grid item xs={2.4}>
          <Fab onClick={topicRequest} className={topic === 'Request' ? classes.pickedRequest : classes.request}/>
        </Grid>
        <Grid item xs={2.4}>
          <Fab onClick={topicNature} className={topic === 'Nature' ? classes.pickedNature : classes.nature}/>
        </Grid>
        <Grid item xs={2.4}>
          <Fab onClick={topicWalking} className={topic === 'Walking' ? classes.pickedWalking : classes.walking}/>
        </Grid>
        <Grid item xs={2.4}>
          <Fab onClick={topicPhoto} className={topic === 'Photo' ? classes.pickedPhoto : classes.photo}/>
        </Grid>
        <Grid item xs={2.4}>
          <Fab onClick={topicHint} className={topic === 'Hint' ? classes.pickedHint : classes.hint}/>
        </Grid>
      </Grid>
      
      <Grid item xs={12} className={classes.element}>
        <div className={classes.text}>
          Enter text | content
        </div>
      </Grid>

      <Grid item xs={12} className={classes.element}>
        <TextareaAutosize className={classes.contentField}
          onChange={onChangeContent}
          aria-label="minimum height"
          rowsMin={15}
          placeholder="Enter Text..." />
      </Grid>

      <Grid item xs={12} className={classes.element}>
        <Button className={classes.cancel} variant= "contained" style={{ minWidth: '120px', minHeight: '50px'}} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} className={classes.confirm} variant="contained" style={{ minWidth: '120px', minHeight: '50px'}}>Confirm</Button>
      </Grid>

    </Grid>
  );
}