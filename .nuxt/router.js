import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _791accb8 = () => interopDefault(import('..\\client\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _560b475e = () => interopDefault(import('..\\client\\pages\\dev\\index.vue' /* webpackChunkName: "pages/dev/index" */))
const _7207a764 = () => interopDefault(import('..\\client\\pages\\dev\\index\\index.vue' /* webpackChunkName: "pages/dev/index/index" */))
const _7b917006 = () => interopDefault(import('..\\client\\pages\\dev\\index\\auth.vue' /* webpackChunkName: "pages/dev/index/auth" */))
const _24ebd110 = () => interopDefault(import('..\\client\\pages\\dev\\index\\endpoints.vue' /* webpackChunkName: "pages/dev/index/endpoints" */))
const _ec63a508 = () => interopDefault(import('..\\client\\pages\\dev\\index\\example.vue' /* webpackChunkName: "pages/dev/index/example" */))
const _54bfde89 = () => interopDefault(import('..\\client\\pages\\dev\\index\\files.vue' /* webpackChunkName: "pages/dev/index/files" */))
const _26348db5 = () => interopDefault(import('..\\client\\pages\\dev\\index\\nav.vue' /* webpackChunkName: "pages/dev/index/nav" */))
const _b3aa5e6e = () => interopDefault(import('..\\client\\pages\\admin\\files.vue' /* webpackChunkName: "pages/admin/files" */))
const _f793a87e = () => interopDefault(import('..\\client\\pages\\admin\\settings.vue' /* webpackChunkName: "pages/admin/settings" */))
const _ceaec4be = () => interopDefault(import('..\\client\\pages\\admin\\settings\\index.vue' /* webpackChunkName: "pages/admin/settings/index" */))
const _472d4b6b = () => interopDefault(import('..\\client\\pages\\admin\\settings\\email.vue' /* webpackChunkName: "pages/admin/settings/email" */))
const _026cfa68 = () => interopDefault(import('..\\client\\pages\\admin\\settings\\user.vue' /* webpackChunkName: "pages/admin/settings/user" */))
const _26deb768 = () => interopDefault(import('..\\client\\pages\\admin\\users\\index.vue' /* webpackChunkName: "pages/admin/users/index" */))
const _d8085380 = () => interopDefault(import('..\\client\\pages\\admin\\map\\test.vue' /* webpackChunkName: "pages/admin/map/test" */))
const _6a0373d0 = () => interopDefault(import('..\\client\\pages\\admin\\users\\_id.vue' /* webpackChunkName: "pages/admin/users/_id" */))
const _f5bdedbe = () => interopDefault(import('..\\client\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _791accb8,
    name: "admin"
  }, {
    path: "/dev",
    component: _560b475e,
    children: [{
      path: "",
      component: _7207a764,
      name: "dev-index"
    }, {
      path: "auth",
      component: _7b917006,
      name: "dev-index-auth"
    }, {
      path: "endpoints",
      component: _24ebd110,
      name: "dev-index-endpoints"
    }, {
      path: "example",
      component: _ec63a508,
      name: "dev-index-example"
    }, {
      path: "files",
      component: _54bfde89,
      name: "dev-index-files"
    }, {
      path: "nav",
      component: _26348db5,
      name: "dev-index-nav"
    }]
  }, {
    path: "/admin/files",
    component: _b3aa5e6e,
    name: "admin-files"
  }, {
    path: "/admin/settings",
    component: _f793a87e,
    children: [{
      path: "",
      component: _ceaec4be,
      name: "admin-settings"
    }, {
      path: "email",
      component: _472d4b6b,
      name: "admin-settings-email"
    }, {
      path: "user",
      component: _026cfa68,
      name: "admin-settings-user"
    }]
  }, {
    path: "/admin/users",
    component: _26deb768,
    name: "admin-users"
  }, {
    path: "/admin/map/test",
    component: _d8085380,
    name: "admin-map-test"
  }, {
    path: "/admin/users/:id",
    component: _6a0373d0,
    name: "admin-users-id"
  }, {
    path: "/",
    component: _f5bdedbe,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
