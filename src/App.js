import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MapView from "./views/MapView";
import UserView from "./views/UserView";

function App() {
  return ( 
    <Router>
      <Route exact path="/map" component={MapView} />
      <Route path="/profile" component= {UserView} />
      <Route path="/map/:id"render={(props) => <MapView id={props.match.params.id} {...props} />}></Route>
  </Router>
     );
}

export default App;
