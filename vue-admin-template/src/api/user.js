import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/user/login',
    method: 'post',
    data
  })
}
export function getInfo(token) {
  return request({
    url: '/user/getUserByToken',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/getUserByToken',
    method: 'get'
  })
}

// export function getInfo(token) {
//   return request({
//     // url: '/vue-admin-template/user/info',
//     url: '/user/getUserByToken',
//     method: 'get',
//     params: {
//       token
//     }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
