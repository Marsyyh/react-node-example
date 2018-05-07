import React from 'react'
import axios from 'axios'
import { authURL } from '../../util/constants'
import { inject, observer } from 'mobx-react'
import { Grid, Header, Segment, Form, Button, Message, Image } from 'semantic-ui-react'
import { setCookie } from '../../util/helper'
import { NavLink } from 'react-router-dom'

@inject('userStore') @observer
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  handleInputChange (e) {
    this.setState({email: e.target.value})
  }

  async submit () {
    console.log('Start calling')
    try {
      const data = 'client_id=1&grant_type=password&password=1&scope=profile&username=' + this.state.email
      const res = await axios.post( authURL, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(res)
      setCookie('user-token', res.data.accessToken)
      this.props.userStore.setUserProfile(() => {this.props.history.push('/')})
      // this.name = res.data.profile.username
      // this.login = true
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Button color='blue' as={NavLink} to='/' >Go back</Button>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
              <Image src='https://login.timewarner.com/images/ask_logo.png' style={{ width: '30%' }}></Image>
              {' '}Log-in to your account
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  value={this.state.email}
                  onChange={this.handleInputChange.bind(this)}
                />
                <Button color='blue' fluid size='large' onClick={this.submit.bind(this)}>Login</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Login;
