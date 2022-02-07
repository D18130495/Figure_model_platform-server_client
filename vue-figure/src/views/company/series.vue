<template>
  <div class="app-container">
    <div style="margin-bottom: 10px; font-size: 10px;">Choose: </div>
    <el-container style="height: 100%">
      <el-aside width="200px" style="border: 1px silver solid">
        <el-tree
          :data="data"
          :props="defaultProps"
          :default-expand-all="true"
        /><!-- @node-click="handleNodeClick" -->
      </el-aside>
      <el-main style="padding: 0 0 0 20px;">
        <el-row style="width: 100%;" />
        <el-row style="margin-top: 20px;" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import company from '@/api/company'

export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'seriesName'
      },
      companyCode: ''
    }
  },
  created() {
    this.companyCode = this.$route.params.companyCode
    this.getSeriesById()
  },
  methods: {
    getSeriesById() {
      company.getSeriesByCompanyCode(this.companyCode)
        .then(response => {
          this.data = response.data
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
