import request from '@/utils/request'

export function gptstatus() {
  return request({
    url: 'https://mygpt.lllinux.cn/status',
    method: 'get',
  })
}