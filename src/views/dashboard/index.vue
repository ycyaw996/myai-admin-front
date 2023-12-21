<template>
  <div class="dashboard-container">
    <center><h1>MYAI 状态概览</h1></center>
    <div class="card1">
      <div class="dashboard-row">
        <div class="dashboard-text">
          蟑螂站点：myai.lllinux.cn
        </div>
        <div class="dashboard-text">
          站点IP：1.1.1.1
        </div>
      </div>

      <div class="dashboard-row">
        <div class="dashboard-text">
          用户数量：4
        </div>
        <div class="dashboard-text">
          站点存活：是
        </div>
      </div>

      <div class="dashboard-row">
        <div class="dashboard-text">
          用户名称：{{ userInfo && userInfo.username }}
        </div>
        <div class="dashboard-text">
          用户属性：
          <span v-if="userInfo && userInfo.role === 1">超级管理员</span>
          <span v-else-if="userInfo && userInfo.role === 2">普通使用者</span>
        </div>
      </div>

      <div class="dashboard-row">
        <div class="dashboard-text">
          AI 属性：
          <span v-if="gptData && gptData.isPlus">Plus账户</span>
          <span v-else="gptData.isPlus">普通用户</span>
        </div>
        <div class="dashboard-text">
          AI 状态：
          <span v-if="gptData && gptData.accountReady">正常</span>
          <span v-else="gptData.accountReady">封禁</span>
        </div>
      </div>

      <div class="dashboard-row" style="justify-content: space-between;">
        <div class="dashboard-text" style="flex: 1;">
          3小时对话次数：{{ gptData && gptData.count }}次
        </div>
        <div class="dashboard-text" style="flex: 1;">
          剩余次数：{{ 40 - (gptData ? gptData.count : 0) }}次
        </div>
        <div class="dashboard-text" style="flex: 1;">
          重置次数倒计时：{{ gptData && gptData.clears_in }}秒
        </div>
      </div>
    </div>
    <!-- <div class="card2">
      <ul>
        <li>1</li>
      </ul>
    </div> -->
  </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { gptstatus } from '@/api/gpt'
import { getInfo }  from '@/api/user';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'token',
    ])
  },
  data() {
    return {
      gptData: null,
      userInfo: null,
    };
  },
  created() {
    this.fetchGPTStatus();
    this.fetchUserInfo();
  },
  
  methods: {
    fetchGPTStatus() {
      gptstatus().then(response => {
        this.gptData = response;
      }).catch(error => {
        console.error('Error fetching GPT status:', error);
      });
    },
    fetchUserInfo() {
      getInfo(this.token).then(response => {
        this.userInfo = response.data;
      }).catch(error => {
        console.error('Error fetching user info:', error);
      });
    },
  }
}

</script>

<style lang="scss" scoped>
// .dashboard-container {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   padding: 20px;
//   box-sizing: border-box;
//   background-color: #f5f5f5;
//   min-height: 100vh;
// }

.card1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 660px;
    margin: 30px auto;
  }
.dashboard {
  &-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-text {
    background-color: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    flex: 1; // 每个文本框占据等量的空间

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>

