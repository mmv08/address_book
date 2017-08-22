import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import UserList from '../UserList';
import './MainContainer.scss';

class MainContainer extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <BrowserRouter>
        <div className="main-container">
          <Switch>
            <Route path="/user-list" component={UserList} />
            <Redirect from="/" to="/user-list" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default MainContainer;
