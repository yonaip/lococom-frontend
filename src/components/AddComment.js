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

    rating: {

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
        width: '60%',
        flexgrow: 1,
        marginTop: "2%",
        borderRadius: theme.shape.borderRadius,
        color: "black",
        fontSize: 15,
        float: 'left',
        minHeight: "20px",
      },

    newComment: {
            maxheight: '10px', 
            float: 'left',
            color: "white",
            borderRadius: theme.shape.borderRadius,
            overflow: "hidden",
            width: '80%',
            marginTop: "45%",
            background: "white",
    },
    
    post: {
        float: 'left',
        marginTop: "45%",
        marginLeft: "2.5%"
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
  const [commentuser, setCommentUser] = React.useState(""); // just for testing, author of first comment shown on page
  const [commenttext, setCommentText] = React.useState(""); // just for testing, Content of first comment shown on page

 React.useEffect(() => {
   let test ="";
  function getDiscussion(){
    let id = "";
  axios
  .get("/discussion/getDiscussion")
  .then(({ data }) => {
    console.log(data[0]);
   setTitle(data[0].title);
   setContent(data[0].content);
   setTopic(data[0].topic);
   setCreator(data[0].username);
   setDiscussionId(data[0]._id);
    }); }
   
  function getComment(){
    
    axios
    .post("/comment/getComment", {id: "5ef49b899e3feb20183b9126"}) // hardcoded, just for testing
    .then(({ data }) => {
      console.log(data);
      setCommentUser(data[0].username);
      setCommentText(data[0].content);
    });
  }
getDiscussion();
getComment();

}, []);

const onChangeContent = (event) => {
  setCommentContent(event.target.value);
};
// todo change
const handleSubmit = (event) => {
  event.preventDefault();
  const comment = {
   username: user,
   content: commentcontent,
   discussionId: discussionId
  };
  axios
  .post('/comment/createComment', comment)
  .then(response => {console.log('Comment created')})
  .catch(err => {
    console.error(err);
  });
  
};


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
      
  

        <Grid item xs={12} className={classes.element}>
        <ButtonBase>
        <Button variant="outlined" className={topic === 'Nature' ? classes.nature : topic === 'Request' ? classes.request : topic === 'Walking' ? classes.walking : topic === 'Photo' ? classes.photo : topic === 'Hint' ? classes.hint : classes.hint}> </Button>
          <Typography variant="h6" className={classes.text}>
          Posted by {creator} <br/> {title}
          </Typography>
        </ButtonBase>
      </Grid>





      <Grid item xs={12} className={classes.element}>
        <div className={classes.image}> {content}
        </div>
      </Grid>
        
      <Grid item xs={12} className={classes.element}>

      <ToggleButton className={classes.comment} style={{textAlign: 'left'}}
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}> 
      <div className={classes.identifier}>
            {commentuser}  
        </div>
        
        <div className={classes.text}>
      {commenttext}
        </div>

      </ToggleButton>

      </Grid>

      <Grid item xs={12} className={classes.element}>

        <TextField
              onChange={onChangeContent}
              className={classes.newComment}
              id="outlined-margin-none"
              placeholder="Your Title."
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
          />
      <Button onClick={handleSubmit} size="large" variant="contained" color="primary" className={classes.post}>
            Post
        </Button>
      </Grid>

    </Grid>
  );


}