import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import {
  Button,
  Container,
  Header,
  Image
} from 'semantic-ui-react'

class NoMatch extends React.Component {
  render () {
    return (
      <Container text>
        <Header
          as='h1'
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '3em'
          }}
          content='Opps'
        />
        <Header
          as='h2'
          content="We could't find your page"
          style={{
            fontSize: '1.7em',
            fontWeight: 'normal',
            marginTop: '1.5em'
          }}
        />
        <Button
          as={NavLink}
          to='/'
          color='blue'
          content='Home'
        />
        <Image
          rounded
          size='huge'
          src='/assets/images/404.jpg'
        />
      </Container>
    )
  }
}

export default NoMatch;
