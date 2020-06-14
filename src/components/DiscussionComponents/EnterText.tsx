import React from 'react';
import './EnterText.css';
import Box from '@material-ui/core/Box';


  export class EnterText extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = { contentInput: '' };
    }
    _handleSubmit = event => {
      alert('Content: ' + this.state.contentInput)
      event.preventDefault();
    }
    render() {
        return (
          <Box> 
              <form className="AddContent">
          <textarea className="Contentfield" placeholder="Text goes here" value ={this.state.contentInput} onChange={this._onChange}/>
        </form>
              </Box>

    /*  <Box>
      <Box className="TextTitle"> Enter Text/Content </Box>
      <form className="AddContent">
          <textarea className="Contentfield" placeholder="Text goes here" value ={this.state.contentInput} onChange={this._onChange}/>
        </form>
      </Box> */
      );
    }
    _onChange = event => {
      console.log(event.target.value);
      this.setState({ contentInput: event.target.value });
      this.props.data._getcontentFinal(event.target.value);
  }
  }
 

  export default EnterText;
