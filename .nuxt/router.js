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
const _bcd6a848 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
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
    name: "articles___en"
  }, {
    path: "/customer",
    component: _657f1984,
    name: "customer___en"
  }, {
    path: "/invoices",
    component: _396dc994,
    name: "invoices___en"
  }, {
    path: "/job",
    component: _26d965c7,
    name: "job___en"
  }, {
    path: "/login",
    component: _6b3c4ef3,
    name: "login___en"
  }, {
    path: "/newinvoice",
    component: _442e3773,
    name: "newinvoice___en"
  }, {
    path: "/paidsalary",
    component: _47171806,
    name: "paidsalary___en"
  }, {
    path: "/settings",
    component: _5ae349d9,
    name: "settings___en"
  }, {
    path: "/Signup",
    component: _810d4ec4,
    name: "Signup___en"
  }, {
    path: "/statistics",
    component: _2ca2afee,
    name: "statistics___en"
  }, {
    path: "/sw",
    component: _bcd6a848,
    name: "index___sw"
  }, {
    path: "/uppaidsalary",
    component: _6f41f3cb,
    name: "uppaidsalary___en"
  }, {
    path: "/user",
    component: _0fdb8a31,
    name: "user___en"
  }, {
    path: "/settings/change-password",
    component: _7c8dc142,
    name: "settings-change-password___en"
  }, {
    path: "/settings/forgetPassword",
    component: _29afb09e,
    name: "settings-forgetPassword___en"
  }, {
    path: "/settings/invoice-settings",
    component: _d643f5e8,
    name: "settings-invoice-settings___en"
  }, {
    path: "/settings/personal-settings",
    component: _0cea4497,
    name: "settings-personal-settings___en"
  }, {
    path: "/sw/articles",
    component: _73263f7f,
    name: "articles___sw"
  }, {
    path: "/sw/customer",
    component: _657f1984,
    name: "customer___sw"
  }, {
    path: "/sw/invoices",
    component: _396dc994,
    name: "invoices___sw"
  }, {
    path: "/sw/job",
    component: _26d965c7,
    name: "job___sw"
  }, {
    path: "/sw/login",
    component: _6b3c4ef3,
    name: "login___sw"
  }, {
    path: "/sw/newinvoice",
    component: _442e3773,
    name: "newinvoice___sw"
  }, {
    path: "/sw/paidsalary",
    component: _47171806,
    name: "paidsalary___sw"
  }, {
    path: "/sw/settings",
    component: _5ae349d9,
    name: "settings___sw"
  }, {
    path: "/sw/Signup",
    component: _810d4ec4,
    name: "Signup___sw"
  }, {
    path: "/sw/statistics",
    component: _2ca2afee,
    name: "statistics___sw"
  }, {
    path: "/sw/uppaidsalary",
    component: _6f41f3cb,
    name: "uppaidsalary___sw"
  }, {
    path: "/sw/user",
    component: _0fdb8a31,
    name: "user___sw"
  }, {
    path: "/sw/settings/change-password",
    component: _7c8dc142,
    name: "settings-change-password___sw"
  }, {
    path: "/sw/settings/forgetPassword",
    component: _29afb09e,
    name: "settings-forgetPassword___sw"
  }, {
    path: "/sw/settings/invoice-settings",
    component: _d643f5e8,
    name: "settings-invoice-settings___sw"
  }, {
    path: "/sw/settings/personal-settings",
    component: _0cea4497,
    name: "settings-personal-settings___sw"
  }, {
    path: "/sw/invoices/draft/:id?",
    component: _7273a3f6,
    name: "invoices-draft-id___sw"
  }, {
    path: "/sw/invoices/overdue/:id?",
    component: _0c35de34,
    name: "invoices-overdue-id___sw"
  }, {
    path: "/sw/invoices/paid/:id?",
    component: _49d37152,
    name: "invoices-paid-id___sw"
  }, {
    path: "/sw/invoices/published/:id?",
    component: _bafedb50,
    name: "invoices-published-id___sw"
  }, {
    path: "/invoices/draft/:id?",
    component: _7273a3f6,
    name: "invoices-draft-id___en"
  }, {
    path: "/invoices/overdue/:id?",
    component: _0c35de34,
    name: "invoices-overdue-id___en"
  }, {
    path: "/invoices/paid/:id?",
    component: _49d37152,
    name: "invoices-paid-id___en"
  }, {
    path: "/invoices/published/:id?",
    component: _bafedb50,
    name: "invoices-published-id___en"
  }, {
    path: "/sw/articles/:id",
    component: _0dec15a7,
    name: "articles-id___sw"
  }, {
    path: "/sw/customer/:id",
    component: _1fa3a5b4,
    name: "customer-id___sw"
  }, {
    path: "/articles/:id",
    component: _0dec15a7,
    name: "articles-id___en"
  }, {
    path: "/customer/:id",
    component: _1fa3a5b4,
    name: "customer-id___en"
  }, {
    path: "/",
    component: _bcd6a848,
    name: "index___en"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
