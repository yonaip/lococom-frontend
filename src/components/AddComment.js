import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Box from '@material-ui/core/Box';
import requestimg from '../resources/request.png';
import walkerimg from '../resources/shoes.png';
import photoimg from '../resources/photograph.png';
import natureimg from '../resources/nature.png';
import alertimg from '../resources/alert.png';
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
    height: '8vh',
    
  },
  icon: {
    margin: theme.spacing(0.5,3),
    float: 'left',
  },
    user: {
        background: '#62AEBB',
        height: '5vh',
        width: '8vw',
        margin: theme.spacing(2,0,0,0),
        borderRadius: theme.shape.borderRadius,
        color: "white",
        fontSize: 20,
        /*textAlign: 'center',*/
        float: 'left',
      },
      request: {
        backgroundColor:"#B5CDD0",
        width: "4vw",
        height: "4vw",
        borderRadius:"50%",
        margin: "10px 20px 0px 20px",
        backgroundImage: 'url('+ requestimg+')',
        backgroundRepeat: "no-repeat",
        backgroundSize:"70%",
        backgroundPosition: "center",
        float: 'left',
      },
      walking: {
        backgroundColor:"#B5CDD0",
        width: "4vw",
        height: "4vw",
        borderRadius:"50%",
        margin: "10px 20px 0px 20px",
        backgroundImage: 'url('+ walkerimg+')',
        backgroundRepeat: "no-repeat",
        backgroundSize:"70%",
        backgroundPosition: "center",
        float: 'left',
      },
      nature: {
        backgroundColor:"#B5CDD0",
        width: "4vw",
        height: "4vw",
        borderRadius:"50%",
        margin: "10px 20px 0px 20px",
        backgroundImage: 'url('+ natureimg+')',
        backgroundRepeat: "no-repeat",
        backgroundSize:"70%",
        backgroundPosition: "center",
        float: 'left',
      },
      photo: {
        backgroundColor:"#B5CDD0",
        width: "4vw",
        height: "4vw",
        borderRadius:"50%",
        margin: "10px 20px 0px 20px",
        backgroundImage: 'url('+ photoimg+')',
        backgroundRepeat: "no-repeat",
        backgroundSize:"70%",
        backgroundPosition: "center",
        float: 'left',
      },
    
      hint: {
        backgroundColor:"#B5CDD0",
        width: "4vw",
        height: "4vw",
        borderRadius:"50%",
        margin: "10px 20px 0px 20px",
        backgroundImage: 'url('+ alertimg+')',
        backgroundRepeat: "no-repeat",
        backgroundSize:"70%",
        backgroundPosition: "center",
        float: 'left',
      },
    discussion: {
        fontSize: 30,
        color: "black",
        float: 'left',
    },

    identifier: {
        fontSize: 15,
        color: '#706666',
        float: 'left',
        margin: theme.spacing(0,0.5),
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
        margin:  theme.spacing(2,4),
        width: '28vw',
        height: '30vh', 
        float: 'left',
        color: "white",
        borderRadius: theme.shape.borderRadius,
    },
    comment: {
        background: '#62AEBB',
        textTransform: 'none',
        minWidth: '20vw',
        textAlign: "left",
        /*width: '30vw',*/
        flexgrow: 1,
        margin: theme.spacing(2,4),

        borderRadius: theme.shape.borderRadius,
        color: "black",
        fontSize: 15,
        float: 'left',
        minHeight: "45px",
      },

      send : {
        float: 'left',
        maxWidth: '60px',
        
    },
    test: {
            
            margin:  theme.spacing(27,0),
            maxheight: '10px', 
            float: 'left',
            color: "white",
            borderRadius: theme.shape.borderRadius,
            overflow: "hidden",
        
    },
    buttontest: {
        margin:  theme.spacing(28,0,0,0),
        marginLeft: "30px",
        float: 'left',
    },
    
    
  
}));



export default function AddComment(props) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [creator, setCreator] = React.useState("");
 React.useEffect(() => {
  axios
  .get("/get")
  .then(({ data }) => {
    console.log(data);
   setTitle(data.title);
   setContent(data.content);
   setTopic(data.topic);
   setCreator(data.creator);
    });
}, []);






  return (
    <div>
    <div className={classes.root}>
      <div className={classes.rectangle}>
      
      <AccountCircleIcon className={classes.icon} color="disabled" style={{ fontSize: 65 }}/>
      <div className={classes.user}>
        UserName
    </div>
    </div>
    <Button variant="outlined" className={topic === 'Nature' ? classes.nature : topic === 'Request' ? classes.request : topic === 'Walking' ? classes.walking : topic === 'Photo' ? classes.photo : topic === 'Hint' ? classes.hint : classes.hint}> 
    </Button>
    <div className={classes.discussion}>{title}</div>
    <div className={classes.identifier}>
            Posted by {creator}
        </div>
        <div className={classes.image}>
            {content}</div>
        	<ToggleButton className={classes.comment} style={{textAlign: 'left'}}
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
        <div className={classes.identifier}>
            Username: 
        </div>
        
  Thanks for the photo!
  
    </ToggleButton>


        <div className={classes.test}>
        
        

        <TextField className={classes.textField}
          placeholder="Your comment."
          style = {{width: 450}}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
       
     
      
        </div>
      
        <Button size="large" variant="contained" color="primary" className={classes.buttontest}>
            Post
        </Button>
        
    
       
    </div>


    </div>
  );
}