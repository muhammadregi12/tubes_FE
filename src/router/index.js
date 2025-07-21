import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Dashboard from '../views/master/Dashboard.vue'
import Home from '../views/Home.vue'
import Panduan from '../views/Panduan.vue'
import Arisangroup from '../views/master/group/Arisangroup.vue'
import CreateGroup from '../views/master/group/createGroup.vue'
import JoinGroup from '../views/master/group/joinGroup.vue'
import Arisanku from '../views/master/group/arisanku.vue'
import PaymentHistory from '../views/master/group/paymentHistory.vue'
import PaymentHistoryUser from '../views/master/group/paymentHistoryUser.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/panduan', component: Panduan },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { 
    path: '/dashboard', 
    component: Dashboard,
    meta: {requiresAuth: true}
  },
  { 
    path: '/arisangroup', 
    component: Arisangroup,
    meta: {requiresAuth: true}
  },
  { 
    path: '/addgroup', 
    component: CreateGroup,
    meta: {requiresAuth: true}
  },
  { 
    path: '/join', 
    component: JoinGroup,
    meta: {requiresAuth: true}
  },

  { 
    path: '/arisanku', 
    component: Arisanku,
    meta: {requiresAuth: true}
  },

  {
    path: '/riwayat-pembayaran/:groupId',
    name: 'payment-history',
    component: PaymentHistory,
    props: true,
    meta: {requiresAuth: true}
  },

  {
    path: '/riwayat-pembayaran-saya',
    name: 'riwayat-pembayaran-saya',
    component: PaymentHistoryUser,
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')

  // Jika rute memerlukan auth dan user belum login
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login')
  } 
  // Jika user sudah login dan mencoba mengakses login/register
  else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next('/dashboard')
  } 
  else {
    next()
  }
})

export default router
