

import request from '@/utils/request'

//记录浏览次数
export function ihavesee() {
  return request({
    url: '/stream/ihavesee',
    method: 'post'
  })
}
