<template>
  <div class="app-container">
    company set
  </div>
</template>

<script>
import companySet from '@/api/companySet'

export default {
  data() {
    return {
      current: 1,
      limit: 3,
      total: 0,
      searchObj: {},
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      companySet.getCompanySetList(this.current, this.limit, this.searchObj)
        .then(response => {
          this.list = response.data.records
          this.total = response.data.total
          console.log(this.list)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
