import { autorun, action, computed, observable } from 'mobx'
import { KDMURL, KDMFoo, KDMBar } from '../util/constants'
import { postWithToken } from '../util/helper'

class KDMStore {
  @observable name = ''
  @observable foo = ''
  @observable bar = ''
  @observable policy = []

  @action.bound
  setStore (cb) {
    postWithToken(KDMURL, {}, (res) => {
      console.log(res)
      this.name = res.data.profile.username
      this.policy = res.data.profile.policy
    }, (err) => {
      console.log(err)
      if(cb){
        cb()
      }
    })
  }

  @action.bound
  setTestFoo () {
    postWithToken(KDMFoo, {}, (res) => {
      console.log(res)
      this.foo = res.data.foo
    }, (err) => {
      console.log(err)
      this.foo = ''
    })
  }

  @action.bound
  setTestBar () {
    postWithToken(KDMBar, {}, (res) => {
      console.log(res)
      this.bar = res.data.bar
    }, (err) => {
      console.log(err)
      this.bar = ''
    })
  }
}

var kdmstore = window.kdmstore = new KDMStore

export default kdmstore
