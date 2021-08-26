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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    meta: {
      title: '欢迎',
      icon: 'form'
    },
    children: [
      {
      path: 'welcome',
      name: 'Welcome',
      component: () => import('@/views/welcome/index'),
      meta: { title: '欢迎使用系统', icon: 'form' }
      },
      {
        path: 'adminworkhub',
        name: 'AdminWorkHub',
        component: () => import('@/views/welcome/adminworkhub'),
        meta: {
          roles: ['admin'],
          title: '管理员工作界面',
          icon: 'form' }
      },
    ]
  },

  {
    path: '/registration',
    component: Layout,
    meta: {
      title: '挂号相关',
      icon: 'form'
    },
    children: [
      {
        path: 'action',
        name: 'handleRegistration',
        component: () => import('@/views/registration/action'),
        meta: { title: '请挂号', icon: 'form' }
      },
      {
        path: 'index',
        name: 'Registration',
        component: () => import('@/views/registration/index'),
        meta: { title: '查看挂号记录', icon: 'form' }
      },
    ]
  },

  {
    path: '/record',
    component: Layout,
    meta: { title: '查看记录', icon: 'table' },
    children: [
      {
        path: 'all',
        name: 'allRecord',
        component: () => import('@/views/record/index'),
        meta: { title: '全部记录', icon: 'table' }
      },
      {
        path: 'department',
        name: 'depRecord',
        component: () => import('@/views/record/department'),
        meta: { title: '部门记录', icon: 'table' }
      },
      {
        path: 'patient',
        name: 'patRecord',
        component: () => import('@/views/record/patient'),
        meta: { title: '患者记录', icon: 'table' }
      },
      {
        path: 'recordetail',
        name: 'RecorDetail',
        component: () => import('@/views/recorder/recordetail'),
        meta: { title: '记录修改界面', icon: 'table' }
      },
    ]
  },

  {
    path: '/recorder',
    component: Layout,
    meta: { title: '记录表单', icon: 'table' },
    children: [
      {
        path: 'index',
        name: 'Recorder',
        component: () => import('@/views/recorder/index'),
        meta: { title: '医生记录界面', icon: 'form' }
      },
      {
        path: 'conrecorder',
        name: 'ConRecorder',
        component: () => import('@/views/recorder/conrecorder'),
        meta: { title: '患者确认界面', icon: 'form' }
      }
    ]
  },

  {
    path: '/adminedit',
    component: Layout,
    redirect: '/adminedit/userinfo',
    meta: { title: 'ConRecorder', icon: 'form' },
    children: [
      {
        path: 'userinfo',
        name: '修改用户信息',
        component: () => import('@/views/admininfoedit/index'),
        meta: { title: '管理员修改用户信息', icon: 'el-icon-s-order' }
      },
      {
        path: 'useradd',
        name: '添加用户',
        component: () => import('@/views/admininfoedit/useradd'),
        meta: { title: '添加用户', icon: 'el-icon-s-order' }
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
