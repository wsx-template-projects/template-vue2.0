import Layout from '@/views/layout'

const chartRouter = {
  path: '/chart',
  name: 'Chart',
  component: Layout,
  alwaysShow: true,
  redirect: 'chart/chartOne',
  meta: {
    title: '图表管理',
    icon: 'content'
  },
  children: [
    {
      path: '/chartOne',
      name: 'ChartOne',
      component: () => import(/* webpackChunkName: 'chartOne' */ '@/views/chart/chartOne'),
      meta: {
        title: '图表一',
        icon: 'menu'
      }
    }
  ]
}

export default chartRouter
