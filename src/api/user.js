import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:5484/api/login',
    method: 'post',
    data
  })
}
