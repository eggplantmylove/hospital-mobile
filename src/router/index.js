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
            path: '/authorize',
            component: () => import('@/views/authorize')
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
                        icon: 'icon-index-copy'
                    }
                },
                // {
                //     path: '/record',
                //     component: () => import('@/views/record'),
                //     meta: {
                //         title: '就诊记录',
                //         icon: 'icon-jilu'
                //     }
                // },
                // {
                //     path: '/doctor',
                //     component: () => import('@/views/doctor'),
                //     meta: {
                //         title: '名医名师',
                //         icon: 'icon-yisheng'
                //     }
                // },
                // {
                //     path: '/hospital',
                //     component: () => import('@/views/hospital'),
                //     meta: {
                //         title: '附近医院',
                //         icon: 'icon-xiezilou'
                //     }
                // },
                {
                    path: '/my',
                    component: () => import('@/views/my'),
                    meta: {
                        title: '我的',
                        icon: 'icon-wode-copy'
                    }
                },

            ]
        },
        {
            path: '/hospital/detail/:id/:date_str',
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
            path: '/register/:id',
            component: () => import('@/views/dept/register'),
            meta: {
                title: '就诊卡',
                icon: 'icon-wode'
            }
        },
        {
            path: '/register-confirm',
            component: () => import('@/views/dept/register-confirm'),
            meta: {
                title: '就诊卡',
                icon: 'icon-wode'
            }
        },
        {
            path: '/pending-list',
            component: () => import('@/views/outpatient/pending-list'),
            meta: {
                title: '门诊缴费',
                icon: 'icon-wode'
            }
        },
        {
            path: '/pending-hesuan',
            component: () => import('@/views/outpatient/pending-hesuan'),
            meta: {
                title: '门诊缴费',
                icon: 'icon-wode'
            }
        },
        {
            path: '/outpatient-record',
            component: () => import('@/views/outpatient/outpatient-record'),
            meta: {
                title: '门诊缴费记录',
                icon: 'icon-wode'
            }
        },
        {
            path: '/pacs',
            component: () => import('@/views/outpatient/pacs'),
            meta: {
                title: '报告查看',
                icon: 'icon-wode'
            }
        },
        {
            path: '/lis',
            component: () => import('@/views/lis/index'),
            meta: {
                title: '检验查看',
                icon: 'icon-wode'
            }
        },
        {
            path: '/lis-detail/:id',
            component: () => import('@/views/lis/detail'),
            meta: {
                title: '检验详细查看',
                icon: 'icon-wode'
            }
        },
        {
            path: '/hospital/dept/:type',
            component: () => import('@/views/dept/index'),
            children:[]
        },
        {
            path: '/appointment/:id',
            component: () => import('@/views/dept/page2'),
            children:[]
        },
        {
            path: '/detail-resource/:id/:date_str',
            component: () => import('@/views/dept/page1'),
            children:[]
        },
        {
            path: '/card-add',
            component: () => import('@/views/my/card-add'),
            meta: {
                title: '添加就诊卡',
                icon: 'icon-wode'
            }
        },
        {
            path: '/order-list',
            component: () => import('@/views/my/order-list'),
            meta: {
                title: '订单记录',
                icon: 'icon-order'
            }
        },
        {
            path: '/scan-qrcode',
            component: () => import('@/views/scan_qrcode'),
            meta: {
                title: '缴费信息',
                icon: 'icon-order'
            }
        },
        {
            path: '/appointment-list',
            component: () => import('@/views/appointment/index'),
            meta: {
                title: '预约记录',
                icon: 'icon-wode'
            }
        },
        {
            path: '/appointment-detail',
            component: () => import('@/views/appointment/detail'),
            meta: {
                title: '预约详细',
                icon: 'icon-wode'
            }
        },
        {
            path: '/register-list',
            component: () => import('@/views/register/index'),
            meta: {
                title: '挂号记录',
                icon: 'icon-wode'
            }
        },
        {
            path: '/register-detail',
            component: () => import('@/views/register/detail'),
            meta: {
                title: '挂号详细',
                icon: 'icon-wode'
            }
        },
        {
            path: '/card-add',
            component: () => import('@/views/my/card-add'),
            meta: {
                title: '添加就诊卡',
                icon: 'icon-wode'
            }
        },
        {
            path: '/hospitalization-recharge',
            component: () => import('@/views/hospitalization/hospitalization-recharge'),
            meta: {
                title: '住院充值',
                icon: 'icon-wode'
            }
        },
        {
            path: '/hospitalization-recharge-pay',
            component: () => import('@/views/hospitalization/hospitalization-recharge-pay'),
            meta: {
                title: '住院充值支付',
                icon: 'icon-wode'
            }
        },
        {
            path: '/auth/:openid/:agt_params',
            component: () => import('@/views/auth')
        },
        //----------------住院部分----------------------
        {
            path: '/hospitalization-list',
            component: () => import('@/views/hospitalization/hospitalization-list'),
            children:[]
        },
    ]
})
