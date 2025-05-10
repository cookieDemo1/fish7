import api from '@/api'
import { defineStore } from 'pinia'
import router from '@/router'

interface User {
  // name: string;
  // id: number;
  // status: number;
  // phone: number;
  [key: string]: any
}

const { setStorage, getStorage, removeStorage } = utils

export const useUserStore = defineStore('user', () => {
  const notAllow = ref(false)
  const user = ref<User>(getStorage('user', {}))

  function login(payload) {
    return new Promise((resolve, reject) => {
      const { phone, password } = payload
      const params = {
        phone,
        password
      }
      api
        .postUserLogin(params)
        .then((res) => {
          if (res.code === 200) {
            const { token, ...rest } = res.data
            user.value = rest
            setStorage('token', token)
            setStorage('user', rest)
          }
          resolve(res)
        })
        .catch(reject)
    })
  }

  function scanLogin(payload) {
    return new Promise<void>((resolve, reject) => {
      const { token, ...rest } = payload || {}
      console.log(rest)
      user.value = rest
      setStorage('token', token)
      setStorage('user', rest)
      router.push({ path: '/' })
      resolve()
    })
  }

  function logout() {
    return new Promise<void>((resolve) => {
      removeStorage('token')
      router.push({ name: 'login' })
      resolve()
    })
  }

  return { user, notAllow, login, scanLogin, logout }
})
