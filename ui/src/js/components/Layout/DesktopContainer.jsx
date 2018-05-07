import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import {
  Button,
  Container,
  Responsive,
  Segment,
  Menu,
  Visibility
} from 'semantic-ui-react'

const AdminNav = () => (
  <Menu.Item as={NavLink} to='/admin'>Admin</Menu.Item>
)

const KdmNav = () => (
  <Menu.Item as={NavLink} to='/kdm'>KDM</Menu.Item>
)

@inject('userStore') @observer
class DesktopContainer extends React.Component {
  state = {}

  @computed get adminNav () {
    return this.props.userStore.canEditUser ? (<AdminNav />): null
  }

  @computed get kdmNav () {
    return this.props.userStore.canKdm ? (<KdmNav />): null
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render () {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu.bind(this)} onBottomPassedReverse={this.hideFixedMenu.bind(this)}>
          <Segment inverted textAlign='center' style={{ minHeight:60, padding: '1em 0em' }} vertical>
            <Menu
              fixed={fixed ? 'top': null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as={NavLink} to='/index'>Home</Menu.Item>
                {this.kdmNav}
                {this.adminNav}
                <Menu.Item position='right'>
                  <Button as={NavLink} to={this.props.userStore.loginPath} inverted={!fixed}>{this.props.userStore.loginText}</Button>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
}

export default DesktopContainer;
