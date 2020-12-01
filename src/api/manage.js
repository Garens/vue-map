

import request from '@/utils/request'

export function fetchItem() {
  return request({
    url: '/map/getInfoList',
    method: 'post'
  })
}