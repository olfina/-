<template>
  <div class="home">
    <headContent></headContent>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script>
// import head_content from '@/components/home/homecontentCom.vue'
import headContent from '../components/home/homecontentCom.vue'
export default {
  components: {
    headContent
  }
}
</script>

<style lang="scss" scoped>

</style>