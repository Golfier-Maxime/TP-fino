import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SetupView from '../views/SetupView.vue'
import BarchartView from '../views/chartjs/BarchartView.vue'
import PieView from '../views/chartjs/PieView.vue'
import MapView from '../views/MapView.vue'
import SncfView from '../views/SncfView.vue'
import Service from '../views/Service.vue'
import Service2 from '../views/Service2.vue'
import TriFiltre01 from '../views/TriFiltre01.vue'
import TriFiltre02 from '../views/TriFiltre02.vue'
import TriFiltre03 from '../views/TriFiltre03.vue'
import LineChartView from '../views/chartjs/LineChartView.vue'
import RadarView from '../views/chartjs/RadarView.vue'
import AreaView from '../views/chartjs/AreaView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/setup',
      name: 'setup',
      component: SetupView
    },
    {
      path: '/barchart',
      name: 'BarchartView',
      component: BarchartView
    },
    {
      path: '/Map',
      name: 'MapView',
      component: MapView
    },
    {
      path: '/Pie',
      name: 'PieView',
      component: PieView
    },
    {
      path: '/Sncf',
      name: 'SncfView',
      component: SncfView
    },
    {
      path: '/LineChart',
      name: 'LineChart',
      component: LineChartView
    },
    {
      path: '/Service',
      name: 'Service',
      component: Service
    },
    {
      path: '/Service2',
      name: 'Service2',
      component: Service2
    },
    {
      path: '/Radar',
      name: 'Radar',
      component: RadarView
    },
    {
      path: '/Area',
      name: 'Area',
      component: AreaView
    },
    {
      path: '/TriFiltre01',
      name: 'TriFiltre01',
      component: TriFiltre01
    },
    {
      path: '/TriFiltre02',
      name: 'TriFiltre02',
      component: TriFiltre02
    },
    {
      path: '/TriFiltre03',
      name: 'TriFiltre03',
      component: TriFiltre03
    },
    {
      path: '/TriFiltre04',
      name: 'TriFiltre04',
      component: () => import('../views/TriFiltre04.vue')
    }, {
      path: '/TriFiltre05',
      name: 'TriFiltre05',
      component: () => import('../views/TriFiltre05.vue')
    },

  ]
})

export default router
