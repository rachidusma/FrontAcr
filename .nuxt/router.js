import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f4bc5de0 = () => interopDefault(import('..\\pages\\articles\\index.vue' /* webpackChunkName: "pages_articles_index" */))
const _4087f662 = () => interopDefault(import('..\\pages\\customer\\index.vue' /* webpackChunkName: "pages_customer_index" */))
const _1476a672 = () => interopDefault(import('..\\pages\\invoices\\index.vue' /* webpackChunkName: "pages_invoices_index" */))
const _6903ee50 = () => interopDefault(import('..\\pages\\job.vue' /* webpackChunkName: "pages_job" */))
const _794471c4 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _24902f42 = () => interopDefault(import('..\\pages\\newinvoice.vue' /* webpackChunkName: "pages_newinvoice" */))
const _ae16ed52 = () => interopDefault(import('..\\pages\\paidsalary\\index.vue' /* webpackChunkName: "pages_paidsalary_index" */))
const _9fb70e84 = () => interopDefault(import('..\\pages\\profile\\index.vue' /* webpackChunkName: "pages_profile_index" */))
const _7b77bed0 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages_register" */))
const _72758fed = () => interopDefault(import('..\\pages\\Signup.vue' /* webpackChunkName: "pages_Signup" */))
const _60ef5648 = () => interopDefault(import('..\\pages\\uppaidsalary\\index.vue' /* webpackChunkName: "pages_uppaidsalary_index" */))
const _3bb88c42 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages_user_index" */))
const _6f4bef14 = () => interopDefault(import('..\\pages\\invoices\\draft\\_id.vue' /* webpackChunkName: "pages_invoices_draft__id" */))
const _d0026b96 = () => interopDefault(import('..\\pages\\invoices\\overdue\\_id.vue' /* webpackChunkName: "pages_invoices_overdue__id" */))
const _abcc5b3a = () => interopDefault(import('..\\pages\\invoices\\paid\\_id.vue' /* webpackChunkName: "pages_invoices_paid__id" */))
const _211133e7 = () => interopDefault(import('..\\pages\\invoices\\published\\_id.vue' /* webpackChunkName: "pages_invoices_published__id" */))
const _92de5110 = () => interopDefault(import('..\\pages\\articles\\_id.vue' /* webpackChunkName: "pages_articles__id" */))
const _ce5a2212 = () => interopDefault(import('..\\pages\\customer\\_id.vue' /* webpackChunkName: "pages_customer__id" */))
const _a0c662a6 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/articles",
    component: _f4bc5de0,
    name: "articles"
  }, {
    path: "/customer",
    component: _4087f662,
    name: "customer"
  }, {
    path: "/invoices",
    component: _1476a672,
    name: "invoices"
  }, {
    path: "/job",
    component: _6903ee50,
    name: "job"
  }, {
    path: "/login",
    component: _794471c4,
    name: "login"
  }, {
    path: "/newinvoice",
    component: _24902f42,
    name: "newinvoice"
  }, {
    path: "/paidsalary",
    component: _ae16ed52,
    name: "paidsalary"
  }, {
    path: "/profile",
    component: _9fb70e84,
    name: "profile"
  }, {
    path: "/register",
    component: _7b77bed0,
    name: "register"
  }, {
    path: "/Signup",
    component: _72758fed,
    name: "Signup"
  }, {
    path: "/uppaidsalary",
    component: _60ef5648,
    name: "uppaidsalary"
  }, {
    path: "/user",
    component: _3bb88c42,
    name: "user"
  }, {
    path: "/invoices/draft/:id?",
    component: _6f4bef14,
    name: "invoices-draft-id"
  }, {
    path: "/invoices/overdue/:id?",
    component: _d0026b96,
    name: "invoices-overdue-id"
  }, {
    path: "/invoices/paid/:id?",
    component: _abcc5b3a,
    name: "invoices-paid-id"
  }, {
    path: "/invoices/published/:id?",
    component: _211133e7,
    name: "invoices-published-id"
  }, {
    path: "/articles/:id",
    component: _92de5110,
    name: "articles-id"
  }, {
    path: "/customer/:id",
    component: _ce5a2212,
    name: "customer-id"
  }, {
    path: "/",
    component: _a0c662a6,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
