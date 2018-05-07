import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter} from 'react-router-dom'
import { inject, observer } from 'mobx-react'

export default (Component, policy) => {

  @inject('userStore') @observer
  class AuthRedirectHOC extends React.Component {
    render () {
      if(this.props.userStore['policy']){
        return (
          <Component {...this.props} />
        )
      }
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: this.props.location }
          }}
        />
      )
    }
  }

  return withRouter(AuthRedirectHOC)
}
