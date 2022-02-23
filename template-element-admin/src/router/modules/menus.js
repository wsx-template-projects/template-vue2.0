/**
 * 菜单管理路由模块
 */
import Layout from '@/views/layout'

const TwoMenusDemo = () => import('@/views/menus//two-menus-demo')
const TwoMenus = () => import('@/views/menus/two-menus/')
const ThreeMenusDemo = () => import('@/views/menus/two-menus/three-menus-demo')

const menusRouter = {
  path: '/menus',
  name: 'Menus',
  component: Layout,
  redirect: '/menus/two-menus-demo',
  alwaysShow: true,
  meta: {
    title: 'menus管理',
    icon: 'content'
  },
  children: [
    {
      path: 'two-menus-demo',
      name: 'TwoMenusDemo',
      component: TwoMenusDemo,
      meta: {
        title: 'two-menus-demo',
        icon: 'menu'
      }
    },
    {
      path: 'two-menus',
      name: 'TwoMenus',
      component: TwoMenus,
      alwaysShow: true,
      meta: {
        title: 'two-menus',
        icon: 'menu'
      },
      children: [
        {
          path: 'three-menus-demo',
          name: 'ThreeMenusDemo',
          component: ThreeMenusDemo,
          meta: {
            title: 'three-menus-demo',
            icon: 'menu'
          }
        }
      ]
    }
  ]
}

export default menusRouter
