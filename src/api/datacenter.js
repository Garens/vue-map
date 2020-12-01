

import request from '@/utils/request'

export function getInfoList() {
  return request({
    url: '/datacenter/getInfoList',
    method: 'post'
  })
}

//获取组织机构列表
export function getAllOrgBranchList() {
  return request({
    url: '/datacenter/getAllOrgBranchList',
    method: 'post'
  })
}
//获取实时流量数据
export function getPassengerFlowVos() {
  return request({
    url: '/datacenter/getPassengerFlowVos',
    method: 'post'
  })
}

//获取地图边上统计数据
export function getShowIndexStatistics() {
  return request({
    url: '/datacenter/getShowIndexStatistics',
    method: 'post'
  })
}


//获取数据节点分布统计
export function getOrgDistribution() {
  return request({
    url: '/datacenter/getOrgDistribution',
    method: 'post'
  })
}

//获取设备分类统计
export function getDeviceStatistics() {
  return request({
    url: '/datacenter/getDeviceStatistics',
    method: 'post'
  })
}

//统计人员岗位信息
export function getStaffStatistics() {
  return request({
    url: '/datacenter/getStaffStatistics',
    method: 'post'
  })
}

//获取访问量排行榜
export function getTopStream() {
  return request({
    url: '/datacenter/getTopStream',
    method: 'post'
  })
}

//最新访问信息
export function getAwards() {
  return request({
    url: '/datacenter/getAwards',
    method: 'post'
  })
}

//获取运行情况
export function getOperation() {
  return request({
    url: '/datacenter/getOperation',
    method: 'post'
  })
}

//获取运行情况
export function getSafetyCheckStatistics() {
  return request({
    url: '/datacenter/getDeviceWarning',
    method: 'post'
  })
}

//获取消息列表
export function getShowMessageList() {
  return request({
    url: '/datacenter/getShowMessageList',
    method: 'post'
  })
}
