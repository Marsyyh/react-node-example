import axios from 'axios'

export const getCookie = (name) => {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const postWithToken = async (url, data = {}, scb = null, ecb = null) => {
  let token = getCookie('user-token')
  if(token){
    try {
      const res = await axios.post( url, {token: token, ...data}, {
        withCredentials: true
      })
      console.log(res)
      if(scb){
        scb(res)
      }
    } catch (err) {
      if(ecb){
        ecb(err)
      }
      console.log(err)
    }
  }
}

export const postWithAuth = async (url, data = {}, scb = null, ecb = null) => {
  let token = getCookie('user-token')
  if(token){
    try {
      const res = await axios.post( url, {token: token, ...data}, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      console.log(res)
      if(scb){
        scb(res)
      }
    } catch (err) {
      if(ecb){
        ecb(err)
      }
      console.log(err)
    }
  }
}

export const getWithAuth = async (url, scb = null, ecb = null) => {
  let token = getCookie('user-token')
  if(token){
    try {
      const res = await axios.get( url, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      console.log(res)
      if(scb){
        scb(res)
      }
    } catch (err) {
      if(ecb){
        ecb(err)
      }
      console.log(err)
    }
  }
}
