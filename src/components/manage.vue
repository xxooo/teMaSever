<template>
  <div>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title">用户管理</template>
            <el-menu-item index="1-1" @click="$router.push({name: 'userList'})">用户列表</el-menu-item>
            <el-menu-item index="1-2" @click="$router.push({name: 'userCreate'})">注册用户</el-menu-item>
            <el-menu-item index="1-3" @click="$router.push({name: 'importExport'})">导出导入</el-menu-item>
          </el-submenu>
          <el-menu-item index="2" @click="$router.push({name: 'historyList'})">历史记录</el-menu-item>
          <!-- <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      activeIndex: '1'
    }
  },
  async created() {

  },
  computed: {
  },
  beforeDestroy() {
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  },
  mounted() {

  },
  updated() {
  }
};


</script>
<style scoped>
</style>
<style lang="less">

</style>