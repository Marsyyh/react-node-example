import React from 'react'
import PropTypes from 'prop-types'
import { setCookie } from '../../util/helper'
import { inject, observer } from 'mobx-react'

@inject('userStore', 'adminStore') @observer
class Logout extends React.Component {
  componentWillMount () {
    //TODO:: send call to server to logout user
    setCookie('user-token', '', 1)
    this.props.userStore.logout()
    this.props.adminStore.logout()
    this.props.history.push('/')
  }

  render () {
    return null
  }
}

export default Logout;
