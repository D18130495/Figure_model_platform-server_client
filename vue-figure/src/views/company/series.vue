<template>
  <div class="app-container">
    <div style="margin-bottom: 10px; font-size: 10px;">Choose:
      {{ seriesName }} / {{ orderDate }}
    </div>
    <el-container style="height: 100%">
      <el-aside width="200px" style="border: 1px silver solid">
        <el-tree
          :data="data"
          :props="defaultProps"
          :default-expand-all="true"
          @node-click="handleNodeClick"
        />
      </el-aside>
      <el-main style="padding: 0 0 0 20px;">
        <el-row style="width: 100%;">
          <el-tag v-for="(item,index) in orderScheduleList" :key="item.id" :type="index == activeIndex? '' : 'info'" style="height: 60px; margin-right: 10px" @click="selectDate(item.orderDate, index)">
            {{ item.orderDate }} / {{ item.dayOfWeek }}<br>
            {{ item.reservedNumber }} / {{ item.availableNumber }}
          </el-tag>
          <el-pagination
            :current-page="current"
            :total="total"
            :page-size="limit"
            class="pagination"
            layout="prev, pager, next"
            @current-change="getPage"
          />
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-table :data="scheduleList" style="width: 100%" border highlight-current-row>
            <el-table-column label="Index" width="60" align="center" border fit highlight-current-row>
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="figureName" label="Figure Name" width="350" align="center" />
            <el-table-column prop="orderDate" label="Order Date" width="200" align="center" />
            <el-table-column prop="reservedNumber" label="Reserved Number" width="155" align="center" />
            <el-table-column prop="availableNumber" label="Available Number" width="155" align="center" />
            <el-table-column prop="preorderFee" label="Pro-order Fee" width="155" align="center" />
            <el-table-column prop="preorderFee" label="Total Fee" align="center" />
          </el-table>
        </el-row>
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
      companyCode: '',
      seriesName: '',
      seriesCode: '',
      activeIndex: 0,
      orderDate: '',
      orderScheduleList: [],
      current: 1,
      limit: 2,
      total: 0,
      scheduleList: []
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
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleNodeClick(data) {
      if (data.children != null) return
      this.seriesName = data.seriesName
      this.seriesCode = data.seriesCode
      this.orderDate = ''
      this.getPage(1)
    },
    getPage(current) {
      this.activeIndex = 0
      this.current = current
      this.getSchedule()
    },
    getSchedule() {
      company.getSchedule(this.current - 1, this.limit, this.companyCode, this.seriesCode)
        .then(response => {
          this.orderScheduleList = response.data.bookingScheduleRule
          this.total = response.data.total
          if (this.orderDate === '') {
            this.orderDate = this.orderScheduleList[0].orderDate
            this.getScheduleDetail()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    selectDate(orderDate, index) {
      this.orderDate = orderDate
      this.activeIndex = index
      this.getScheduleDetail()
    },
    getScheduleDetail() {
      company.getScheduleDetail(this.companyCode, this.seriesCode, this.orderDate)
        .then(response => {
          this.scheduleList = response.data
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
