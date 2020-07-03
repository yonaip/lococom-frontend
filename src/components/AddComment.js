import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import requestimg from '../resources/request.png';
import walkerimg from '../resources/shoes.png';
import photoimg from '../resources/photograph.png';
import natureimg from '../resources/nature.png';
import alertimg from '../resources/alert.png';
import axios from 'axios';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { Grid, Button, TextField, Box, TextareaAutosize, Typography, Fab, ButtonBase, Avatar } from '@material-ui/core';
import PropTypes from "prop-types";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { findAllByDisplayValue } from '@testing-library/react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#CAE2E5',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    flexGrow: 1,
  },
  element: {
    position: 'relative',
    justifyContent: 'inherit',
  },
  text: {
    color: "black",
    textAlign: 'left',
    padding: theme.spacing(1),
    flexGrow: 2,
    marginBottom: "2%"
  },

  icon: {
    float: 'left',
  },
    user: {
        background: '#62AEBB',
        height: '5vh',
        width: '8vw',
        borderRadius: theme.shape.borderRadius,
        color: "white",
        fontSize: 20,
        /*textAlign: 'center',*/
        float: 'left',
      },
      request: {
        backgroundColor:"#B5CDD0",
        marginTop: "2%",
        width: "3.5vw",
        height: "3.5vw",
        borderRadius:"50%",
        backgroundImage: 'url('+ requestimg+')',
        backgroundRepeat: "no-repeat",
        backgroundSize:"70%",
        backgroundPosition: "center",
      },
      walking: {
        backgroundColor:"#B5CDD0",
        marginTop: "2%",
        width: "3.5vw",
        height: "3.5vw",
        borderRadius:"50%",
        backgroundImage: 'url('+ walkerimg+')',
        backgroundRepeat: "no-repeat",
        backgroundSize:"70%",
        backgroundPosition: "center",
      },
      nature: {
        backgroundColor:"#B5CDD0",
        marginTop: "2%",
        width: "3.5vw",
        height: "3.5vw",
        borderRadius:"50%",
        backgroundImage: 'url('+ natureimg+')',
        backgroundRepeat: "no-repeat",
        backgroundSize:"70%",
        backgroundPosition: "center",
      },
      photo: {
        backgroundColor:"#B5CDD0",
        marginTop: "2%",
        width: "3.5vw",
        height: "3.5vw",
        borderRadius:"50%",
        backgroundImage: 'url('+ photoimg+')',
        backgroundRepeat: "no-repeat",
        backgroundSize:"70%",
        backgroundPosition: "center",
      },
      hint: {
        backgroundColor:"#B5CDD0",
        marginTop: "2%",
        width: "3.5vw",
        height: "3.5vw",
        borderRadius:"50%",
        backgroundImage: 'url('+ alertimg+')',
        backgroundRepeat: "no-repeat",
        backgroundSize:"70%",
        backgroundPosition: "center",
      },

    identifier: {
        fontSize: 15,
        color: '#706666',
        float: 'left',
        marginBottom: "2%"
       /* margin: theme.spacing(0,0.5),*/
    },
    
    topic: {
        width: 60,
        height: 60, 
        float: 'left',
        margin: theme.spacing(1,3),
    },

    ratingnumber: {
      color: '#706666',
      textAlign: 'center',
      
    },

    ratingBlock: {
      float: 'left',
      
    },

    notRated: {
      color: "#FFFFFFF",
    },
    Rated: {
      color: "blue",
    },


    image: {
        background: "black",
        /*margin:  theme.spacing(2,4),*/
        width: '90%',
        height: '30vh', 
        float: 'left',
        color: "white",
        marginTop: "2.5%",
        borderRadius: theme.shape.borderRadius,
    },
    comment: {
        background: '#62AEBB',
        textTransform: 'none',
        textAlign: "left",
        flexgrow: 1,
        marginTop: "2%",
        borderRadius: theme.shape.borderRadius,
        color: "black",
        fontSize: 15,
       float: "left",
        minHeight: "content",
      height: "auto",
      padding: "10px",
      minWidth: "60%",
      maxWidth:"content"
      
      
      },

    newComment: {
            maxheight: '10px', 
            float: 'left',
            color: "white",
            borderRadius: theme.shape.borderRadius,
            overflow: "hidden",
            width: '80%',
            marginTop: "2%",
            background: "white",
    },
    
    post: {
        float: 'left',
        marginTop: "2%",
        marginLeft: "2.5%"
    },
    comments: {
      
      height: "320px", // used fixed values, otherwise overflow doesnt work
      width: "90%",
      overflow: "auto",
      float: "left",
    },
  
}));

export default function AddComment(props) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [creator, setCreator] = React.useState("");
  const [discussionId, setDiscussionId] = React.useState("");
  const [user, setUser] = React.useState("User123");
  const [commentcontent, setCommentContent] = React.useState("");
  const [ratingNum, setRatingNum] = React.useState("0");
  const [commentlist, setCommentlist] = React.useState([]);
  const [voted, setVote] = React.useState("");
  

 React.useEffect( () => {
  function getDiscussion(){
  const temp= "5eff2ac9ce371e50d8e69986" // placeholder, need to add ID from the discussion
  const url = '/api/discussion/' + temp;
   axios
  .get(url) 
  .then(({ data }) => {
    console.log(data);
   setTitle(data.title);
   setContent(data.content);
   setTopic(data.topic);
   setCreator(data.username);
   setDiscussionId(data._id);
   setRatingNum(data.votes);
   const urlget = '/api/comment/' + data._id;
   axios
   .get(urlget) 
   .then(({ data }) => {
     console.log(data);
     setCommentlist(data);
   });
    }); }
   
  getDiscussion();

}, []);


const onChangeContent = (event) => {
  setCommentContent(event.target.value);
};

const upvoteDiscussion = (event) => {
  if (voted === ""){
    const url = "/api/discussion/upvote/" + discussionId
  axios.put(url);
  setVote("Yes");
  
  }
  
}

const downvoteDiscussion = (event) => {
  if (voted === ""){
  const url = "/api/discussion/downvote/" + discussionId
  axios.put(url);
  setVote("No");
}
}

// todo change
const handleSubmit = (event) => {
  //event.preventDefault();
  const comment = {
   username: user,
   content: commentcontent,
   discussionId: discussionId,
   votes: 0
  };
  axios
  .post('/api/comment', comment)
  .then(response => {console.log('Comment created')})
  .catch(err => {
    console.error(err);
  });
  
};

function Comment(props) {
  return (
    <div className={classes.comment}>
      <span style={{fontWeight: "bold"}}>{props.username}  :  </span>
      <span>{props.commentcontent}</span>
         
    </div>
  );
}

function CommentList(props) {
  return (
    <div >  {props.commentlist.map(c => <Comment username={c.username} commentcontent={c.content} />)}
    </div>
  );
}

  return (
    <Grid container className={classes.root} justify="space-around">
      
      <Grid item xs={12} className={classes.element}>
      
        <ButtonBase>
          <AccountCircleIcon className={classes.icon} color="disabled" style={{ fontSize: 65 }}/>
          <Typography variant="h6" className={classes.text}>
            {user}
          </Typography>
        </ButtonBase>
       
      </Grid>
      
      <Grid container className={classes.element}>
        <Grid item xs={10} >
        
        <ButtonBase>
        <Button variant="outlined" className={topic === 'Nature' ? classes.nature : topic === 'Request' ? classes.request : topic === 'Walking' ? classes.walking : topic === 'Photo' ? classes.photo : topic === 'Hint' ? classes.hint : classes.hint}> </Button>
          <Typography variant="h6" className={classes.text}>
          Posted by {creator} <br/> {title}
          </Typography>
        </ButtonBase>
          </Grid>

          <Grid item xs={2} >
          <div className={classes.ratingBlock}>
      <KeyboardArrowUpIcon onClick={upvoteDiscussion} className={voted === 'Yes' ? classes.Rated : classes.notRated}/>
      <div className={classes.ratingnumber}  style={{ fontWeight: "bold" }}>
        {ratingNum}
      </div>
      <KeyboardArrowDownIcon onClick={downvoteDiscussion} className={voted === 'No' ? classes.Rated : classes.notRated}/>
      </div>
      
     
      </Grid>
      </Grid>
      <Grid item xs={12} className={classes.element}>
        <div className={classes.image}> {content}
        </div>
      </Grid>
     
     
      <Grid item xs={12} className={classes.element}>
      <div className={classes.comments}>
      <CommentList commentlist={commentlist} />
      </div>
      </Grid>
     
      <Grid item xs={12} className={classes.element}>

        <TextField
              onChange={onChangeContent}
              className={classes.newComment}
              id="outlined-margin-none"
              placeholder="Your Comment."
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
          />
           
      <Button  onClick={() => {handleSubmit();}} size="large" variant="contained" color="primary" className={classes.post}>
            Post
        </Button>
      </Grid>

    </Grid>
  );


}