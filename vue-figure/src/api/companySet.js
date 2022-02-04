import request from '@/utils/request'

export default {
  // get company information
  getCompanySetList(current, limit, searchObj) {
    return request({
      url: `/admin/comp/companySet/findPage/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  // get company inforamtion by id
  getCompanySetById(id) {
    return request({
      url: `/admin/comp/companySet/getCompanySet/${id}`,
      method: 'get'
    })
  },
  // delete company information by id
  deleteCompanySetById(id) {
    return request({
      url: `/admin/comp/companySet/delete/${id}`,
      method: 'delete'
    })
  },
  // delete batch company information by id
  deleteBatchCompanySetById(list) {
    return request({
      url: `/admin/comp/companySet/batchDelete`,
      method: 'delete',
      data: list
    })
  },
  // lock or unlock the company
  lockOrUnlockCompanySetById(id, compCode, status) {
    return request({
      url: `/admin/comp/companySet/lockOrUnlockCompanySet/${id}/${compCode}/${status}`,
      method: 'put'
    })
  },
  // add company information
  saveCompanySet(companySet) {
    return request({
      url: `/admin/comp/companySet/saveCompanySet`,
      method: 'post',
      data: companySet
    })
  },
  // update company information
  updateCompanySetById(companySet) {
    return request({
      url: `/admin/comp/companySet/updateCompanySet`,
      method: 'put',
      data: companySet
    })
  }
}
