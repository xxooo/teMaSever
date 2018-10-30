import Vue from 'vue';
import Router from 'vue-router';
import cookie from './assets/js/cookie';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/', name: 'index', component: r => require.ensure([], () => r(require('./App')), 'index'),redirect: '/login'
    },
    {
      path: '/login', name: 'login', component: r => require.ensure([], () => r(require('@/components/login')), 'login')
    },
    {
      path: '/manage', name: 'manage', component: r => require.ensure([], () => r(require('@/components/manage')), 'manage'),
      children: [
        { path: '/manage/userList', name: 'userList',
          meta: {                                
              //requireAuth: true,
              requireAuth: false
          },
          component: r => require.ensure([], () => r(require('@/components/apps/app/userList')), 'userList'), meta: { requiresAuth: false }
        }
      ]
    }
  ]
});


router.beforeEach((to, from, next) => {

  let token = cookie.getCookie('accesstoken');

    if (to.matched.some(r => r.meta.requireAuth)) {
        if (token) {
            next();
        }
        else {
            next({
                path: '/login'
            })
        }
    }
    else {
        next();
    }
});

router.afterEach(transition => {
})

export default router;