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
        <el-radio-group v-model="ruleForm.ruleId" size="mini" :disabled="!isNew">
          <el-radio label="2">代理人</el-radio>
          <el-radio label="3">子帐号</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="ruleForm.ruleId == 3" label="代理列表" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择绑定代理" size="mini" :disabled="!isNew">
          <el-option v-for="item in dailirenList" :label="item.username" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="冻结状态">
        <el-switch v-model="ifFrozen"></el-switch>
      </el-form-item>

      <el-form-item label="积分" prop="integral">
        <el-input v-model="ruleForm.integral" size="mini" :disabled="!isNew"></el-input>
      </el-form-item>
      <el-form-item label="吃码倍数" prop="consumeMultiple">
        <el-input v-model="ruleForm.consumeMultiple" size="mini"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button v-if="isNew" type="primary" @click="createForm('ruleForm')" size="mini">创建</el-button>
        <el-button v-if="!isNew" type="primary" @click="editeForm('ruleForm')" size="mini">保存</el-button>
        <el-button v-if="isNew" @click="$router.push({name: 'userList'})" size="mini">取消</el-button>
        <el-button v-if="!isNew" @click="$router.push({name: 'userList'})" size="mini">返回</el-button>
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
        ifFrozen: true,
        isNew: this.$route.name == 'userCreate' ? true : false,
        ruleForm: {
          username: '',
          password: '',
          realname: '',
          tel: '',
          ruleId: '2',
          pid: '1',
          integral: '',
          frozenStatus: '1',
          consumeMultiple: ''
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
            { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
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

    if(!this.isNew) {
      this.userInfoto();
    }
  },
  computed: {
    ...mapGetters({
        userInfo: 'getuserInfo'
    })
  },
  methods: {
    editeForm(formName) {

      let obj = {
        id: this.userInfo.id,
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        tel: this.ruleForm.tel,
        realname: this.ruleForm.realname,
        consumeMultiple: this.ruleForm.consumeMultiple,
        frozenStatus: this.ifFrozen ? '1' : '2'
      }

      this.$refs[formName].validate(async(valid) =>  {
          if (valid) {

            let ret = await this.$post(`${window.url}/api/update`, obj);

            if(ret.code == '0') {
                  router.push({ name: 'userList'});

            } else {
                  //this.$error(ret.msg);
            }

          } else {
              console.log('error submit!!');
              return false;

            }

        });
    },
    createForm(formName) {
      this.$refs[formName].validate(async(valid) =>  {
          if (valid) {

            let ret = await this.$post(`${window.url}/api/register`, this.ruleForm);

            if(ret.code == '0') {
                  router.push({ name: 'userList'});

            } else {
                  //this.$error(ret.msg);
            }

          } else {
              console.log('error submit!!');
              return false;

            }

        });
    },
    userInfoto() {

      this.ruleForm.username = this.userInfo.username;
      this.ruleForm.password = this.userInfo.password;
      this.ruleForm.realname = this.userInfo.realname;
      this.ruleForm.tel = this.userInfo.tel;
      this.ruleForm.ruleId = this.userInfo.ruleId+'';
      this.ruleForm.pid = this.userInfo.pid+'';
      this.ruleForm.integral = this.userInfo.integral;
      this.ruleForm.consumeMultiple = this.userInfo.consumeMultiple;

      this.ifFrozen = this.userInfo.frozenStatus == '1' ? true : false;

      console.log('this.ruleForm',this.ruleForm);

    },
    // resetForm(formName) {
    //     this.$refs[formName].resetFields();
    // },
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
    margin-bottom: 16px;
  }
  .el-form-item__content {
    margin-left: 80px !important;
  }

  .el-form-item__label {
    width: 80px !important;
  }
}
</style>