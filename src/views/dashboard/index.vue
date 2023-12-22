<template>
  <!-- <div class="dashboard-container">
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
  </div> -->
<div class="cont">
  <el-row :gutter="20">
  <el-col :span="13">
    <div class="grid-content dashboard">
      <div>
        <h4>CPU</h4>
        <el-progress type="circle" :percentage="0"></el-progress>
      </div>
      <div>
        <h4>内存</h4>
        <el-progress type="circle" :percentage="25"></el-progress>
      </div>
      <div>
        <h4>磁盘</h4>
        <el-progress type="circle" :percentage="100" status="success"></el-progress>
      </div>
    </div>
  </el-col>
  <el-col :span="3">
    <div class="network">
        <h4>上传</h4>
        <el-progress :percentage="100" status="success"></el-progress>
        <h4>下载</h4>
        <el-progress :percentage="100" status="warning"></el-progress>
      </div>
  </el-col>
  <el-col :span="8">
    <div class="grid-content">
      <el-card class="box-card">
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
    </el-card>

    </div>
  </el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8">
    <div class="grid-content">
      <!-- <el-calendar v-model="value">
      </el-calendar> -->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-col>
</el-row>
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
          value: new Date,
          activities: [{
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }, {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46'
        }],
        gptData: null,
        userInfo: null,
        }
      },
  created() {
    this.fetchGPTStatus();
    this.fetchUserInfo();
  },
  
  methods: {
    format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      },
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

<style>
  .dashboard {
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding-top: 20px;
  }
  .network {
    padding-top: 40px;
  }
  .cont {
    width: 100%;
    height: 100%;
    margin-left: 20px;
    margin-right: 20px;
  }
  .el-row {
    /* display: flex;
    align-items: center; */
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    padding-top: 20px;
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 580px;
  }
</style>

