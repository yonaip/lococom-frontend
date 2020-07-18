import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MapView from "./views/MapView";
import UserView from "./views/UserView";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/map/:lat/:lng" children={<MapView />} />
        <Route path="/profile">
          <UserView />
        </Route>
        <Route path="/">
          <MapView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
