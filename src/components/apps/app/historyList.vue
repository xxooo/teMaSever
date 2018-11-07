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

    <el-table :data="ziHis" v-if="hisType=='1'">
        <el-table-column prop="createDate" label="创建时间">
        </el-table-column>
        <el-table-column prop="maimaName" label="选码">
        </el-table-column>
        <el-table-column prop="money" label="金额">
        </el-table-column>
        <el-table-column prop="username" label="代理人">
        </el-table-column>
    </el-table>

    <el-table :data="zongheHis" v-if="hisType=='2'">
        <el-table-column prop="createDate" label="创建时间">
        </el-table-column>
        <el-table-column label="详情">
          <template slot-scope="scope">
            <template>
              <el-button size="mini" class="optionBtn" @click="lookInfo(scope.row)">查看</el-button>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="代理人">
        </el-table-column>
    </el-table>

    <el-table :data="chimaHis" v-if="hisType=='3'">
        <el-table-column prop="createDate" label="创建时间">
        </el-table-column>
        <el-table-column label="详情">
          <template slot-scope="scope">
            <template>
              <el-button size="mini" class="optionBtn" @click="lookInfo(scope.row)">查看</el-button>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="代理人">
        </el-table-column>
    </el-table>


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
        hisType: '',
        userList: [],
        ziHis: [],
        zongheHis: [],
        chimaHis: []
      }
  },
  async created() {
    this.getUserList();
  },
  computed: {
    // ...mapGetters({
    //     userList: 'getuserList'
    // }),
  },
  beforeDestroy() {
  },
  methods: {
    async lookInfo(row) {

      let res = await this.$get(`${window.url}/api/orderInfo?userId=`+row.userId+`&createDate=`+row.createDate+`&type=`+this.hisType);

     // /api/orderInfo?userId=1&createDate=2018-10-30 20:20:53&type=2

      if(res.code == 0){
      }
    },
    async getHistory() {

      console.log('this.timeRange',this.timeRange);

      let res = await this.$get(`${window.url}/api/orderList?userId=`+this.userId+`&dateStart=`+this.timeRange[0]+`&dateEnd=`+this.timeRange[1]+`&type=`+this.hisType+`&page=1&limit=10000`);

      if(res.code == 0){

        if(this.hisType == '1') {
          this.ziHis = res.data.list;
        } else  if(this.hisType == '2') {
          this.zongheHis = res.data.list;
        } else if(this.hisType == '3') {
          this.chimaHis = res.data.list;
        }



//         createDate: "2018-10-30 20:24:20"
// id: null
// maimaName: "01马"
// money: 500
// periodsNum: null
// remark: null
// updateDate: null
// userId: null
// username: "123456"


// "data": {
//         "totalCount": 2,
//         "pageSize": 5,
//         "totalPage": 1,
//         "currPage": 1,
//         "list": [
//             {
//                 "id": null,
//                 "maimaName": null,
//                 "money": null,
//                 "userId": null,
//                 "remark": null,
//                 "periodsNum": null,
//                 "createDate": "2018-10-30 20:20:53",//创建时间
//                 "updateDate": null,
//                 "moneySum": 400,//金额
//                 "username": "admin"//代理人名称
//             },




//             "data": {
//         "totalCount": 2,
//         "pageSize": 5,
//         "totalPage": 1,
//         "currPage": 1,
//         "list": [
//             {
//                 "id": null,
//                 "maimaName": null,
//                 "money": null,
//                 "risk": null,
//                 "userId": null,
//                 "periodsNum": null,
//                 "createDate": "2018-10-30 20:20:53",//创建时间
//                 "updateDate": null,
//                 "moneySum": 400,//金额
//                 "username": "admin"//代理人名称
//             },


 // "list": [
 //            {
 //                "id": null,
 //                "maimaName": null,
 //                "money": null,
 //                "risk": null,
 //                "userId": null,
 //                "periodsNum": null,
 //                "createDate": "2018-10-30 20:20:53",//创建时间
 //                "updateDate": null,
 //                "moneySum": 400,//金额
 //                "username": "admin"//代理人名称




      }

    },
    async getUserList() {
      let res = await this.$get(`${window.url}/api/allUserList?page=0&limit=10000`);

      if(res.code===0){

        this.userList = res.page.list;

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