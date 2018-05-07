import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

@inject('kdmStore') @observer
class TestBar extends React.Component {
  componentWillMount () {
    this.props.kdmStore.setTestBar()
  }

  render () {
    return (
      <div>
        <hr />
        <h4>Content</h4>
        <p>This is bar</p>
        <p>{this.props.kdmStore.bar}</p>
      </div>
    )
  }
}

export default TestBar;
