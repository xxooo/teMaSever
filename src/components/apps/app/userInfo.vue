<template>
      <el-table :data="userList">
        <el-table-column prop="username" label="帐户">
        </el-table-column>
        <!-- <el-table-column prop="realname" label="姓名">
        </el-table-column> -->
        <el-table-column prop="integral" label="积分">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <template v-if="fenStatus">
              <el-button size="mini" @click="addFen()">充值</el-button>
              <el-button size="mini" @click="subFen()">扣分</el-button>
            </template>
            <template v-else>
              <el-input v-model="sizeForm.name"></el-input>
            <el-button size="mini" @click="updateFen(scope.row)">确认</el-button>
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
</template>

<script>

export default {
  components: {
  },
  data() {
      return {
        userList: [],
        fenStatus: true,
        optionFen: ''
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
    async updateFen(item) {


      this.fenStatus = true;
    },
    subFen() {
      this.fenStatus = false;
    },
    addFen() {
      this.fenStatus = false;
    },
    async getUserList() {
      let res = await this.$get(`${window.url}/api/allUserList?page=0&limit=10000`);

      if(res.code===0){

        this.userList = res.page.list;

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
</style>
<style lang="less">

</style>