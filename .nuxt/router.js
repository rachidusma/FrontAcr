import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _03c5c932 = () => interopDefault(import('..\\pages\\articles\\index.vue' /* webpackChunkName: "pages_articles_index" */))
const _58374f26 = () => interopDefault(import('..\\pages\\customer\\index.vue' /* webpackChunkName: "pages_customer_index" */))
const _6e3ff71e = () => interopDefault(import('..\\pages\\invoices\\index.vue' /* webpackChunkName: "pages_invoices_index" */))
const _f7f0eaea = () => interopDefault(import('..\\pages\\newinvoice.vue' /* webpackChunkName: "pages_newinvoice" */))
const _013bba21 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages_register" */))
const _6467f7b6 = () => interopDefault(import('..\\pages\\Signup.vue' /* webpackChunkName: "pages_Signup" */))
const _3276f9c6 = () => interopDefault(import('..\\pages\\invoices\\draft\\_id.vue' /* webpackChunkName: "pages_invoices_draft__id" */))
const _13a27ffe = () => interopDefault(import('..\\pages\\invoices\\overdue\\_id.vue' /* webpackChunkName: "pages_invoices_overdue__id" */))
const _f6abcd8c = () => interopDefault(import('..\\pages\\invoices\\paid\\_id.vue' /* webpackChunkName: "pages_invoices_paid__id" */))
const _429e9b70 = () => interopDefault(import('..\\pages\\invoices\\published\\_id.vue' /* webpackChunkName: "pages_invoices_published__id" */))
const _3938cb8f = () => interopDefault(import('..\\pages\\articles\\_id.vue' /* webpackChunkName: "pages_articles__id" */))
const _1b7ae30e = () => interopDefault(import('..\\pages\\customer\\_id.vue' /* webpackChunkName: "pages_customer__id" */))
const _3349c9c4 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _03c5c932,
    name: "articles"
  }, {
    path: "/customer",
    component: _58374f26,
    name: "customer"
  }, {
    path: "/invoices",
    component: _6e3ff71e,
    name: "invoices"
  }, {
    path: "/newinvoice",
    component: _f7f0eaea,
    name: "newinvoice"
  }, {
    path: "/register",
    component: _013bba21,
    name: "register"
  }, {
    path: "/Signup",
    component: _6467f7b6,
    name: "Signup"
  }, {
    path: "/invoices/draft/:id?",
    component: _3276f9c6,
    name: "invoices-draft-id"
  }, {
    path: "/invoices/overdue/:id?",
    component: _13a27ffe,
    name: "invoices-overdue-id"
  }, {
    path: "/invoices/paid/:id?",
    component: _f6abcd8c,
    name: "invoices-paid-id"
  }, {
    path: "/invoices/published/:id?",
    component: _429e9b70,
    name: "invoices-published-id"
  }, {
    path: "/articles/:id",
    component: _3938cb8f,
    name: "articles-id"
  }, {
    path: "/customer/:id",
    component: _1b7ae30e,
    name: "customer-id"
  }, {
    path: "/",
    component: _3349c9c4,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
