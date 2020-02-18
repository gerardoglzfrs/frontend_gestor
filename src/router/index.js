import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ListaLaboratorios',
    component: () => import('../views/ListaLaboratorios.vue')
  },
  {
    path: '/:nameLab',
    name: 'DatosLaboratorios',
    component: () => import('../views/DatosLaboratorio.vue')
  },
  {
    path: '/admins',
    name: 'Admins',
    component: () => import('../views/Admins/Admins.vue')
  },
  {
   path: '/proyectolabs',
   name: 'ProyectosLabs',
   component: () => import('../views/Admins/ProyectosLabs.vue')
  },
  {
    path: '/laboratorio',
    name: 'Labs',
    component: () => import('../views/Laboratorio/Labs')
  },
  {
    path: '/metodologia',
    name: 'Metodologia',
    component: () => import('../components/Proyectos/Metodologia')
  }  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
