

import request from '@/utils/request'

export function getInfoList() {
  return request({
    url: '/map/getInfoList',
    method: 'post'
  })
}