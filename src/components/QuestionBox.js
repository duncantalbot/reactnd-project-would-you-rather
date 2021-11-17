import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Segment, Header, Grid, Image } from 'semantic-ui-react';

export class QuestionBox extends Component {
  render() {
    const viewPoll = (id) => {
      this.props.history.push(`questions/${id}`);
    };

    if (this.props === null) {
      return <p>This question does not exist.</p>;
    }

    const { name, avatar, text, id } = this.props;

    return (
      <Segment.Group>
        <Header as='h5' textAlign='left' block attached='top'>
          {name} asks:
        </Header>

        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={avatar} />
            </Grid.Column>
            <Grid.Column width={11}>
              <h4>Would you rather...</h4>
              <p>
                ...
                {text}
                ...
              </p>
              <Button content='View Poll' onClick={(e) => viewPoll(id)} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}
// <div className="card question">
//   <div className="card-header">
//     <h6 className="card-title">{name} asks:</h6>
//   </div>
//   <div className="card-content">
//     <div className="row">
//       <div className="col s12 m4 l3">
//         <img src={avatar} alt={name} className="avatar" />
//       </div>
//       <div className="col s12 m8 l9">
//         <h4>Would you rather...</h4>
//         <p>
//           ...
//           {text}
//           ...
//         </p>
//         <button
//           className="waves-effect waves-light btn"
//           onClick={e => viewPoll(id)}
//         >
//           View poll
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];

  return {
    name: users[question.author].name,
    text: question.optionOne.text,
    avatar: users[question.author].avatarURL,
    id: question.id,
  };
}
export default withRouter(connect(mapStateToProps)(QuestionBox));
