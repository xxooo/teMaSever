<template>
  <el-container>
    <el-main>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="帐　号：" prop="username">
          <el-input v-model="ruleForm.username" size="mini" placeholder="请输入帐号"></el-input>
        </el-form-item>
        <el-form-item label="密　码：" prop="password">
          <el-input v-model="ruleForm.password" size="mini" placeholder="请输入密码"></el-input>
        </el-form-item>
                          <!-- <el-form-item label="验证码：" prop="securitycode">
                            <el-input v-model="ruleForm.securitycode" size="mini" placeholder="验证码"> <img src="data:image/png;base64,tupian"></el-input>
                          </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="login('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import cookieParser from './../assets/js/cookie';

export default {
  data () {
    return {
      password: '',
      username: '',
      securitycode: '',
      tupian: '',
      yanzhengma: '',
      ruleForm: {
          username: '',
          password: '',
          securitycode: ''
        },
        rules: {
          username: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          securitycode: [
          ]
        }
    }
  },
  created() {
    //this.getyanzheng();
    
    if (window.ENV == 'dev') {

      //console.log('研发自动登录');

    } else {
      //普通用户登录
       //this.$router.push({name: 'login'});


    }
  },
  methods: {
    async getyanzheng() {
      let res = await this.$get(`${window.url}/api/captcha.jpg`);

      if(res.code===200){
        this.tupian = res.tupian;
        this.yanzhengma = res.yanzhengma;
      }
    },
    async login() {

      this.$router.push({name: 'userList'});

      // let obj = {
      //   username: this.ruleForm.username,
      //   password: this.ruleForm.password
      // };

      // // let obj = {
      // //   password: 'a111111',
      // //   username: 'aydwhuiyuan1'
      // // };

      // let ret = await this.$post(`${window.url}/api/login`, obj);
      // if(ret.code === 200) {
      //   cookieParser.setCookie("accesstoken", ret.token);
      //   this.$router.push({name: 'userList'});
      // }

    }
  }
}
</script>

<style scoped>
</style>
<style lang="less">
</style>

