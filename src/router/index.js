import Vue from 'vue'
import Router from 'vue-router'
import {Message} from 'element-ui';

Vue.use(Router);

function loadView(dir, view) {
    // 注释不要去掉，对应上面 webpack 编译后的文件名
    return () => import(/* webpackChunkName: "[request]" */ '../views' + dir + '/' + view);
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: loadView('', 'Home')
    },
    {
        path: '/seckill',
        name: 'home',
        component: loadView('/seckill', 'Index')
    },

    {
        path: '/user/',
        component: loadView('/user', 'Layout'),
        children: [
            {
                path: '',
                name: 'user',
                component: loadView('/user', 'Profile'),
                meta: {auth: true},

            },
            {
                path: 'edit',
                name: 'user.edit',
                component: loadView('/user', 'Edit'),
                meta: {auth: true},
            },
            {
                path: 'passwordReset',
                name: 'user.passwordReset',
                component: loadView('/user', 'PasswordReset'),
                meta: {auth: true},
            },

        ]
    },


    {
        path: '/goals/create',
        name: 'goals.create',
        component: loadView('/goal', 'CreateAndEdit')
    },
    {
        path: '/goals/:goal/edit',
        name: 'goals.edit',
        component: loadView('/goal', 'CreateAndEdit')
    },
    {
        path: '/goals/:goal/show',
        name: 'goals.show',
        component: loadView('/goal', 'Show')
    },
    {
        path: '/auth/login',
        name: 'login',
        component: loadView('/auth', 'Login')
    },
    {
        path: '/auth/loginViaCode',
        name: 'login.code',
        component: loadView('/auth', 'LoginViaCode')
    },
    {
        path: '/goalCategories/create',
        name: 'goalCategories.create',
        component: loadView('/goalCategory', 'CreateAndEdit')
    },
    {
        path: '/goalCategories/:goalCategoryId/edit',
        name: 'goalCategories.edit',
        component: loadView('/goalCategory', 'CreateAndEdit')
    },
    {
        path: '/goalCategories',
        name: 'goalCategories.index',
        component: loadView('/goalCategory', 'Index')
    },

];
const router = new Router({
    mode: 'history',
    linkExactActiveClass: 'is-active',
    routes
});


// 全局前置守卫
router.beforeEach((to, from, next) => {
    const auth = router.app.$options.store.state.auth;
    const loginUrl = '/auth/loginViaCode';
    if (auth && to.path.indexOf('/auth/') !== -1) {//登陆了就不允许进入登陆页面
        next('/');
    } else if (!auth && to.meta.auth) {
        Message.warning('请先登陆！');
        next(loginUrl);
    } else {
        next();
    }
});

export default router;
