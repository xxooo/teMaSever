<template>
  <div id="userList">
      <el-table :data="userList"  style="width: 100%">
        <el-table-column prop="username" label="帐户" width="100%">
        </el-table-column>
        <!-- <el-table-column prop="realname" label="姓名">
        </el-table-column> -->
        <el-table-column prop="integral" label="积分" width="100%">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <template v-if="fenStatus">
              <el-button size="mini" class="optionBtn" @click="addFen()">充值</el-button>
              <el-button size="mini" class="optionBtn" @click="goUserInfo(scope.row)">详情</el-button>
            </template>
            <template v-else>
              <el-input v-model="scope.row.fenValue" size="mini" width="50%"></el-input>
            <el-button size="mini" @click="updateFen(scope.row)">充值</el-button>
            </template>
          </template>
        </el-table-column>
        <!-- <el-table-column label="角色">
          <template slot-scope="scope">
            <span>{{scope.row.ruleId==1?'管理员':scope.row.ruleId==2?'代理人':'子帐号'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="冻结">
          <template slot-scope="scope">
            <span>{{scope.row.frozenStatus==1?'未冻结':'已冻结'}}</span>
          </template>
        </el-table-column> -->
      </el-table>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
      return {
        userList: [],
        fenStatus: true,
        optionFen: '',
        fenValue: ''
      }
  },
  async created() {

    this.getUserList();

  },
  computed: {
  },
  beforeDestroy() {
  },
  methods: {
    goUserInfo(item) {

      store.commit('updateuserInfo',item);
            router.push({
              name: 'userEdit',
              params: {
                id: item.id
              }
            })

    },
    async updateFen(item) {

      let obj = {
        id: item.id,
        integral: item.fenValue
      }

      let res = await this.$post(`${window.url}/api/recharge`, obj);
              if(res.code === 0) {
                //this.$router.push({name: 'userAgreement'});
                this.getUserList();
              }

      this.fenStatus = true;
    },
    addFen() {
      this.fenStatus = false;
    },
    async getUserList() {
      let res = await this.$get(`${window.url}/api/allUserList?page=0&limit=10000`);

      if(res.code===0){

        this.userList = res.page.list;

        for(let n in this.userList) {
          this.userList[n].fenValue = '';
        }

//         consumeMultiple: 5555
// createDate: "2018-10-29 11:38:33"
// frozenStatus: 2
// id: 4
// ids: null
// integral: 1050
// pUsername: "dailiren4"
// periodsNum: null
// pid: null
// ruleId: 2
// tel: "131111111"
// updateDate: null
// username: "dailiren1"
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
#userList {
  .el-button+.el-button {
    margin-left: 0px; 
  }

  .el-button--mini, .el-button--mini.is-round {
      padding: 7px 7px;
  }
  .el-input {
    width: 45%;
  }
  .el-input__inner {
    padding: 0 2px;
  }
}

</style>