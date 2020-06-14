import React from 'react';
import './PickaTopic.css';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/Button';
  export class PickaTopic extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = { 
        selectedtopic: '', 
      };
    }
    _handleSubmit = event => {
      alert('Content: ' + this.state.selectedtopic)
      event.preventDefault();
    }
    _requestmethod = event => {
      console.log(this.state.selectedtopic);
      this.setState({ selectedtopic :'request'});
      this.props.data._gettopic('request');
  }
  _naturemethod = event => {
    console.log(this.state.selectedtopic);
    this.setState({ selectedtopic :'nature'});
    this.props.data._gettopic('nature');
  }
  _hikingmethod = event => {
    console.log(this.state.selectedtopic);
    this.setState({ selectedtopic :'hiking'});
    this.props.data._gettopic('hiking');
  }
  _photographmethod = event => {
    console.log(this.state.selectedtopic);
    this.setState({ selectedtopic :'photograph'});
    this.props.data._gettopic('photograph');
  }
  _alertmethod = event => {
    console.log(this.state.selectedtopic);
    this.setState({ selectedtopic :'alert'});
    this.props.data._gettopic('alert');
  }
   /* render() {
        return (
          <Container>
      <Box>
      <Box className="Topictext"> Pick a topic </Box>
      <Box className="Buttonfield"> 
      <button className={this.state.selectedtopic === 'request' ? "Topics2" : "Topics1"} id="request" onClick={this._requestmethod}>
      </button>
      <button className={this.state.selectedtopic === 'nature' ? "Topics2" : "Topics1"} id="nature" onClick={this._naturemethod}>
      </button>
      <button className={this.state.selectedtopic === 'shoes' ? "Topics2" : "Topics1"} id="shoes" onClick={this._shoesmethod} >
      </button>
      <button className={this.state.selectedtopic === 'photograph' ? "Topics2" : "Topics1"} id="photograph" onClick={this._photographmethod}>
      </button>
      <button className={this.state.selectedtopic === 'alert' ? "Topics2" : "Topics1"} id="alert" onClick={this._alertmethod}>
      </button>
      </Box>
      </Box>
      </Container>
      );
    }*/
    render() {
      return (
        
    
    <Box className="Buttonfield" m={2} ml ={10}> 
    <Button variant="outlined" className={this.state.selectedtopic === 'request' ? "Topics2" : "Topics1"} id="request" onClick={this._requestmethod}>
    </Button>
    <Button variant="outlined" className={this.state.selectedtopic === 'nature' ? "Topics2" : "Topics1"} id="nature" onClick={this._naturemethod}>
    </Button>
    <Button variant="outlined" className={this.state.selectedtopic === 'hiking' ? "Topics2" : "Topics1"} id="hiking" onClick={this._hikingmethod} >
    </Button>
    <Button variant="outlined" className={this.state.selectedtopic === 'photograph' ? "Topics2" : "Topics1"} id="photograph" onClick={this._photographmethod}>
    </Button>
    <Button variant="outlined" className={this.state.selectedtopic === 'alert' ? "Topics2" : "Topics1"} id="alert" onClick={this._alertmethod}>
    </Button>
    </Box>
   
    );
  }
  }
  export default PickaTopic;
