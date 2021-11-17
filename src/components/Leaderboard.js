import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import LeaderboardBox from './LeaderboardBox';
import PropTypes from 'prop-types';

export class Leaderboard extends Component {
  render() {
    const { users } = this.props;
    return (
      <Fragment>
        {Object.keys(users)
          .map((user) => {
            return {
              ...users[user],
              score:
                Object.keys(users[user].answers).length +
                users[user].questions.length,
            };
          })
          .sort((a, b) => b.score - a.score)
          .map((user, idx) => (
            <div key={user.id}>
              <LeaderboardBox id={user.id} idx={idx} />
            </div>
          ))}
      </Fragment>
    );
  }
}

Leaderboard.propTypes = {
  users: PropTypes.object.isRequired,
};

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Leaderboard);
