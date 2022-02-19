<template>
  <div class="app-container">
    <!-- search table-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.keyword" placeholder="Name" />
      </el-form-item>

      <el-form-item label="Create time" style="padding-left: 50px">
        <el-date-picker
          v-model="searchObj.createTimeBegin"
          type="datetime"
          placeholder="Start time"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      -
      <el-form-item style="padding-left: 10px">
        <el-date-picker
          v-model="searchObj.createTimeEnd"
          type="datetime"
          placeholder="End time"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getUserList()">Search</el-button>
      <el-button type="default" @click="resetData()">Clean</el-button>
    </el-form>

    <!-- User List -->
    <el-table border v-loading="listLoading" :data="list" stripe style="width: 100%">
      <el-table-column label="Index" width="70" align="center">
        <template slot-scope="scope">
          {{ (current - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="phone" label="Phone" />
      <el-table-column prop="name" label="Name" />
      <el-table-column label="status">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? 'Able' : 'Disable' }}
        </template>
      </el-table-column>
      <el-table-column prop="param.authStatus" label="Auth status" />
      <el-table-column prop="createTime" label="Create time" />

      <el-table-column label="Operation" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/user/userInfo/show/' + scope.row.id" style="padding-right: 10px">
            <el-button type="primary" size="mini">Detail</el-button>
          </router-link>

          <el-button
            v-if="scope.row.status == 1"
            type="primary"
            size="mini"
            @click="lock(scope.row.id, 0)">
            Lock
            </el-button>

          <el-button
            v-if="scope.row.status == 0"
            type="danger"
            size="mini"
            @click="lock(scope.row.id, 1)">
            Unlock
            </el-button>
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
      @current-change="getUserList"
    />
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";

export default {
  data() {
    return {
      listLoading: true,
      list: null,
      total: 0,
      current: 1,
      limit: 3,
      searchObj: {}
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList(page = 1) {
      this.current = page
      userInfoApi.getUserList(this.current, this.limit, this.searchObj)
        .then(response => {
          this.list = response.data.records
          console.log(this.list)
          this.total = response.data.total
          this.listLoading = false
        })
    },
    resetData() {
      this.searchObj = {}
      this.getUserList()
    }
  }
}
</script>
