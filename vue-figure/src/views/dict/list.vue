<template>
  <div class="app-container">
    <el-button type="primary" @click="exportData">Data export</el-button>
    <el-table
      :data="dictList"
      :load="getChildrens"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      row-key="id"
      border
      lazy
      style="margin-top: 20px;"
    >
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="value" label="Value" />
      <el-table-column prop="dictCode" label="Desc" />
      <el-table-column prop="createTime" label="Create time" />
    </el-table>
  </div>
</template>

<script>
import dict from '@/api/dict'

export default {
  data() {
    return {
      dictList: []
    }
  },
  created() {
    this.getDictList(1)
  },
  methods: {
    // get dict data list
    getDictList(id) {
      dict.getDictList(id)
        .then(response => {
          this.dictList = response.data
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // get the children dict data list if has children
    getChildrens(tree, treeNode, reslove) {
      dict.getDictList(tree.id)
        .then(response => {
          reslove(response.data)
        })
    },
    // export the dict data
    exportData() {
      window.location.href = 'http://localhost:8022/admin/cmn/dict/exportData'
    }
  }
}
</script>
