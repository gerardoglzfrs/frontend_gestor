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
    name: 'ProyectosLaboratorios',
    component: () => import('../views/ProyectosLaboratorios.vue')
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
  // Esta ruta es de prueba
  {
    path: '/metodologia',
    name: 'Metodologia',
    component: () => import('../components/Proyectos/Metodologia')
  },
  {
    path: '/Proyectos',
    name: 'Proyectos',
    component: () => import('../views/Laboratorio/Proyectos')
  },
  // Esta ruta es de prueba
  {
    path: '/Perfil',
    name: 'Perfil',
    component: () => import('../views/Alumnos/Perfil.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
