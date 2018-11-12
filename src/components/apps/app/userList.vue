<template>
  <div id="userList">
      <el-row :gutter="20">
        <el-col :span="4"><span>搜索:</span></el-col>
        <el-col :span="20">
          <el-input placeholder="请输入内容" size="mini" v-model.trim="searchMenuRole" clearable></el-input>
        </el-col>
      </el-row>
      <el-table :data="filterList"  style="width: 100%">
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
        fenValue: '',
        searchMenuRole: ''
      }
  },
  async created() {

    this.getUserList();

  },
  computed: {
    filterList() {
        let that = this;
        let objList = [];
        objList = that.userList.filter(function(item) {
          return item.username && item.username.toLocaleLowerCase().indexOf(that.searchMenuRole.toLocaleLowerCase()) !== -1
        });
        return objList;
      }
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

        store.commit('updateuserList',res.page.list);

        for(let n in this.userList) {
          this.userList[n].fenValue = '';
        }

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