import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter} from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { NoMatch } from '../Layout'

export default (Component, policy) => {

  @inject('userStore') @observer
  class AuthNotMatchHOC extends React.Component {
    render () {
      if(this.props.userStore[policy]){
        return (
          <Component {...this.props} />
        )
      }
      return (
        <NoMatch />
      )
    }
  }

  return withRouter(AuthNotMatchHOC)
}
