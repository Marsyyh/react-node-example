import React from 'react'
import { Layout } from '../Layout'
import { inject, observer } from 'mobx-react'
import { Switch, Route, Link, withRouter } from 'react-router-dom'
import { AuthNotRender } from '../HOC'
import { TestBar, TestFoo } from './index'

@withRouter @inject('kdmStore') @observer
class KDM extends React.Component {
  componentWillMount () {
    this.props.kdmStore.setStore()
  }

  render () {
    let list = this.props.kdmStore.policy.map((name, i) => <li key={i}>{name}</li> )
    return (
      // Redirect if no user login
      <Layout>
        <div>
          <h3>Welcome, {this.props.kdmStore.name}</h3>
          <h4>Your Profile</h4>
          <ul>{list}</ul>

          <hr />
          <h4>Link with permission</h4>
          <ul>
            <li><Link to='/kdm/testfoo'>Test Foo</Link></li>
            <li><Link to='/kdm/testbar'>Test Bar</Link></li>
          </ul>
        </div>
        <Switch>
          <Route path='/kdm/testfoo' component={AuthNotRender(TestFoo, 'canTestFoo')} />
          <Route path='/kdm/testbar' component={AuthNotRender(TestBar, 'canTestBar')} />
        </Switch>
      </Layout>
    )
  }
}

export default KDM;
