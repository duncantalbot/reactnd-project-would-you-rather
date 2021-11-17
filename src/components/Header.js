import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Image, Button } from 'semantic-ui-react';

class Header extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { authedUser, users } = this.props;
    return (
      <div>
        <Menu className='grey inverted'>
          <Menu.Item
            name='home'
            as={NavLink}
            to='/'
            exact
            onClick={this.handleItemClick}
          />
          {authedUser !== null ? (
            <Menu.Menu>
              <Menu.Item
                name='new question'
                as={NavLink}
                to='/add'
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='leader board'
                as={NavLink}
                to='/leaderboard'
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          ) : (
            ''
          )}
          {authedUser !== null ? (
            <Menu.Menu position='right'>
              <Menu.Item>
                <Image src={users[authedUser].avatarURL} avatar spaced />
                {users[authedUser].name}
              </Menu.Item>
              <Menu.Item>
                <Button
                  
                  content='Logout'
                  labelPosition='right'
                 
                  as={NavLink}
                  to='/logout'
                  name='logout'
                  compact
                  icon='log out'
                  size='mini'
                />
              </Menu.Item>
            </Menu.Menu>
          ) : (
            ''
          )}
        </Menu>
      </div>     
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Header);
