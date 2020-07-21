import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/information',
    component: Layout,
    redirect: '/information/notice',
    name: 'information',
    meta: {
      title: '资讯信息',
      icon: 'example'
    },
    children: [
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/views/information/notice'),
        meta: {
          title: '实时公告',
          icon: 'tree'
        }
      }
    ]
  }
]

export const asyncRouterMap = [
  // 图表页
  {
    path: '/charts',
    component: Layout,
    children: [{
      path: 'index',
      name: 'charts',
      component: () => import('@/views/charts/index'),
      meta: {
        title: '信息总览',
        icon: 'form',
        roles: ['admin']
      }
    }]
  },
  // 用户管理
  {
    path: '/user',
    component: Layout,
    children: [{
      path: 'index',
      name: 'user',
      component: () => import('@/views/user/index'),
      meta: {
        title: '用户管理',
        icon: 'form',
        roles: ['admin']
      }
    }]
  },
  // 教练管理
  {
    path: '/trainer',
    component: Layout,
    children: [{
      path: 'index',
      name: 'trainer',
      component: () => import('@/views/trainer/index'),
      meta: {
        title: '教练管理',
        icon: 'form',
        roles: ['admin']
      }
    }]
  },
  // 器材管理
  {
    path: '/equipment',
    component: Layout,
    children: [{
      path: 'index',
      name: 'equipment',
      component: () => import('@/views/equipment/index'),
      meta: {
        title: '器材管理',
        icon: 'form',
        roles: ['admin']
      }
    }]
  },
  // 课程管理
  {
    path: '/course',
    component: Layout,
    children: [{
      path: 'index',
      name: 'course',
      component: () => import('@/views/course/index'),
      meta: {
        title: '团课课程管理',
        icon: 'form',
        roles: ['admin']
      }
    }]
  },
  // 选课
  {
    path: '/changeCourse',
    component: Layout,
    redirect: '/changeCourse/commonCourse',
    meta: {
      title: '选择课程',
      icon: 'form',
      roles: ['user']
    },
    children: [{
      path: 'commonCourse',
      name: 'commonCourse',
      component: () => import('@/views/changeCourse/commonCourse'),
      meta: {
        title: '精品团课',
        icon: 'table'
      }
    },
    {
      path: 'private',
      name: 'private',
      component: () => import('@/views/changeCourse/private'),
      meta: {
        title: '私教',
        icon: 'tree'
      }
    }]
  },
  // 公告管理
  {
    path: '/announce',
    component: Layout,
    redirect: '/announce/report',
    name: 'announce',
    meta: {
      title: '公告管理',
      icon: 'form',
      roles: ['admin']
    },
    children: [{
      path: 'report',
      name: 'report',
      component: () => import('@/views/announce/report'),
      meta: {
        title: '文章发表',
        icon: 'form'
      }
    }, {
      path: 'announceList',
      name: 'announceList',
      component: () => import('@/views/announce/announceList'),
      meta: {
        title: '文章管理',
        icon: 'form'
      }
    }]
  },
  // 个人中心
  {
    path: '/person',
    component: Layout,
    redirect: '/person/personInfo',
    name: 'person',
    meta: {
      title: '个人中心',
      icon: 'example',
      roles: ['user']
    },
    children: [
      {
        path: 'personInfo',
        name: 'personInfo',
        component: () => import('@/views/person/personInfo'),
        meta: {
          title: '个人信息',
          icon: 'table'
        }
      },
      {
        path: 'changeInfo',
        name: 'changeInfo',
        component: () => import('@/views/person/changeInfo'),
        meta: {
          title: '修改信息',
          icon: 'tree'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

// const createRouter = () => new Router({
//   // mode: 'history', // require service support
//   scrollBehavior: () => ({
//     y: 0
//   }),
//   routes: constantRoutes
// })

// const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

// router.beforeEach((to, from, next) => {
//   console.log(to.meta.role $$ localStorng.token){
//   return next(/login)
// }
// })
// export default router

export default new Router({
  routes: constantRouterMap
})

