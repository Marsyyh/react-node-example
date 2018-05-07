import React from 'react'
import { Provider } from 'mobx-react'
import userStore from '../Store/UserStore'
import adminStore from '../Store/AdminStore'
import kdmStore from '../Store/kdmStore'
import AppRoutes from './AppRoutes.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

const stores = { userStore, adminStore, kdmStore }

class App extends React.Component {
  render () {
    return (
      <Provider {...stores}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    )
  }
}

export default App;
