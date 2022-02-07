<template>
  <div class="app-container">
    <div style="padding-bottom: 20px">
      <el-radio-group v-model="size">
        <el-radio label="">Default</el-radio>
        <el-radio label="medium">Medium</el-radio>
        <el-radio label="small">Small</el-radio>
        <el-radio label="mini">Mini</el-radio>
      </el-radio-group>
    </div>
    <el-descriptions class="margin-top" :column="1" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          <!-- <i class="el-icon-mobile-phone" /> -->
          Company name
        </template>
        {{ companyDetail.companyName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <!-- <i class="el-icon-mobile-phone" /> -->
          Company code
        </template>
        {{ companyDetail.companyCode }}
      </el-descriptions-item>
      <el-descriptions-item align="center">
        <template slot="label">
          <!-- <i class="el-icon-mobile-phone" /> -->
          Company LOGO
        </template>
        <img :src="companyDetail.logoData" width="80">
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <!-- <i class="el-icon-mobile-phone" /> -->
          Company type
        </template>
        {{ companyDetail.param.companyType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <!-- <i class="el-icon-mobile-phone" /> -->
          City
        </template>
        {{ companyDetail.param.city }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <!-- <i class="el-icon-mobile-phone" /> -->
          Country
        </template>
        {{ companyDetail.param.country }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <!-- <i class="el-icon-mobile-phone" /> -->
          Company name
        </template>
        {{ companyDetail.companyName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <!-- <i class="el-icon-mobile-phone" /> -->
          Address
        </template>
        {{ companyDetail.address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <!-- <i class="el-icon-mobile-phone" /> -->
          Company description
        </template>
        {{ companyDetail.intro }}
      </el-descriptions-item>
    </el-descriptions>
    <div style="padding-top: 20px">
      <router-link :to="'/company/list'">
        <el-button type="primary" icon="el-icon-back" />
      </router-link>
    </div>
  </div>
</template>

<script>
import company from '@/api/company'

export default {
  data() {
    return {
      size: '',
      companyId: 0,
      companyDetail: []
    }
  },
  created() {
    this.companyId = this.$route.params.id
    this.showCompanyDetail()
  },
  methods: {
    showCompanyDetail() {
      company.getCompanyDetail(this.companyId)
        .then(respone => {
          this.companyDetail = respone.data.company
          console.log(this.companyDetail.param)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
