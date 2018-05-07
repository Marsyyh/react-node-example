import React from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Dropdown, Form, Input, Icon } from 'semantic-ui-react'
import { AdminURL } from '../../util/constants'
import { postWithAuth, getWithAuth } from '../../util/helper'

class UserCreate extends React.Component {
  state = { name: '', options: [], currentValues: []}

  componentWillMount () {
    getWithAuth( `${AdminURL}/role`, res => {
      this.setState({options: res.data.role.map(itm => {
        return {
          key: itm.id,
          value: itm.id,
          text: itm.rolename
        }
      })})
    })
  }

  handleDropChange (e, {value}) {
    this.setState({ currentValues: value })
  }

  handleInputChange( e, {value}) {
    this.setState({ name: value })
  }

  handleSave (e, {value}) {
    postWithAuth( `${AdminURL}/user/create`, {
      name: this.state.name,
      roles: this.state.currentValues
    }, res => {
      console.log('Yay')
    }, err => {
      console.log('err')
    })
  }

  render () {

    const { options, currentValues} = this.state

    return (
      <Container>
        <h3>Create User</h3>
        <Form>
          <Form.Field>
            <label>name</label>
            <Input onChange={this.handleInputChange.bind(this)} placeholder='Name ...' />
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

export default UserCreate;
