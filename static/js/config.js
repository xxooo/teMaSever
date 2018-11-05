conf = {
  logo: '',
  errorPage: 'nomenu',
  webName: 'MaiMa',
  title: 'MaiMa',
  version: "v1.0.0",
  pwReg: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/ //密码正则表达式最少6位，包括至少1个大写字母，1个小写字母，1个数字
}

window.globalConfig = conf;


//window.url = 'http://192.168.0.105:8888';
//window.url = 'http://47.106.13.12:8011';		//部署
window.url = ''; 								//本地
//获取博彩信息刷新频率					
window.refreshTime = 20000;





