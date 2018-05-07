import React from 'react'
import { Layout } from './Layout'
import { inject, observer } from 'mobx-react'
import { Segment, Button, Grid, Header, Image} from 'semantic-ui-react'

@inject('userStore') @observer
class Home extends React.Component {
  state = {}

  render () {
    return (
      <Layout>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>{this.props.userStore.welcome}</Header>
                <Header as='h3' style={{ fontSize: '2em' }}>Cat language you should learn</Header>
                <p style={{ fontSize: '1.33em' }}>
                  Short meow: “Hey, how ya doin’?” <br />
                  Multiple meows: “I’m so happy to see you! Where’ve you been? I missed you!” <br />
                  Mid-pitch meow: A plea for something, usually dinner, treats, or to be let outside. <br />
                  Drawn-out mrrraaaaaoooow: “Did you forget to feed me, you idiot? I want dinner NOW!” or similar demand. <br />
                </p>
                <Header as='h3' style={{ fontSize: '2em' }}>Name your cat</Header>
                <p style={{ fontSize: '1.33em' }}>
                  Catenau Peallulu Doleaqac Buffidaako Taakelope Burserpillar Balhopper Meseefly Vleadea Vausten Elephacle Wolephant
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Image
                  bordered
                  rounded
                  size='large'
                  src='https://drive.google.com/uc?export=view&id=1QmImOw-sVW8Bg9xLojP6otY2tefiVWJr'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Button size='huge'>Check Them Out</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Layout>
    )
  }
}

export default Home;
