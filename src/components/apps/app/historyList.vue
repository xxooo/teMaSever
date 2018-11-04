<template>
  <div id="historyList">
    <el-row :gutter="20">
      <el-col :span="24"><span>时间范围:</span></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          size="mini"
          v-model="timeRange"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:01', '23:59:59']">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><span>选择用户:</span></el-col>
      <el-col :span="18">
        <el-select v-model="userId" placeholder="请选择查询用户" size="mini">
          <el-option v-for="item in userList" :label="item.username" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><span>历史类型:</span></el-col>
      <el-col :span="18">
        <el-select v-model="hisType" placeholder="请选择类型" size="mini">
          <el-option label="子订单" value="1"></el-option>
          <el-option label="统计订单" value="2"></el-option>
          <el-option label="吃码订单" value="3"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-button @click="getHistory()" size="mini">查询</el-button>
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
    async getHistory() {

      console.log('this.timeRange',this.timeRange);

      //  api/orderList?userId=1&dateStart=2018-10-29 19:36:47&dateEnd=2018-10-30 20:25:19&type=1&page=1&limit=5

      let res = await this.$get(`${window.url}/api/orderList?userId=`+this.userId+`&dateStart=`+this.timeRange[0]+`&dateEnd=`+this.timeRange[0]+`&type=`+this.hisType+`page=1&limit=10000`);

      if(res.code===0){


      }

    }
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