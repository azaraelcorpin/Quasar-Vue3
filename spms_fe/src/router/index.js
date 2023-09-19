import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useCookies } from "vue3-cookies";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const { cookies } = useCookies()
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    document.title = process.env.VUE_APP_NAME+'-'+to.meta.title;
    if(to.name === 'signIn' || to.name === 'catchAll' || cookies.isKey('_UID_'))
      next();
    else{
      document.title = process.env.VUE_APP_NAME+'-'+'Sign In';
      next({name:'signIn'})
    }
  })
  return Router
})
