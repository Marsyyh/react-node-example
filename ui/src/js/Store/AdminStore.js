import { autorun, action, computed, observable } from 'mobx'
import { AdminURL } from '../util/constants'
import { getWithAuth } from '../util/helper'

class AdminStore {
  @observable user = []
  @observable role = []
  @observable policy = []

  @action.bound
  setPolicy (ecb = null) {
    getWithAuth( AdminURL + '/policy', res => {
      this.policy = res.data.policy
    }, ecb)
  }

  @action.bound
  setUser (ecb = null) {
    getWithAuth( AdminURL + '/user', res => {
      this.user = res.data.user
    }, ecb)
  }

  @action.bound
  setRole (ecb = null) {
    getWithAuth(AdminURL + '/role', res => {
      this.role = res.data.role
    }, ecb)
  }

  @action.bound
  deleteUser (user, ecb = null) {
    getWithAuth(`${AdminURL}/user/${user.id}/delete`, res => {
      this.user.remove(user)
    }, ecb)
  }

  @action.bound
  logout () {
    this.user = []
    this.policy = []
    this.role = []
  }

}

var adminStore = window.adminStore = new AdminStore

export default adminStore

autorun(() => {
  // console.log(store.name)
})
