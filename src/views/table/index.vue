<template>
  <div class="user-token-management">
    <center><h1>AI用户Token管理中心</h1></center>
    <div class="addbut">
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </div>
    <el-table :data="userList" stripe border style="width: 100%">
      <el-table-column prop="usertoken" label="用户Token"></el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAIConfig } from '@/api/user'

export default {
  data() {
    return {
      userList: []
    }
  },
  created() {
    this.fetchUserList();
  },
  methods: {
    fetchUserList() {
      getAIConfig().then(response => {
        this.userList = response.usertokens.map(token => ({ usertoken: token }));
      }).catch(error => {
        console.error('Error fetching user list:', error);
      });
    },
    handleAdd() {
      console.log('Add user');
      // 实现添加用户的逻辑
    },
    handleEdit(row) {
      console.log('Edit user', row);
      // 实现编辑用户的逻辑
    },
    handleDelete(row) {
      console.log('Delete user', row);
      // 实现删除用户的逻辑
    }
  }
}
</script>

<style scoped>
.addbut {
  padding-right: 80px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row-reverse
}
</style>