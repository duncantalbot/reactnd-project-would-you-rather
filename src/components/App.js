import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { Grid } from 'semantic-ui-react';
import LoadingBar from 'react-redux-loading-bar';
import Header from './Header';
import Login from './Login';
import Home from './Home';
import Question from './Question';
import Leaderboard from './Leaderboard';
import Add from './Add';
import NotFound from './NotFound';
import Logout from './Logout';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar style={{ backgroundColor: 'purple', height: '3px' }} />
          <Header />
          <Grid padded='vertically' columns={1} centered>
            <Grid.Row>
              <Grid.Column style={{ maxWidth: 550 }}>
                <Switch>
                  <Route path='/login' component={Login} />
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute
                    exact
                    path='/questions/:question_id'
                    component={Question}
                  />
                  <PrivateRoute
                    exact
                    path='/leaderboard'
                    component={Leaderboard}
                  />
                  <PrivateRoute exact path='/add' component={Add} />
                  <Route exact path='/logout' component={Logout} />
                  <Route component={NotFound} />
                </Switch>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Fragment>
      </Router>
    );
  }
}

const PrivateRoute = connect(mapStateToProps)(
  ({ component: Component, authedUser, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        authedUser !== null ? (
          <Component {...props} />
        ) : (
          <Redirect push to='/login' />
        )
      }
    />
  )
);

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
