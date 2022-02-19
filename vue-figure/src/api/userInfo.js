import request from '@/utils/request'

export default {
  // get user list
  getUserList(current, limit, searchObj) {
    return request({
      url: `/admin/user/${current}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  lockOrUnlock(userId, status) {
    return request({
        url: `/admin/user/lockOrUnlock/${userId}/${status}`,
        method: 'put'
    })
  }
}
