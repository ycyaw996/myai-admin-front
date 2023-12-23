<template>
  <div class="cont">
    <el-row :gutter="20" style="height: 50%;">
      <el-col :span="13">
        <div class="grid-content dashboard">
          <div>
            <h4>CPU</h4>
            <el-progress type="circle" :percentage="0" width="178" stroke-width="10"></el-progress>
          </div>
          <div>
            <h4>内存</h4>
            <el-progress type="circle" :percentage="25" width="178" stroke-width="10"></el-progress>
          </div>
          <div>
            <h4>磁盘</h4>
            <el-progress
              type="circle"
              :percentage="100"
              status="success"
              width="178"
              stroke-width="10"
            ></el-progress>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="network">
          <h4>上传</h4>
          <el-progress :percentage="100" status="success" stroke-width="10"></el-progress>
          <h4>下载</h4>
          <el-progress :percentage="100" status="warning" stroke-width="10"></el-progress>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="block">
            <el-image src="https://img.ycyaw.com/free/2023/12/23/6586c1d45aec7.png"></el-image>
          </div>
          <el-descriptions
            class="margin-top"
            :column="2"
            size="medium"
            border
          >
            <template slot="extra"> </template>
            <el-descriptions-item>
              <template slot="label">
                用户名称
              </template>
              {{ userInfo && userInfo.username }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                用户属性
              </template>
              <span v-if="userInfo && userInfo.role === 1">超级管理员</span>
              <span v-else-if="userInfo && userInfo.role === 2">普通使用者</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                AI 属性
              </template>
              <div v-if="gptData && gptData.isPlus">
              <el-tag
                type="warning"
                effect="dark">
                Plus账号
              </el-tag>
            </div>
            <span v-else="gptData.isPlus">普通用户</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                AI 状态
              </template>
              <div v-if="gptData && gptData.accountReady">
              <el-tag
                type=success
                effect="dark">
                正常运行
              </el-tag>
            </div>
            <span v-else="gptData.accountReady">封禁</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                3h对话次数
              </template>
              {{ gptData && gptData.count }}次
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                3h剩余次数
              </template>
              {{ 40 - (gptData ? gptData.count : 0) }}次
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <el-card shadow="hover" style="width: 100%;">
          <div style="width: 100%; display: inline-block; ">
            <el-statistic :value="deadline2" time-indices title="GPT4对话重置倒计数">
            </el-statistic>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="height: 50%">
      <el-col :span="16">
        <div class="grid-content">
          公告：
          <el-timeline>
            <el-timeline-item
              timestamp="2021-05-01"
              placement="top"
              type="primary"
            >
              <el-card>
                <h4>公告标题</h4>
                <p style="font-size: 14px;line-height: 40px;letter-spacing: 1px;">
ChatGPT 是 OpenAI 开发的一款先进的大型语言模型。它能够通过文本交互的方式回答问题、提供信息、辅助编程、创作文本和艺术作品、进行语言翻译等多种任务。ChatGPT 能处理多样的文本输入，包括日常对话、教育咨询、技术支持和创意写作。
作为人工智能，ChatGPT 不具备个人情感或自我意识，而是基于大量数据和机器学习技术来生成回应。它的主要目标是提供准确、有用和有趣的信息，同时确保其回应符合道德和使用指导原则。ChatGPT 持续通过学习和更新来提升其服务质量和用户体验。
</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>

      <el-col :span="8" class="erweima">
        <div>
          <el-image
            style="width: 200px; height: 200px"
            :src="url"
            :preview-src-list="srcList"
          >
          </el-image>
          <center><h4>群聊</h4></center>
        </div>
        <div>
          <el-image
            style="width: 200px; height: 200px"
            :src="url"
            :preview-src-list="srcList"
          >
          </el-image>
          <center><h4>客服</h4></center>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { gptstatus } from "@/api/gpt";
import { getInfo } from "@/api/user";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["token"]),
  },
  data() {
    return {
      items: [
        { type: "success", label: "正常" },
        { type: "warning", label: "PLUS" },
      ],
      url: "https://img.ycyaw.com/free/2023/12/23/65866eaf23792.png",
      srcList: ["https://img.ycyaw.com/free/2023/12/23/65866eaf23792.png"],
      value: new Date(),
      deadline2: Date.now() + 1000 * 60 * 60 * 8,
      gptData: null,
      userInfo: null,
    };
  },
  created() {
    this.fetchGPTStatus();
    this.fetchUserInfo();
  },

  methods: {
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
    fetchGPTStatus() {
      gptstatus()
        .then((response) => {
          this.gptData = response;
        })
        .catch((error) => {
          console.error("Error fetching GPT status:", error);
        });
    },
    fetchUserInfo() {
      getInfo(this.token)
        .then((response) => {
          this.userInfo = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    },
    hilarity() {
      this.$notify({
        title: "提示",
        message: "时间已到",
        duration: 0,
      });
    },
    clickFn() {
      this.$refs.statistic.suspend(this.stop);
      this.stop = !this.stop;
    },
    add() {
      this.deadline3 = this.deadline3 + 1000 * 10;
    },
  },
};
</script>

<style>
.erweima {
  padding-top: 60px;
  display: flex;
  justify-content: space-around;
}
.dashboard {
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 80px;
}
.network {
  padding-top: 120px;
}
.cont {
  width: 100%;
  height: 90vh;
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
  margin-right: 30px;
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
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
.rili {
}
</style>
