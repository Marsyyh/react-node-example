import React from 'react'
import Home from './Home.jsx'
import { Kdm } from './KDM'
import { NoMatch, Loading } from './Layout'
import { Admin, Login, Logout } from './Auth'
import { AuthRedirect, AuthNotMatch } from './HOC'
import { inject, observer } from 'mobx-react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

// @withRouter is required otherwise @observer will not work
// https://stackoverflow.com/questions/43661560/why-does-mobx-react-observer-break-react-router-dom-navlink-active-class
// https://github.com/mobxjs/mobx-react/issues/251
@withRouter @inject('userStore') @observer
class AppRoutes extends React.Component {
  componentWillMount () {
    this.props.userStore.setUserProfile()
  }

  render () {
    if(this.props.userStore.loading){
      return (<Loading />)
    }
    return (
      <Switch>
        <Route path='/index' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/kdm' component={AuthRedirect(AuthNotMatch(Kdm, 'canKdm'), 'login')} />
        <Route path='/admin' component={AuthRedirect(AuthNotMatch(Admin, 'canEditUser'), 'login')} />
        <Route path='/logout' component={AuthRedirect(Logout, 'login')} />
        <Redirect exact from='/' to='/index' />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export default AppRoutes;
