
const routes = [
  // {
  //   path: '/',
  //   name:'home',
  //   component: () => import('pages/IndexPage.vue'),
  //   meta:{
  //     title:'Home',
  //     roles:[]
  //   },
  //   icon:'home',
  //   visible:false,
  // },
  {
    path: '/',
    name:'facultyDirectory',
    component: () => import('src/pages/facultyDirectory.vue'),
    meta:{
      title:'Faculty Directory',
      roles:[]
    },
    icon:'user',
    visible:true,
  },
  {
    path: '/facultyProfile',
    name:'facultyProfile',
    component: () => import('src/pages/facultyProfile.vue'),
    meta:{
      title:'Faculty Profile',
      roles:[]
    },
    icon:'user',
    visible:true,
  },
  {
    path: '/dashboard',
    name:'dashboard',
    component: () => import('pages/TestPage.vue'),
    meta:{
      title:'Dashboard',
      roles:[]
    },
    icon:'dashboard',
    visible:true,
  }
]

export default routes

/**
 * for icons sets
 *  https://material.io/icons/
 */
