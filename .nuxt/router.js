import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _73263f7f = () => interopDefault(import('..\\pages\\articles\\index.vue' /* webpackChunkName: "pages_articles_index" */))
const _657f1984 = () => interopDefault(import('..\\pages\\customer\\index.vue' /* webpackChunkName: "pages_customer_index" */))
const _396dc994 = () => interopDefault(import('..\\pages\\invoices\\index.vue' /* webpackChunkName: "pages_invoices_index" */))
const _26d965c7 = () => interopDefault(import('..\\pages\\job.vue' /* webpackChunkName: "pages_job" */))
const _6b3c4ef3 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _442e3773 = () => interopDefault(import('..\\pages\\newinvoice.vue' /* webpackChunkName: "pages_newinvoice" */))
const _47171806 = () => interopDefault(import('..\\pages\\paidsalary\\index.vue' /* webpackChunkName: "pages_paidsalary_index" */))
const _5ae349d9 = () => interopDefault(import('..\\pages\\settings\\index.vue' /* webpackChunkName: "pages_settings_index" */))
const _810d4ec4 = () => interopDefault(import('..\\pages\\Signup.vue' /* webpackChunkName: "pages_Signup" */))
const _2ca2afee = () => interopDefault(import('..\\pages\\statistics.vue' /* webpackChunkName: "pages_statistics" */))
const _6f41f3cb = () => interopDefault(import('..\\pages\\uppaidsalary\\index.vue' /* webpackChunkName: "pages_uppaidsalary_index" */))
const _0fdb8a31 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages_user_index" */))
const _7c8dc142 = () => interopDefault(import('..\\pages\\settings\\change-password.vue' /* webpackChunkName: "pages_settings_change-password" */))
const _29afb09e = () => interopDefault(import('..\\pages\\settings\\forgetPassword.vue' /* webpackChunkName: "pages_settings_forgetPassword" */))
const _d643f5e8 = () => interopDefault(import('..\\pages\\settings\\invoice-settings.vue' /* webpackChunkName: "pages_settings_invoice-settings" */))
const _0cea4497 = () => interopDefault(import('..\\pages\\settings\\personal-settings.vue' /* webpackChunkName: "pages_settings_personal-settings" */))
const _7273a3f6 = () => interopDefault(import('..\\pages\\invoices\\draft\\_id.vue' /* webpackChunkName: "pages_invoices_draft__id" */))
const _0c35de34 = () => interopDefault(import('..\\pages\\invoices\\overdue\\_id.vue' /* webpackChunkName: "pages_invoices_overdue__id" */))
const _49d37152 = () => interopDefault(import('..\\pages\\invoices\\paid\\_id.vue' /* webpackChunkName: "pages_invoices_paid__id" */))
const _bafedb50 = () => interopDefault(import('..\\pages\\invoices\\published\\_id.vue' /* webpackChunkName: "pages_invoices_published__id" */))
const _0dec15a7 = () => interopDefault(import('..\\pages\\articles\\_id.vue' /* webpackChunkName: "pages_articles__id" */))
const _1fa3a5b4 = () => interopDefault(import('..\\pages\\customer\\_id.vue' /* webpackChunkName: "pages_customer__id" */))
const _bcd6a848 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _73263f7f,
    name: "articles"
  }, {
    path: "/customer",
    component: _657f1984,
    name: "customer"
  }, {
    path: "/invoices",
    component: _396dc994,
    name: "invoices"
  }, {
    path: "/job",
    component: _26d965c7,
    name: "job"
  }, {
    path: "/login",
    component: _6b3c4ef3,
    name: "login"
  }, {
    path: "/newinvoice",
    component: _442e3773,
    name: "newinvoice"
  }, {
    path: "/paidsalary",
    component: _47171806,
    name: "paidsalary"
  }, {
    path: "/settings",
    component: _5ae349d9,
    name: "settings"
  }, {
    path: "/Signup",
    component: _810d4ec4,
    name: "Signup"
  }, {
    path: "/statistics",
    component: _2ca2afee,
    name: "statistics"
  }, {
    path: "/uppaidsalary",
    component: _6f41f3cb,
    name: "uppaidsalary"
  }, {
    path: "/user",
    component: _0fdb8a31,
    name: "user"
  }, {
    path: "/settings/change-password",
    component: _7c8dc142,
    name: "settings-change-password"
  }, {
    path: "/settings/forgetPassword",
    component: _29afb09e,
    name: "settings-forgetPassword"
  }, {
    path: "/settings/invoice-settings",
    component: _d643f5e8,
    name: "settings-invoice-settings"
  }, {
    path: "/settings/personal-settings",
    component: _0cea4497,
    name: "settings-personal-settings"
  }, {
    path: "/invoices/draft/:id?",
    component: _7273a3f6,
    name: "invoices-draft-id"
  }, {
    path: "/invoices/overdue/:id?",
    component: _0c35de34,
    name: "invoices-overdue-id"
  }, {
    path: "/invoices/paid/:id?",
    component: _49d37152,
    name: "invoices-paid-id"
  }, {
    path: "/invoices/published/:id?",
    component: _bafedb50,
    name: "invoices-published-id"
  }, {
    path: "/articles/:id",
    component: _0dec15a7,
    name: "articles-id"
  }, {
    path: "/customer/:id",
    component: _1fa3a5b4,
    name: "customer-id"
  }, {
    path: "/",
    component: _bcd6a848,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
