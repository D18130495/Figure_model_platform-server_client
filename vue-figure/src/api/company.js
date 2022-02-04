import request from '@/utils/request'

export default {
  // get company list
  getCompanyList(current, limit, searchObj) {
    return request({
      url: `/admin/comp/company/list/${current}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  getCompanyDetail(id) {
    return request({
      url: `/admin/comp/company/showCompanyDetail/${id}`,
      method: 'get'
    })
  }
}
