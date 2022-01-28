import request from '@/utils/request'

export default {
  getCompanySetList(current, limit, searchObj) {
    return request({
      url: `/admin/comp/companySet/findPage/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  }
}
