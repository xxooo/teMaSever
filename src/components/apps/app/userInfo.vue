<template>
  <div>

  username  是 string  用户名
password  是 string  密码
tel 是 string  手机
ruleId  是 int 角色ID，1：管理员，2：代理人，3：子账号
integral  是 int 积分
consumeMultiple 是 int 积分消耗倍数
pid 是 int 上级ID，如果是注册代理上级ID是管理员ID。如果是子账号上级ID是代理人ID
realname  是 string  真实姓名


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
          <el-radio label="代理人" value="2"></el-radio>
          <el-radio label="子账号" value="3"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="代理列表" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择绑定代理" size="mini">
          <el-option v-for="item in dailirenList" :label="item.username" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery" size="mini"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type" size="mini">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" size="mini"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')" size="mini">重置</el-button>
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
        ruleForm: {
          username: '',
          password: '',
          realname: '',
          tel: '',
          ruleId: '',
          pid: '',

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
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          realname: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
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

//         consumeMultiple: 500
// createDate: null
// frozenStatus: 1
// id: 5
// ids: null
// integral: 500
// pUsername: null
// periodsNum: 0
// pid: 1
// realname: "dsfsdf"
// ruleId: 2
// tel: "13426262626"
// updateDate: "2018-10-29 11:43:34"
// username: "fdsfsdf"
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

</style>