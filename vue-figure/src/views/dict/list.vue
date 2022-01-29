<template>
  <div class="app-container">
    <el-table
      :data="dictList"
      :load="getChildrens"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      row-key="id"
      border
      lazy
    >
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="parentId" label="Belong" />
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
    getChildrens(tree, treeNode, reslove) {
      dict.getDictList(tree.id)
        .then(response => {
          reslove(response.data)
        })
    }
  }
}
</script>
