import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _264c2b3d = () => interopDefault(import('..\\pages\\articles\\index.vue' /* webpackChunkName: "pages_articles_index" */))
const _ff334208 = () => interopDefault(import('..\\pages\\customer\\index.vue' /* webpackChunkName: "pages_customer_index" */))
const _d321f218 = () => interopDefault(import('..\\pages\\invoices\\index.vue' /* webpackChunkName: "pages_invoices_index" */))
const _36b702f6 = () => interopDefault(import('..\\pages\\job.vue' /* webpackChunkName: "pages_job" */))
const _3ab79f9e = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _9d512616 = () => interopDefault(import('..\\pages\\newinvoice.vue' /* webpackChunkName: "pages_newinvoice" */))
const _3f152f0b = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages_register" */))
const _350d9f20 = () => interopDefault(import('..\\pages\\Signup.vue' /* webpackChunkName: "pages_Signup" */))
const _ec582df2 = () => interopDefault(import('..\\pages\\invoices\\draft\\_id.vue' /* webpackChunkName: "pages_invoices_draft__id" */))
const _30701368 = () => interopDefault(import('..\\pages\\invoices\\overdue\\_id.vue' /* webpackChunkName: "pages_invoices_overdue__id" */))
const _46fd63e0 = () => interopDefault(import('..\\pages\\invoices\\paid\\_id.vue' /* webpackChunkName: "pages_invoices_paid__id" */))
const _3c75d8e5 = () => interopDefault(import('..\\pages\\articles\\_id.vue' /* webpackChunkName: "pages_articles__id" */))
const _1eb7f064 = () => interopDefault(import('..\\pages\\customer\\_id.vue' /* webpackChunkName: "pages_customer__id" */))
const _18fc8d1a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _264c2b3d,
    name: "articles"
  }, {
    path: "/customer",
    component: _ff334208,
    name: "customer"
  }, {
    path: "/invoices",
    component: _d321f218,
    name: "invoices"
  }, {
    path: "/job",
    component: _36b702f6,
    name: "job"
  }, {
    path: "/login",
    component: _3ab79f9e,
    name: "login"
  }, {
    path: "/newinvoice",
    component: _9d512616,
    name: "newinvoice"
  }, {
    path: "/register",
    component: _3f152f0b,
    name: "register"
  }, {
    path: "/Signup",
    component: _350d9f20,
    name: "Signup"
  }, {
    path: "/invoices/draft/:id?",
    component: _ec582df2,
    name: "invoices-draft-id"
  }, {
    path: "/invoices/overdue/:id?",
    component: _30701368,
    name: "invoices-overdue-id"
  }, {
    path: "/invoices/paid/:id?",
    component: _46fd63e0,
    name: "invoices-paid-id"
  }, {
    path: "/articles/:id",
    component: _3c75d8e5,
    name: "articles-id"
  }, {
    path: "/customer/:id",
    component: _1eb7f064,
    name: "customer-id"
  }, {
    path: "/",
    component: _18fc8d1a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
