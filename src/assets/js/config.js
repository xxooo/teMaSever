export default {
    install: function (Vue, options) {
        // 1. 添加全局方法或属性
        Vue.prototype.$cfg = {pagesize: 10};
    }
};
