<template>
  <div class="app-container">
    <el-table :data="list" style="width: 100%" border>
      <el-table-column type="index" label="ID" />
      <el-table-column label="Company LOGO" align="center" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.logoData" width="80">
        </template>
      </el-table-column>
      <el-table-column prop="companyName" label="Company Name" align="center" width="200" />
      <el-table-column prop="address" label="Company Address" align="center" width="350" />
      <el-table-column label="Status" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? 'Online' : 'Offline' }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="Create time" align="center" />
      <el-table-column label="Operation" width="140" align="center">
        <template slot-scope="scope">
          <router-link :to="'/company/show/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-info" />
          </router-link>
          <router-link :to="'/company/series/'+scope.row.companyCode" style="padding-left: 10px">
            <el-button type="primary" size="mini" icon="el-icon-s-tools" />
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- pagination -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import company from '@/api/company'

export default {
  data() {
    return {
      current: 0,
      limit: 3,
      query: 0,
      total: 0,
      searchObj: {},
      list: []
    }
  },
  created() {
    this.getList(1)
  },
  methods: {
    getList(val) {
      this.query = val - 1
      company.getCompanyList(this.query, this.limit, this.searchObj)
        .then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
