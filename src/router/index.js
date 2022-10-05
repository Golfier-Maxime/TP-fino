import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SetupView from '../views/SetupView.vue'
import BarchartView from '../views/chartjs/BarchartView.vue'
import PieView from '../views/chartjs/PieView.vue'
import MapView from '../views/MapView.vue'
import SncfView from '../views/SncfView.vue'
import Service from '../views/Service.vue'
import LineChartView from '../views/chartjs/LineChartView.vue'
import RadarView from '../views/chartjs/RadarView.vue'
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
      path: '/Radar',
      name: 'Radar',
      component: RadarView
    },

  ]
})

export default router
