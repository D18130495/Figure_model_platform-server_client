<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" style="text-align: right">
      <el-form-item>
        <el-input v-model="searchObj.compName" placeholder="Company Name" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.compCode" placeholder="Company Code" />
      </el-form-item>
      <el-button type="primary" @click="getList()">Search</el-button>
    </el-form>
    <div>
      <el-button type="danger" @click="removeRows()">Batch delete</el-button>
    </div>
    <!-- table -->
    <el-table :data="list" style="width: 100%" @selection-change="selectionChange">
      <el-table-column type="selection" />
      <el-table-column type="index" label="ID" />
      <el-table-column prop="compName" label="Company Name" />
      <el-table-column prop="compCode" label="Company Code" />
      <el-table-column prop="apiUrl" label="API Url" />
      <el-table-column prop="contactsName" label="Contant Name" />
      <el-table-column prop="contactsPhone" label="Contant Phone" />
      <el-table-column label="status" width="100">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? 'Able' : 'Disable' }}
        </template>
      </el-table-column>
      <el-table-column label="Operation" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeCompanySetById(scope.row.id)" />
          <el-button v-if="scope.row.status === 0" type="success" size="mini" icon="el-icon-circle-plus" @click="lockOrUnlockCompanySetById(scope.row.id, 1)" />
          <el-button v-if="scope.row.status === 1" type="info" size="mini" icon="el-icon-remove" @click="lockOrUnlockCompanySetById(scope.row.id, 0)" />
          <router-link :to="'/companySet/edit/' + scope.row.id" style="padding-left: 10px;">
            <el-button type="primary" size="mini" icon="el-icon-edit-outline" />
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
import companySet from '@/api/companySet'

export default {
  data() {
    return {
      current: 0,
      limit: 3,
      total: 0,
      searchObj: {},
      list: [],
      batchDeleteSelectionList: []
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
        })
        .catch(error => {
          console.log(error)
        })
    },
    removeCompanySetById(id) {
      this.$confirm('You will permanently delete this company information', 'Delete inform', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        companySet.deleteCompanySetById(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: 'Successfully deleted'
            })
            this.getList(1)
          })
          .catch(error => {
            console.log(error)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete cancelled'
        })
      })
    },
    removeRows() {
      this.$confirm('You will permanently delete selected company information', 'Batch delete inform', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        var idList = []
        for (var i = 0; i < this.batchDeleteSelectionList.length; i++) {
          var id = this.batchDeleteSelectionList[i].id
          idList[i] = id
        }
        companySet.deleteBatchCompanySetById(idList)
          .then(response => {
            this.$message({
              type: 'success',
              message: 'Successfully deleted'
            })
            this.getList(1)
          })
          .catch(error => {
            console.log(error)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete cancelled'
        })
      })
    },
    selectionChange(selection) {
      this.batchDeleteSelectionList = selection
    },
    lockOrUnlockCompanySetById(id, status) {
      companySet.lockOrUnlockCompanySetById(id, status)
        .then(response => {
          this.$message({
            type: 'success',
            message: 'Company status updated'
          })
          this.getList()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
