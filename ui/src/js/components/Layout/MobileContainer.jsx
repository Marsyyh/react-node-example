import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import {
  Button,
  Container,
  Menu,
  Responsive,
  Icon,
  Segment,
  Sidebar
} from 'semantic-ui-react'

const AdminNav = () => (
  <Menu.Item as={NavLink} to='/admin'>Admin</Menu.Item>
)

const KdmNav = () => (
  <Menu.Item as={NavLink} to='/kdm'>KDM</Menu.Item>
)

@inject('userStore') @observer
class MobileContainer extends React.Component {
  state = {}

  @computed get adminNav () {
    return this.props.userStore.canEditUser ? (<AdminNav />): null
  }

  @computed get kdmNav () {
    return this.props.userStore.canKdm ? (<KdmNav />): null
  }

  handleToggleOpen = () => {
    if(!this.state.sidebarOpened){
      this.setState({ sidebarOpened: true })
    }
  }

  handleToggleClose = () => {
    if(this.state.sidebarOpened){
      this.setState({ sidebarOpened: false })
    }
  }

  render () {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation="uncover" inverted vertical visible={sidebarOpened}>
            <Menu.Item exact as={NavLink} to='/index'>Home</Menu.Item>
            {this.kdmNav}
            {this.adminNav}
            <Menu.Item as={NavLink} to={this.props.userStore.loginPath}>{this.props.userStore.loginText}</Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handleToggleClose.bind(this)}style={{ minHeight: '100vh' }}>
            <Segment inverted textAlign='center' onClick={this.handleToggleOpen.bind(this)} style={{ minHeight: 60, padding: '1em 0em' }} vertical>
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggleOpen.bind(this)}>
                      <Icon name='sidebar' />
                    </Menu.Item>
                    <Menu.Item position='right'>
                      <Button as='a' inverted>{this.props.userStore.loginText}</Button>
                    </Menu.Item>
                </Menu>
              </Container>
            </Segment>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
}

export default MobileContainer;
