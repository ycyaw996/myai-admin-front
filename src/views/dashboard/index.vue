<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      用户属性：
      <span v-if="role === 1">超级管理员</span>
      <span v-else-if="role === 2">普通使用者</span>
    </div>
    <div class="dashboard-text">
      账户属性：
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { gptstatus } from '@/api/gpt'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'role',
    ])
  },
  data() {
    return {
      gptData: null,
    };
  },
  created() {
    this.fetchGPTStatus();
  },
  
  methods: {
    fetchGPTStatus() {
      gptstatus().then(response => {
        this.gptData = response;
        console.log(this.gptData);
      }).catch(error => {
        console.error('Error fetching GPT status:', error);
      });
    }
  }
}

</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
