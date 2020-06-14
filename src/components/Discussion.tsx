import React from 'react';
import User from './DiscussionComponents/User'
import CreateDiscussion from './DiscussionComponents/CreateDiscussion'
import PickaTopic from './DiscussionComponents/PickaTopic';
import EnterText from './DiscussionComponents/EnterText';
import './Discussion.css';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

export class Discussion extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.getData = this.getData.bind(this)
    this.state = {
      contentFinal: '',
      topic: '',
      title: ''
    };
  }
  _getcontentFinal (test){
    this.setState({contentFinal:test})}
  
    _gettitle (name){
      this.setState({title:name})
    }
    _gettopic (topicName){
      this.setState({topic:topicName})
    }
    _handleSubmit = event => {
      alert('Title: '+this.state.title+' Content: '+this.state.contentFinal+' Topic: '+this.state.topic)
      console.log(this.state);
      event.preventDefault();
      const tit = this.state.title;
      const con = this.state.contentFinal;
      const top = this.state.topic;
      const disc = {
       tit,
       con,
       top,
      

      };
      console.log(disc);
      axios
      .post('/create', disc)
      .then(response => {console.log('Discussion created')})
      .catch(err => {
        console.error(err);
      });
    }
   
    render(){
    return (
      
  
      <Grid container xs={12} spacing={10}  direction ='row-reverse'  >
      <Grid item xs={4} style={{backgroundColor: '#CAE2E5', color: 'black'}}>
        
        <Grid container spacing={10}>
          <Grid item xs={12}>
          <User></User>
          </Grid>
          <Grid item xs={12}>
          <div className="Topictext"> Create Discussion </div>
          </Grid>
          <Grid item xs={12}>
          <CreateDiscussion  data = { {title:this.state.title,_gettitle:this._gettitle.bind(this)}}></CreateDiscussion>
          </Grid>
          <Grid item xs={12}>
          <Box className="Topictext"> Pick a topic </Box>
          </Grid>
          <Grid item xs={12}>
          <PickaTopic data = { {topic:this.state.topic,_gettopic:this._gettopic.bind(this)}}></PickaTopic>
          </Grid>
          <Grid item xs={12}>
          
          </Grid>
          <Grid item xs={12}>
          <Box className="Topictext"> Enter Text/Content </Box>
          </Grid>
          <Grid item xs={12}>
          <EnterText data = { {contentFinal:this.state.contentFinal,_getcontentFinal:this._getcontentFinal.bind(this)}}></EnterText>
          </Grid>
          <Grid item xs={12}>
          
          </Grid>
          <Grid item xs={12}>
          
          </Grid>
          <Grid item xs={12} style={{backgroundColor: '#CAE2E5', color: 'black'}}>
          <Grid container spacing={10}>
          <Grid item xs ={6}>
          <Box className= "Cancel">
          <Button variant= "contained" size = "large" color="secondary"z-index= "5">Cancel</Button></Box>
          </Grid>
          <Grid item xs ={6}>
          <Box className= "Confirm">
          <Button variant= "contained" size = "large" color="primary"z-index= "5" onClick = {this._handleSubmit} >Confirm</Button>
          </Box>
          </Grid>
          <Grid item xs={12} style={{backgroundColor: '#CAE2E5', color: 'black'}}></Grid>
          
          </Grid>
          </Grid>
  
        </Grid>
        </Grid>
    </Grid>
     );
    }
    

getData(val){
  console.log(val);}

}
export default Discussion;
