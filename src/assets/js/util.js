import cookie from 'js-cookie';
import qs from 'qs';
import $cookie from './cookie.js';

let notify = function(title, msg, type, position = 'bottom-right'){
    this.$notify({
        title: title,
        message: msg,
        type: type,
        duration: 3000,
        offset: 500,
        position: position
    });
};

let currUser;


export default {
    install: function (Vue, options) {


        Vue.prototype.$success = function(msg){
            notify.call(this, '成功1', (msg || '操作成功!') ,'success');
        };

        Vue.prototype.$warning = function(msg){
            notify.call(this, '警告', (msg || '操作有误!'), 'warning');
        };

        Vue.prototype.$error = function(msg){
            notify.call(this, '错误', (msg || '操作失败!'), 'error');
        };

        Vue.prototype.$c_confirm = function(

            successHandler, 
            title = '提示',
            msg = '确定删除?',
            ){
            let that = this;
            that.$confirm(msg, title, {
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(async () => {
                await successHandler();
            }).catch(() => {});
        };

        Vue.prototype.$alertMessage = function(content,title){
            this.$alert(content, title, {
            confirmButtonText: '确定',
            callback: action => {

            }
          });
        };

        Vue.prototype.$timestampToTime = function(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate()*1 > 9 ? date.getDate() + ' ' : '0' + date.getDate() + ' ';
            var h = date.getHours()*1 > 9 ? date.getHours() + ':' : '0' + date.getHours() + ':';
            var m = date.getMinutes()*1 > 9 ? date.getMinutes() + ':' : '0' + date.getMinutes() + ':';
            var s = date.getSeconds()*1 > 9 ? date.getSeconds() : '0'+ date.getSeconds();
            return Y+M+D+h+m+s;
        };

        Vue.prototype.$timestampToTimeRi = function(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate()*1 > 9 ? date.getDate() + ' ' : '0' + date.getDate() + ' ';
            return Y+M+D;
        };

        Vue.prototype.$currUser = async function(){
            currUser = currUser || JSON.parse(cookie.get('currUser'));
            if(currUser) return currUser;
            let res = await this.$get(`${window.account}/user/profile`);
            cookie.setCookie("currUser", res.result)
            currUser = res.result;

            let roleCodes = currUser.roleCodes;
            currUser.isAdmin = roleCodes.indexOf('platform-admin') != -1;

            return currUser;
        };

        Vue.prototype.$download = function(src){
            let query = {}, uri;
            if(src.indexOf('?') != -1){
                let segment = src.split('?');
                uri = segment[0];
                query = qs.parse(src.split('?')[1]);
            }
            query.access_token = cookie.get('accesstoken');
            
            src = (uri || src)  + '?' + qs.stringify(query);
            document.querySelector('#frm-download').setAttribute('src', src);
        };

        let $fileupload;
        Vue.prototype.$upload = function(opts){
            opts = {
                url: ''
            };
            !$fileupload && ($fileupload = document.querySelector('#file-upload'));

            $fileupload.addEventListener('change', function(){
            });
            $fileupload.click();
        };
    }
};










