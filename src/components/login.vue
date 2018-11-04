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
        <el-form-item label="验证码:" prop="securitycode">
          <el-input v-model="ruleForm.securitycode" size="mini" placeholder="验证码"> </el-input>
          <img class="yanzhengimg" :src="'data:image/png;base64,'+tupian">
          <!-- <img @click="getyanzheng" :src="'data:image/png;base64,'+tupian" height="45px" width="100px"> -->
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
    this.getyanzheng();
    this.logindev();
    if (window.ENV == 'dev') {

      //console.log('研发自动登录');
      //this.logindev();
      this.$router.push({name: 'userList'});
    } else {
      //普通用户登录
       //this.$router.push({name: 'login'});


    }
  },
  methods: {
    async getyanzheng() {
      let res = await this.$get(`${window.url}/api/captcha.jpg`);

      if(res.code===0){
        this.tupian = res.tupian;
        this.yanzhengma = res.yanzhengma;
      }
    },
    async login(formName) {
      let obj = {
                username: this.username,
                password: this.password
              };

              let ret = await this.$post(`${window.url}/api/login`, obj);
              if(ret.code === 0) {

                cookieParser.setCookie("accesstoken", ret.token);
                cookieParser.setCookie("setRuleId", ret.ruleId);

                if(ret.ruleId == 1) {
                  this.$router.push({name: 'userList'});
                } else {
                  this.$router.push({name: 'login'});
                }
                
              }
               
    },
    async logindev() {
      let that = this;

               let obj = {
                username: 'admin',
                password: '123456'
              };

              let ret = await this.$post(`${window.url}/api/login`, obj);
              if(ret.code === 0) {
                cookieParser.setCookie("accesstoken", ret.token);
                cookieParser.setCookie("setRuleId", ret.ruleId);

                if(ret.ruleId == 1) {
                  this.$router.push({name: 'userList'});
                } else {
                  this.$router.push({name: 'login'});
                }
              }

    }
  }
}
</script>

<style scoped>
</style>
<style lang="less">
</style>

