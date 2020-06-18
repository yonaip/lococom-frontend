import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Box from '@material-ui/core/Box';
import requestimg from '../resources/request.png';
import walkerimg from '../resources/shoes.png';
import photoimg from '../resources/photograph.png';
import natureimg from '../resources/nature.png';
import alertimg from '../resources/alert.png';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    background: '#CAE2E5',
    height: '90vh',
    marginLeft: theme.spacing(160),
    marginTop: theme.spacing(10),
    overflow: "hidden",
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

  text: {
    color: "black",
    fontSize: 30,
    textAlign: 'center',
    paddingTop: '10px',   
  },

  titlefield: {
    background: "white",
    margin: theme.spacing(0,2.5),
  },
contentfield: {

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
    backgroundImage: 'url('+ requestimg+')',
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

  icon: {
    margin: theme.spacing(0,3),
    float: 'left',
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
      },
   
    confirm: {
        margin: theme.spacing(4,0,0,30),
        float: 'left',
        background: '#49D147',
        color: "white",
    },
    cancel: {
        margin: theme.spacing(4,0,0,10),
        float: 'left',
        
    },

  
}));



export default function AddDiscussion(props) {
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
    <div>
    <div className={classes.root}>
      <div className={classes.rectangle}>
      
      <AccountCircleIcon className={classes.icon} color="disabled" style={{ fontSize: 65 }}/>
      <div className={classes.user}>
        UserName
    </div>
    </div>
    <div className={classes.rectangle}>
    <div className={classes.text}>
    Create a discussion
    </div>
    </div>

    <TextField
          onChange={onChangeTitle}
          className={classes.titlefield}
          id="outlined-margin-none"
          placeholder="Your Title."
          variant="outlined"
          style = {{width: 600}}
          InputLabelProps={{
            shrink: true,
          }}
        />
       <div className={classes.rectangleTop}>
    <div className={classes.text}>
      Select a Topic
    </div>
    </div>

    <Box className="Buttonfield"  m={1} ml ={2.5}> 
    <Button onClick={topicRequest} variant="outlined" className={topic === 'Request' ? classes.pickedRequest : classes.request}> 
    </Button>
    <Button onClick={topicNature} variant="outlined" className={topic === 'Nature' ? classes.pickedNature : classes.nature}>
    </Button>
    <Button onClick={topicWalking} variant="outlined" className={topic === 'Walking' ? classes.pickedWalking : classes.walking}>
    </Button>
    <Button onClick={topicPhoto} variant="outlined" className={topic === 'Photo' ? classes.pickedPhoto : classes.photo}>
    </Button>
    <Button onClick={topicHint} variant="outlined" className={topic === 'Hint' ? classes.pickedHint : classes.hint}>
    </Button>
    </Box>
       
    <div className={classes.rectangle}>
    <div className={classes.text}>
    Enter text | content
    </div>
    </div>
    <div className={classes.contentfield}> 
    <TextareaAutosize onChange={onChangeContent} aria-label="minimum height" rowsMin={15} style = {{width: 600}} placeholder="Enter Text..." />
    </div>     
        <Box >
          <Button  className={classes.cancel} variant= "contained" style={{ minWidth: '120px', minHeight: '50px'}} color="secondary">Cancel</Button>
          </Box>
          <Box >
          <Button onClick={handleSubmit} className={classes.confirm} variant= "contained" style={{ minWidth: '120px', minHeight: '50px'}}>Confirm</Button>
          </Box>
    
    </div>


    </div>
  );
}