import React from 'react';
import './User.css';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

export class User extends React.Component<any, any> {
  render() {
      return (
     /*   <Grid container spacing={3}>
    <Grid item xs={2}>
    <Paper color="blue" width="5%" backgroundImage='url("./user.png")' ></Paper> 
      </Grid>
        <Grid item xs={10}>
        <Box className="UserAccount" width="7%"> Tester 123 </Box>
        </Grid>
        </Grid>*/




       <Box>
      <Box className="Userbar"> 
      </Box>
     <Box className="Icon"/>
      <Box className="UserAccount"> Tester 123 </Box>
      </Box>
    );
  }
}
export default User;