import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:5484/api/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'http://localhost:5484/api/logout',
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: 'http://localhost:5484/api/getInfo',
    method: 'post',
  })
}

export function getAIConfig() {
  return request({
    url: 'http://localhost:5484/api/getAIConfig',
    method: 'post',
  })
}