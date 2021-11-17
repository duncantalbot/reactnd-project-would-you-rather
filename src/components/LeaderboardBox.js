import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Segment,
  Grid,
  Header,
  Image,
  Label,
  Divider,
} from 'semantic-ui-react';

// const LeaderboardBox = ({ name, avatar, answers, questions }) => {

const trophyColor = ['yellow', 'grey', 'orange'];

export class LeaderboardBox extends Component {
  render() {
    const { id, idx, name, avatar, answers, questions } = this.props;
    console.log(this.props)
    if (questions === null) {
      return <p>This question does not exist.</p>;
    } else {
      return (
        <Card style={{ width: '58rem' }}>
          <Card.Content>
            <Segment.Group key={id}>
              <Label corner='left' icon='trophy' color={trophyColor[idx]} />
              <Grid divided padded>
                <Grid.Row>
                  <Grid.Column width={4} verticalAlign='middle'>
                    <Image src={avatar} />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Header as='h3' textAlign='left'>
                      {name}
                    </Header>
                    <Grid>
                      <Grid.Column width={12}>Answered questions</Grid.Column>
                      <Grid.Column width={4}>{answers}</Grid.Column>
                    </Grid>
                    <Divider />
                    <Grid>
                      <Grid.Column width={12}>Created questions</Grid.Column>
                      <Grid.Column width={4}>{questions}</Grid.Column>
                    </Grid>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign='center'>
                    <Segment.Group>
                      <Header as='h5' block attached='top' content='Score' />
                      <Segment>
                        <Label circular color='green' size='big'>
                          {questions + answers}
                        </Label>
                      </Segment>
                    </Segment.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment.Group>

            {/* <div className="row">
            <div className="col s12 m4 l3">
              <Image src={avatar} alt=""/>
              <h2>{name}</h2>
            </div>
            <div className="col s12 m6">
             
              <p>
                Answered questions <span>{answers}</span>
              </p>
              <hr />
              <p>
                Created questions <span>{questions}</span>
              </p>
            </div>
            <div className="col s12 m2 l3">
              <h3>Score</h3>
              <span className="score lime darken-4">{answers + questions}</span>
            </div>
          </div> */}
          </Card.Content>
        </Card>
      );
    }
  }
}

function mapStateToProps({ users }, { id }) {
  const user = users[id];

  return {
    id: user.id,
    name: user.name,
    avatar: user.avatarURL,
    answers: Object.keys(user.answers).length,
    questions: user.questions.length,
  };
}

export default connect(mapStateToProps)(LeaderboardBox);
