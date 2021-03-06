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
              requireAuth: true
          },
          component: r => require.ensure([], () => r(require('@/components/apps/app/userList')), 'userList'), meta: { requiresAuth: true }
        },
        { path: '/manage/userList/userEdit/:id', name: 'userEdit',
          meta: {                                
              requireAuth: true
          },
          component: r => require.ensure([], () => r(require('@/components/apps/app/userInfo')), 'userEdit'), meta: { requiresAuth: true }
        },
        { path: '/manage/userList/userCreate', name: 'userCreate',
          meta: {                                
              requireAuth: true
          },
          component: r => require.ensure([], () => r(require('@/components/apps/app/userInfo')), 'userCreate'), meta: { requiresAuth: true }
        },
        { path: '/manage/userList/importExport', name: 'importExport',
          meta: {                                
              requireAuth: true
          },
          component: r => require.ensure([], () => r(require('@/components/apps/app/importExport')), 'importExport'), meta: { requiresAuth: true }
        },
        { path: '/manage/historyList', name: 'historyList',
          meta: {                                
              requireAuth: true
          },
          component: r => require.ensure([], () => r(require('@/components/apps/app/historyList')), 'historyList'), meta: { requiresAuth: true }
        },
        { path: '/manage/historyList/historyInfo', name: 'historyInfo',
          meta: {                                
              requireAuth: true
          },
          component: r => require.ensure([], () => r(require('@/components/apps/app/historyInfo')), 'historyInfo'), meta: { requiresAuth: true }
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