import React from 'react';
import './CreateDiscussion.css';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

  export class CreateDiscussion extends React.Component<any,any>{
    constructor(props: any) {
      super(props);
      this.state = { labelInput: '' };
    }
    _handleSubmit = event => {
      alert('Content: ' + this.state.labelInput)
      event.preventDefault();
    }
  /*  render() {
        return (
          <Container>
      <Box component="span">
      <Box className="CreateaDiscussion"> Create Discussion </Box>
      <form  className="AddTitle">
          <input className="textfield" placeholder="Title..." value ={this.state.labelInput} onChange={this._onChange}/>
        </form>
      </Box>
      </Container>
      );
    }*/
    render() {
      return (
        
    <Box component="span">
    <form  className="AddTitle">
        <input className="textfield" placeholder="Title..." value ={this.state.labelInput} onChange={this._onChange}/>
      </form>
    </Box>
    
    );
      }

    _onChange = event => {
      console.log(event.target.value);
      this.setState({ labelInput: event.target.value });
      this.props.data._gettitle(event.target.value);
  }
}
  export default CreateDiscussion;
