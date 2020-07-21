import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

import Vue from 'vue'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    user: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER: (state, user) => {
    state.user = user
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginName: loginName.trim(), password: password }).then(response => {
        // const { data } = response
        // debugger
        // console.log('登陆接口')
        // console.log(response)
        // eslint-disable-next-line no-empty
        if (response.status) {
          Vue.prototype.$message({
            type: 'error',
            message: response.message
          })
        }
        // commit('SET_TOKEN', data.token)
        // console.log(response, 'response')
        // console.log(response.user, 'response.user response.user response.user')  
        // const userRole = response.user.role
        // console.log(userRole, 'user user user user user user user')
        commit('SET_USER', response.user)
        commit('SET_NAME', response.user.name)
        commit('SET_AVATAR', response.user.avatar)
        commit('SET_ROLES', response.user.role)
        commit('SET_TOKEN', response.token)

        setToken(response.token)
        // setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
        // console.log(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // const { data } = response
        // console.log('用户接口')
        // console.log(response)
        const { role, name, avatar, introduction } = response
        if (!role || role.length <= 0) {
          reject('Verification failed, please Login again.')
        }
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        // commit('SET_INTRODUCTION', introduction)
        // commit('SET_ROLES', role)
        // debugger

        resolve(response)

        // if (!data) {
        //   reject('Verification failed, please Login again.')
        // }
        // const { name, avatar } = data
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        // resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

