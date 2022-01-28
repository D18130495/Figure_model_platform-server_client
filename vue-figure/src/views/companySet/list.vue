<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" style="text-align: right;">
      <el-form-item>
        <el-input v-model="searchObj.compName" placeholder="Company Name" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.compCode" placeholder="Company Code" />
      </el-form-item>
      <el-button type="primary" @click="getList()">Search</el-button>
    </el-form>
    <!-- table -->
    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" label="index" />
      <el-table-column prop="compName" label="Company Name" />
      <el-table-column prop="compCode" label="Company Code" />
      <el-table-column prop="apiUrl" label="API Url" />
      <el-table-column prop="contactsName" label="Contant Name" />
      <el-table-column prop="contactsPhone" label="Contant Phone" />
      <el-table-column label="status">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? 'able' : 'disable' }}
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
import companySet from '@/api/companySet'

export default {
  data() {
    return {
      current: 0,
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
    getList(page = 1) {
      this.current = page
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
