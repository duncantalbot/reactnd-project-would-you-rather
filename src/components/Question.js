import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { handleAnswerQuestion } from '../actions/shared';
import PropTypes from 'prop-types';

import {
  Header,
  Button,
  Form,
  Radio,
  Segment,
  Grid,
  Image,
  Progress,
  Label,
  Icon,
} from 'semantic-ui-react';

const YourVoteLabel = () => (
  <Label color='orange' ribbon='right' className='vote'>
    <Icon name='check circle outline' size='big' className='compact' />
    <div style={{ float: 'right' }}>
      Your
      <br />
      Vote
    </div>
  </Label>
);

class Question extends Component {
  state = {
    option: '',
    submit: true,
  };

  handleSelection = (option) => {
    this.setState(() => ({
      option,
      submit: false,
    }));
  };

  handleClick = () => {
    this.props.history.push('/');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submit: true });
    const { option } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAnswerQuestion(this.props.match.params.question_id, option));
    this.props.history.push(
      `/questions/${this.props.match.params.question_id}`
    );
  };

  getPercent = (numberVotes, totalVotes) => {
    let percent = 0;
    if (numberVotes > 0) {
      percent = Math.round((numberVotes / totalVotes) * 100);
    }
    return percent;
  };

  render() {
    const { authedUser, questions, users } = this.props;
    const disabled = this.state.value === '' ? true : false;
    const question = questions[this.props.match.params.question_id];
  
    if (!question) {
      return <Redirect to='/404' />;
    }
    const totalVoteNum =
      question.optionOne.votes.length + question.optionTwo.votes.length;

    const questionOneVotePercent = this.getPercent(
      question.optionOne.votes.length,
      totalVoteNum
    );
    const questionTwoVotePercent = this.getPercent(
      question.optionTwo.votes.length,
      totalVoteNum
    );

   
    if (
      question.optionOne.votes.indexOf(authedUser) !== -1 ||
      question.optionTwo.votes.indexOf(authedUser) !== -1
    ) {
      return (
        <Segment.Group>
          <Header as='h5' textAlign='left' block attached='top'>
            Asked by: {users[question.author].name}
          </Header>

          <Grid divided padded>
            <Grid.Row>
              <Grid.Column width={5}>
                <Image src={users[question.author].avatarURL} />
              </Grid.Column>
              <Grid.Column width={11}>
                <h3>Results:</h3>
                <Segment
                  color='green'
                  style={{ backgroundColor: 'honeyDew' }}
                >
                  {question.optionOne.votes.indexOf(authedUser) !== -1 ? (
                    <YourVoteLabel />
                  ) : (
                    false
                  )}

                  <p style={{ fontWeight: 'bold' }}>
                    {question.optionOne.text}
                  </p>
                  <Progress
                    percent={questionOneVotePercent}
                    progress
                    color='green'
                  >
                    {question.optionOne.votes.length} out of {totalVoteNum}{' '}
                    {totalVoteNum > 1 ? 'votes' : 'vote'}
                  </Progress>
                </Segment>
                <Segment
                  color='green'
                  style={{ backgroundColor: 'honeyDew' }}
                >
                  {question.optionTwo.votes.indexOf(authedUser) !== -1 ? (
                    <YourVoteLabel />
                  ) : (
                    false
                  )}

                  <p style={{ fontWeight: 'bold' }}>
                    {question.optionTwo.text}
                  </p>
                  <Progress
                    percent={questionTwoVotePercent}
                    progress
                    color='green'
                  >
                    {question.optionTwo.votes.length} out of {totalVoteNum}{' '}
                    {totalVoteNum > 1 ? 'votes' : 'vote'}
                  </Progress>
                </Segment>
                {/* <Form.Field> */}
                <Button size='tiny' floated='right' onClick={this.handleClick}>
                  Back
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>         
        </Segment.Group>       
      );
    }
   
    return (
      <Segment.Group>
        <Header as='h5' textAlign='left' block attached='top'>
          {users[question.author].name} asks:
        </Header>

        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={users[question.author].avatarURL} />
            </Grid.Column>
            <Grid.Column width={11}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <Radio
                    label={question.optionOne.text}
                    name='radioGroup'
                    value='optionOne'
                    onChange={() => this.handleSelection('optionOne')}
                    checked={this.state.option === 'optionOne'}
                  />
                  <br />
                  <Radio
                    label={question.optionTwo.text}
                    name='radioGroup'
                    value='optionTwo'
                    onChange={() => this.handleSelection('optionTwo')}
                    checked={this.state.option === 'optionTwo'}
                  />
                </Form.Field>
                <Form.Field>
                  <Button
                    color='green'
                    size='tiny'
                    fluid
                    positive
                    disabled={disabled}
                    content='Submit'
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}

Question.propTypes = {
  questions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  authedUser: PropTypes.string.isRequired,
};

function mapStateToProps({ questions, users, authedUser }) {
  return {
    authedUser,
    questions,
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
