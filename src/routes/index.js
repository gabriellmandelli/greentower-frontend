import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Person from '../pages/Person';
import Profile from '../pages/Profile';
import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/person" component={Person} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
