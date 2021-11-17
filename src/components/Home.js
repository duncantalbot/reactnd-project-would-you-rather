import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionBox from './QuestionBox';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

class Home extends Component {
  state = {
    activeTab: 'unanswered',
  };

  handleTabChange = (tab) => {
    this.setState(() => ({
      activeTab: tab,
    }));
  };

  render() {
    const { orderedQuestions } = this.props;

    const panes = [
      {
        menuItem: 'Unanswered Questions',
        render: () => (
          <Tab.Pane  className='tab'>
            {' '}
            <div>
              {orderedQuestions
                .filter(
                  (question) =>
                    question.optionOneAnswered !== true &&
                    question.optionTwoAnswered !== true
                )
                .map((question) => {
                  return (
                    <Tab.Pane key={question.id}>
                      <QuestionBox id={question.id} />
                    </Tab.Pane>
                  );
                })}
            </div>
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Answered Questions',
        render: () => (
          <Tab.Pane >
            {' '}
            <div>
              {orderedQuestions
                .filter(
                  (question) =>
                    question.optionOneAnswered === true ||
                    question.optionTwoAnswered === true
                )
                .map((question) => {
                  return (
                    <Tab.Pane key={question.id}>
                      <QuestionBox id={question.id} />
                    </Tab.Pane>
                  );
                })}
            </div>
          </Tab.Pane>
        ),
      },
    ];

    return (
      <div>
        <Tab  panes={panes} className='tab' />        
      </div>   
    );
  }
}

Home.propTypes = {
  orderedQuestions: PropTypes.array.isRequired,
};

function mapStateToProps({ questions, authedUser }) {
  return {
    orderedQuestions: Object.keys(questions)
      .map((question) => {
        return {
          ...questions[question],
          optionOneAnswered:
            questions[question].optionOne.votes.indexOf(authedUser) === -1
              ? false
              : true,
          optionTwoAnswered:
            questions[question].optionTwo.votes.indexOf(authedUser) === -1
              ? false
              : true,
        };
      })
      .sort((a, b) => b.timestamp - a.timestamp),
  };
}

export default connect(mapStateToProps)(Home);
