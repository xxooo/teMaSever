<template>
  <div id="userInfo">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="帐号" prop="username">
        <el-input v-model="ruleForm.username" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="realname">
        <el-input v-model="ruleForm.realname" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="tel">
        <el-input v-model="ruleForm.tel" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="ruleId">
        <el-radio-group v-model="ruleForm.ruleId" size="mini">
          <el-radio label="2">代理人</el-radio>
          <el-radio label="3">子帐号</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="ruleForm.ruleId == 3" label="代理列表" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择绑定代理" size="mini">
          <el-option v-for="item in dailirenList" :label="item.username" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="积分" prop="integral">
        <el-input v-model="ruleForm.integral" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="吃码倍数" prop="consumeMultiple">
        <el-input v-model="ruleForm.consumeMultiple" size="mini"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button v-if="isNew" type="primary" @click="createForm('ruleForm')" size="mini">创建</el-button>
        <el-button v-if="!isNew" type="primary" @click="editeForm('ruleForm')" size="mini">保存</el-button>
        <el-button v-if="isNew" @click="resetForm('ruleForm')" size="mini">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  components: {
  },
  data() {
      return {
        isNew: this.$route.name == 'userCreate' ? true : false,
        ruleForm: {
          username: '',
          password: '',
          realname: '',
          tel: '',
          ruleId: '',
          pid: '',
          integral: '',
          consumeMultiple: '',
          
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入帐号', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          realname: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '请输入电话', trigger: 'blur' },
            { min: 8, max: 11, message: '长度在 8 到 11 个字符', trigger: 'blur' }
          ],
          ruleId: [
            { required: true, message: '请选择角色', trigger: 'blur' }
          ],
          pid: [
            { required: true, message: '请选择绑定代理', trigger: 'blur' }
          ]
        },
        dailirenList: []
      }
  },
  async created() {
    this.getDailiren();
    console.log('userInfo',this.userInfo);
  },
  computed: {
    ...mapGetters({
        userInfo: 'getuserInfo'
    }),
  },
  methods: {
    setRule(){
      console.log('this.ruleForm.ruleId',this.ruleForm.ruleId);
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    async getDailiren() {
      let res = await this.$get(`${window.url}/api/userList`);

      if(res.code===0){

        this.dailirenList = res.data;

      }
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
  },
  beforeDestroy() {
  }
};


</script>
<style scoped>
</style>
<style lang="less">
#userInfo {
  .el-form-item {
    margin-bottom: 6px;
  }
  .el-form-item__content {
    margin-left: 80px !important;
  }

  .el-form-item__label {
    width: 80px !important;
  }
}
</style>