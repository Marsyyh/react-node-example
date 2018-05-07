import React from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Dropdown, Form, Input, Icon } from 'semantic-ui-react'
import { AdminURL } from '../../util/constants'
import { postWithAuth, getWithAuth } from '../../util/helper'
import _ from 'lodash'

class UserEdit extends React.Component {
  state = { name: '', options: [], currentValues: []}

  componentWillMount () {
    let id = this.props.match.params.id
    console.log(id)
    getWithAuth( `${AdminURL}/role`, res => {
      this.setState({options: res.data.role.map(itm => {
        return {
          key: itm.id,
          value: itm.id,
          text: itm.rolename
        }
      })})
    })

    getWithAuth( `${AdminURL}/user/${id}`, res => {
      this.setState({
        name: res.data.user.username,
        currentValues: _.map(res.data.user.Roles, 'id')
      })
    })
  }

  handleDropChange (e, {value}) {
    this.setState({ currentValues: value })
  }

  handleInputChange( e, {value}) {
    this.setState({ name: value })
  }

  handleSave (e, {value}) {
    let id = this.props.match.params.id
    postWithAuth( `${AdminURL}/user/${id}/edit`, {
      name: this.state.name,
      roles: this.state.currentValues
    }, res => {
      console.log(res)
      this.props.history.push('/admin/user')
    }, err => {
      console.log(err)
    })
  }

  render () {

    const { name, options, currentValues} = this.state

    return (
      <Container>
        <h3>Edit User</h3>
        <Form>
          <Form.Field>
            <label>name</label>
            <Input value={name} onChange={this.handleInputChange.bind(this)} placeholder='Name ...' />
          </Form.Field>
          <Form.Field
            control={Dropdown}
            label='Assign Role'
            options={options}
            search
            selection
            multiple
            placeholder='No roles'
            value={currentValues}
            noResultsMessage={null}
            onChange={this.handleDropChange.bind(this)}
          />
          <Button.Group>
            <Button positive onClick={this.handleSave.bind(this)}>Save</Button>
            <Button.Or />
            <Button onClick={this.props.history.goBack}>Cancel</Button>
          </Button.Group>
        </Form>
      </Container>
    )
  }
}

export default UserEdit;
