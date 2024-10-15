<template>
  <div class="main">
    <!-- 公共头部导航栏 -->
    <headCom :listss="listss" :history-lists="historyLists"></headCom>
    <!-- 视图 -->
    <router-view @collectdata="collectdata"></router-view>
    <!-- 公共底部 -->
    <foot></foot>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'

import headCom from './components/common/headCom.vue';
import foot from './components/common/footCom.vue'
export default {
  components: {
    headCom,
    foot
  },
  setup() {
    const state = reactive({
      // 存储到localStorage的数据
      collectLists: [],
      historyLists: [],//历史记录
      listss: [],
    })
    const collectdata = (lists) => {

      state.listss = [];
      lists.forEach(item => {
        state.listss.push(item[0]);
      })
    }
  
    onMounted(() => {
      // window.localStorage.setItem('collectLists', '[]');
      // window.localStorage.setItem('historyLists', '[]');
      // window.localStorage.setItem('replies', '[]');
      // window.localStorage.setItem('commentList', '[]');

    })
    return {
      ...toRefs(state),
      collectdata,
      
    }
  }

}

</script>

<style lang="scss" scoped>
@import '@/assets/css/rest.css';

.el-message {
  top: 100px;
}

.main {
  height: auto;
}
</style>