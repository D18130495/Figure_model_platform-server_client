<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="Company name">
        <el-input v-model="companySet.compName" />
      </el-form-item>
      <el-form-item label="Company code">
        <el-input v-model="companySet.compCode" />
      </el-form-item>
      <el-form-item label="Contacts name">
        <el-input v-model="companySet.contactsName" />
      </el-form-item>
      <el-form-item label="Contacts phone">
        <el-input v-model="companySet.contactsPhone" />
      </el-form-item>
      <el-form-item label="API Url">
        <el-input v-model="companySet.apiUrl" />
      </el-form-item>
      <el-form-item label="Status">
        <el-radio-group v-model="companySet.status">
          <el-radio :label="1">Able</el-radio>
          <el-radio :label="0">Disable</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button v-if="companyId === 0" icon="el-icon-upload" type="primary" @click="saveOrUpdate">Add</el-button>
        <el-button v-if="companyId !== 0" icon="el-icon-upload" type="primary" @click="saveOrUpdate">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import companySet from '@/api/companySet'

export default {
  data() {
    return {
      companySet: {},
      companyId: 0
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.companyId = this.$route.params.id
      this.getCompanySetById()
    }
  },
  methods: {
    getCompanySetById() {
      companySet.getCompanySetById(this.companyId)
        .then(response => {
          this.companySet = response.data
        })
    },
    save() {
      companySet.saveCompanySet(this.companySet)
        .then(response => {
          this.$message({
            type: 'success',
            message: 'Successfully added'
          })
          this.$router.push({ path: '/companySet/list' })
        })
    },
    update() {
      companySet.updateCompanySetById(this.companySet)
        .then(response => {
          this.$message({
            type: 'success',
            message: 'Successfully updated'
          })
          this.$router.push({ path: '/companySet/list' })
        })
    },
    saveOrUpdate() {
      if (this.companyId !== 0) {
        this.update()
      } else {
        this.add()
      }
    }
  }
}
</script>
