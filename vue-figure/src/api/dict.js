import request from '@/utils/request'

export default {
  // get dictionary data
  getDictList(id) {
    return request({
      url: `/admin/cmn/dict/findChildData/${id}`,
      method: 'get'
    })
  }
}
