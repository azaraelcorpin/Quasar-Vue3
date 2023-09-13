
const routes = [
  {
    path: '/',
    component: () => import('pages/IndexPage.vue'),
    meta:{
      title:'Home',
    },
    icon:'home',
    visible:false,
  },
  {
    path: '/dashboard',
    name:'dashboard',
    component: () => import('pages/TestPage.vue'),
    meta:{
      title:'Dashboard',
    },
    icon:'dashboard',
    visible:true,
  },
  {
    path: '/myPCR',
    component: () => import('pages/TestPages.vue'),
    meta:{
      title:'My PCR',
    },
    icon:'person',
    visible:true,
  },
  {
    path: '/office',
    component: () => import('pages/TestPages.vue'),
    meta:{
      title:'Office',
    },
    icon:'domain',
    visible:true,
    children:[
      {
        path: '/members',
        component: () => import('pages/TestPage.vue'),
        meta:{
          title:'Members',
        },
        icon:'groups',
        visible:true,
      },
      {
        path: '/preassessments',
        component: () => import('pages/TestPage.vue'),
        meta:{
          title:'Pre Assessments',
        },
        icon:'subject',
        visible:true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta:{
      title:'tests',
    },
    icon:'error',
    visible:false,
  }
]

export default routes

/**
 * for icons sets
 *  https://material.io/icons/
 */
