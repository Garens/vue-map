

import request from '@/utils/request'

export function getInfoList() {
  return request({
    url: '/map/getInfoList',
    method: 'post'
  })
}


export function getAllOrgBranchList() {
  return request({
    url: '/map/getAllOrgBranchList',
    method: 'post'
  })
}