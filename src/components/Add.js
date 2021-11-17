import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Header,
  Grid,
  Divider,
  Form,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { handleAddQuestion } from '../actions/shared';
import { withRouter } from 'react-router-dom';

class Add extends Component {
  state = {
    questionOne: '',
    questionTwo: '',
  };

  handleQuestionOne = (e) => {
    const questionOne = e.target.value;
    this.setState(() => ({
      questionOne,
    }));
  };

  handleQuestionTwo = (e) => {
    const questionTwo = e.target.value;
    this.setState(() => ({
      questionTwo,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { questionOne, questionTwo } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddQuestion(questionOne, questionTwo));

    this.setState(() => ({
      questionOne: '',
      questionTwo: '',
    }));

    this.props.history.push('/');
  };

  render() {
    const disabled = this.state.option1 === '' || this.state.option2 === '';
    return (
      <Segment.Group>
        <Header as='h3' textAlign='left' block attached='top'>
          Create a New Poll
        </Header>
        <Grid padded>
          <Grid.Column>
            {this.state.isLoading && (
              <Dimmer active inverted>
                <Loader content='Updating' />
              </Dimmer>
            )}
            <p>Complete the question:</p>
            <p>
              <strong>Would you rather...</strong>
            </p>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                id='option1'
                placeholder='Enter option one...'
                value={this.state.questionOne}
                           onChange={this.handleQuestionOne}
                required
              />
              <Divider horizontal>Or</Divider>
              <Form.Input
                id='option2'
                placeholder='Enter option two...'
                value={this.state.questionTwo}
                      onChange={this.handleQuestionTwo}
                required
              />
              <Form.Button positive size='tiny' fluid disabled={disabled}>
                Submit
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment.Group>      
    );
  }
}

export default withRouter(connect()(Add));
