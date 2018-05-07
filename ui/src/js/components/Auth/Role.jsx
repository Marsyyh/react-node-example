import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Button, Container, Label, Icon, Table } from 'semantic-ui-react'

@inject('adminStore') @observer
class Role extends React.Component {
  componentWillMount () {
    this.props.adminStore.setRole()
  }

  render () {
    let list = this.props.adminStore.role.map((name) => <div key={name.id}>{name.rolename}</div> )

    return (
      <Container>
        <h3>Avaliable Roles</h3>
        {list}
      </Container>
    )
  }
}

export default Role;
