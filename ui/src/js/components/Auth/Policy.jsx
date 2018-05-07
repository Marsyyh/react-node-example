import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Container } from 'semantic-ui-react'

@inject('adminStore') @observer
class Policy extends React.Component {
  componentWillMount () {
    this.props.adminStore.setPolicy()
  }

  render () {
    let list = this.props.adminStore.policy.map((name) => <div key={name.id}>{name.policyname}</div> )

    return (
      <Container>
        <h3>Avaliable Policies</h3>
        {list}
      </Container>
    )
  }
}

export default Policy;
