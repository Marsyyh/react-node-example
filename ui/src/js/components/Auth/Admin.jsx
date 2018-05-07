import React from 'react'
import PropTypes from 'prop-types'
import { User, Role, Policy, UserCreate, UserEdit } from './index'
import { Layout } from '../Layout'
import { AuthNotRender } from '../HOC'
import { computed } from 'mobx'
import { Switch, Route, NavLink, Redirect, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import {
  Segment,
  Menu
} from 'semantic-ui-react'

@withRouter @inject('userStore', 'adminStore') @observer
class Admin extends React.Component {

  render () {
    return (
      <Layout>
        <Menu attached='top' tabular>
          <Menu.Item name='user' as={NavLink} to='/admin/user' />
          <Menu.Item name='role' as={NavLink} to='/admin/role' />
          <Menu.Item name='policy' as={NavLink} to='/admin/policy' />
        </Menu>

        <Segment attached='bottom'>
          {/*this.getSubComp*/}
          <Switch>
            <Redirect exact from='/admin' to='/admin/user' />
            <Route path='/admin/user/:id/edit' component={AuthNotRender(UserEdit, 'canEditUser')} />
            <Route path='/admin/user/create' component={AuthNotRender(UserCreate, 'canEditUser')} />
            <Route path='/admin/user' component={AuthNotRender(User, 'canEditUser')} />
            <Route path='/admin/role' component={AuthNotRender(Role, 'canEditUser')} />
            <Route path='/admin/policy' component={AuthNotRender(Policy, 'canEditUser')} />
          </Switch>
        </Segment>
      </Layout>
    )
  }
}

export default Admin;
