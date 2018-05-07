import React from 'react'
import PropTypes from 'prop-types'
import Footer from './Footer.jsx'
import { FloatRepo } from '../Addon'
import DesktopContainer from './DesktopContainer.jsx'
import MobileContainer from './MobileContainer.jsx'

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node
}

const Layout = ({ children }) => (
    <ResponsiveContainer>
      {children}
      <Footer />
      <FloatRepo />
    </ResponsiveContainer>
)

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
