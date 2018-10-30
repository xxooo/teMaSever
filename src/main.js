import Vue from 'vue';
import App from './App';
import router from './router.js';
import $ from 'jquery'
import axios from 'axios';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

import util from './assets/js/util.js';
Vue.use(util);
import config from './assets/js/config.js';
Vue.use(config);
import cookie from './assets/js/cookie';
import _g from './assets/js/global';
import request from './assets/js/request.js';
Vue.use(request);

Vue.config.productionTip = false;

window.router = router;
// window.store = store;
window.axios = axios;
window._g = _g;
window.cookie = cookie;
const bus = new Vue();
window.bus = bus;

(async function () {

    window.getVue = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    });

})().catch(err => {
    console.error('geting access token error...', err);
});


