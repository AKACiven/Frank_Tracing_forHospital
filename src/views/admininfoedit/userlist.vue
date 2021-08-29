<template>
  <div class="app-container">
    <el-backtop></el-backtop>
    <el-table
      v-loading="listLoading"
      :data="list.filter(data => !search || data.patient.toLowerCase().includes(search.toLowerCase())
      || data.doctor.toLowerCase().includes(search.toLowerCase()))"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :default-sort = "{prop: 'datetime', order: 'descending'}"
    >
      <el-table-column label="用户" width="110" prop="username" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="datetime" sortable label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.datetime }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" prop="role" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.role | roleFilter">{{ scope.row.role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110" prop="gender" align="center">
        <template slot-scope="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="150">
        <template slot="header" slot-scope="scope" >
          <el-input
            v-model="search"
            size="mini"
            placeholder="搜索用户"/>
        </template>
        <template slot-scope="scope">
          <el-button @click="edituser(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteuser(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { getUserlist } from '@/api/user'

export default {
  filters: {
    roleFilter(role) {
      const statusMap = {
        'doctor': 'success',
        'patient': 'gray',
        'admin': 'danger'
      }
      return statusMap[role]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      search: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getUserlist().then(response => {
        this.list = response.data.form
        this.listLoading = false
      })
    },
    deleteuser(row) {
      recordel(row.username).then(() => {
        this.$alert('删除成功!', '警告', {
          confirmButtonText: '确认',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    edituser(row) {
      this.$router.push({
        path: '/Adminedit/Index',
        query: {
          username: row.username
        }
      })
    }
  }
}
</script>
