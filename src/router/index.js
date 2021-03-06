import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/demo',
            component: () => import('@/views/demo')
        },
        {
            path: '/',
            component: () => import('@/views/bottomNav'),
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    component: () => import('@/views/home'),
                    meta: {
                        title: '首页',
                        icon: 'icon-shouye'
                    }
                },
                {
                    path: '/record',
                    component: () => import('@/views/record'),
                    meta: {
                        title: '就诊记录',
                        icon: 'icon-jilu'
                    }
                },
                {
                    path: '/doctor',
                    component: () => import('@/views/doctor'),
                    meta: {
                        title: '名医名师',
                        icon: 'icon-yisheng'
                    }
                },
                {
                    path: '/hospital',
                    component: () => import('@/views/hospital'),
                    meta: {
                        title: '附近医院',
                        icon: 'icon-xiezilou'
                    }
                },
                {
                    path: '/my',
                    component: () => import('@/views/my'),
                    meta: {
                        title: '我的',
                        icon: 'icon-wode'
                    }
                },

            ]
        },
        {
            path: '/hospital/detail',
            component: () => import('@/views/hospital/detail'),
            children:[]
        },
        {
            path: '/card-list',
            component: () => import('@/views/my/card-list'),
            meta: {
                title: '就诊卡',
                icon: 'icon-wode'
            }
        },
        {
            path: '/hospital/dept',
            component: () => import('@/views/dept/index'),
            children:[]
        },
        {
            path: '/appointment/:id',
            component: () => import('@/views/dept/page2'),
            children:[]
        },
        {
            path: '/detail-resource/:id',
            component: () => import('@/views/dept/page1'),
            children:[]
        }
    ]
})
