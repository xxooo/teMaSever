<template>
  <div id="historyList">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button size="mini">导出用户</el-button>
      </el-col>
      <el-col :span="12">
        <el-button size="mini">导入用户</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  components: {
  },
  data() {
      return {
        timeRange: '',
        userId: '',
        hisType: ''
      }
  },
  async created() {

  },
  computed: {
    ...mapGetters({
        userList: 'getuserList'
    }),
  },
  beforeDestroy() {
  },
  methods: {
  },
  mounted() {

  },
  updated() {
  }
};


</script>
<style scoped>

/*.optionBtn {
  width: 30%;
}*/
</style>
<style lang="less">
#historyList {
  .el-row {
    margin-bottom: 10px;
  }
}

</style>