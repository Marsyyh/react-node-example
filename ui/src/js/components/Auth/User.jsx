import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Button, Container, Label, Icon, Table } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import _ from 'lodash'

@inject('adminStore') @observer
class User extends React.Component {
  constructor (props) {
    super(props)
    this.deleteUser = this.deleteUser.bind(this)
  }

  componentWillMount () {
    this.props.adminStore.setUser()
  }

  deleteUser (user) {
    console.log('delete user with id: ', user.id)
    this.props.adminStore.deleteUser(user)
  }

  render () {
    let list = this.props.adminStore.user.map((user) => (
      <Table.Row key={user.id}>
        <Table.Cell>
          {user.username}
        </Table.Cell>
        <Table.Cell>
          {_.join(_.map(user.Roles, 'rolename'), ', ')}
        </Table.Cell>
        <Table.Cell>
          <Button as='div' labelPosition='right'>
            <Button as={NavLink} to={`/admin/user/${user.id}/edit`} basic color='blue'>
              <Icon name='edit' />
              Edit
            </Button>
            <Label as='a' onClick={() => this.deleteUser(user)} basic color='red'>
              <Icon name='trash outline' />
              Delete
            </Label>
          </Button>
        </Table.Cell>
      </Table.Row>)
    )

    return (
      <Container>
        <div>
          <h3 style={{float:'left'}}>Avaliable Users</h3>
          <Button as={NavLink} to='/admin/user/create' style={{float: 'right', marginBottom: '10px'}} positive >
            <Icon name="add" />
            Add User
          </Button>
        </div>
        <Table compact fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {list}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

export default User;
