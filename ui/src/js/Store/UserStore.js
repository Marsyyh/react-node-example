import axios from 'axios'
import { autorun, action, computed, observable } from 'mobx'
import { userProfileURL } from '../util/constants'
import { getCookie } from '../util/helper'

class UserStore {
  @observable name = 'ares'
  @observable policy = []
  @observable login = false
  @observable loading = false

  @computed get hiddenStyle() {
    return !this.loading ? "visible" : "hidden"
  }
  @computed get loginText() {
    return this.login ? 'Logout' : 'Login'
  }
  @computed get loginPath() {
    return this.login ? '/logout' : '/login'
  }
  @computed get welcome() {
    return this.login ? 'Welcome, ' + this.name : 'You are not logged in'
  }
  @computed get canKdm() {
    return this.policy.indexOf('canKdm') > -1
  }
  @computed get canTestFoo() {
    return this.policy.indexOf('canTestFoo') > -1
  }
  @computed get canTestBar() {
    return this.policy.indexOf('canTestBar') > -1
  }
  @computed get canEditUser() {
    return this.policy.indexOf('canEditUser') > -1
  }

  @action
  async setUserProfile(cb) {
    let token = getCookie('user-token')
    if(token){
      this.loading = true
      try {
        const res = await axios.get( userProfileURL, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        this.name = res.data.profile.username
        this.policy = res.data.profile.policy
        this.login = true
        if(cb) cb()
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    }
  }

  @action.bound
  logout () {
    this.name = ''
    this.policy = []
    this.login = false
  }
}

var store = window.store = new UserStore

export default store
