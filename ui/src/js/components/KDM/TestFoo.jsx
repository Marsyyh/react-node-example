import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

@inject('kdmStore') @observer
class TestFoo extends React.Component {
  componentWillMount () {
    this.props.kdmStore.setTestFoo()
  }

  render () {
    return (
      <div>
        <hr />
        <h4>Content</h4>
        <p>This is foo</p>
        <p>{this.props.kdmStore.foo}</p>
      </div>
    )
  }
}

export default TestFoo;
