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
  },
  getSeriesByCompanyCode(companyCode) {
    return request({
      url: `/admin/comp/series/getSeries/${companyCode}`,
      method: 'get'
    })
  },
  getSchedule(current, limit, companyCode, seriesCode) {
    return request({
      url: `/admin/comp/schedule/getFigureSchedule/${current}/${limit}/${companyCode}/${seriesCode}`,
      method: 'get'
    })
  },
  getScheduleDetail(companyCode, seriesCode, orderDate) {
    return request({
      url: `/admin/comp/schedule/getFigureDetails/${companyCode}/${seriesCode}/${orderDate}`,
      method: 'get'
    })
  }
}
