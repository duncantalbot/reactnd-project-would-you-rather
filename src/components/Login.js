import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { withRouter } from 'react-router-dom';
import {
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Dropdown,
} from 'semantic-ui-react';

class Login extends Component {
  state = {
    value: 'none',
  };

  onChange = (e, { value }) => {
    this.setState({ value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.user);
    this.props.dispatch(setAuthedUser(this.state.value));
    this.props.history.goBack();
  };

  generateDropdownData = () => {
    const { userIds } = this.props;
    return userIds.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL },
    }));
  };

  render() {
    const { value } = this.state;
    const disabled = value === '' ? true : false;
    return (
      <Grid
        textAlign='center'
        style={{ height: '100vh' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment.Group>
              <Header as='h4' block attached='top' textAlign='center'>
                <Header.Content>
                  Welcome to the Would You Rather App!
                </Header.Content>
                <Header.Subheader>Please sign in to continue</Header.Subheader>
              </Header>

              <Image src='/images/logo192.png' size='small' centered />
              <Header as='h2' color='green'>
                Sign In
              </Header>
              <Dropdown
                placeholder='Select Friend'
                style={{ margin: '1em', width: '90%' }}
                selection
                options={this.generateDropdownData()}
                onChange={this.onChange}
                value={value}
                required
              />
              <Form.Button
                style={{ margin: '1em', width: '90%' }}
                content='Login'
                color='teal'
                size='large'
                disabled={disabled}
              />
            </Segment.Group>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.values(users),
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
