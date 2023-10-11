
const routes = [
  {
    path: '/',
    name:'home',
    component: () => import('pages/IndexPage.vue'),
    meta:{
      title:'Home',
      roles:[]
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
      roles:[]
    },
    icon:'dashboard',
    visible:true,
  },
  {
    path: '/myPCR',
    component: () => import('pages/TestPages.vue'),
    meta:{
      title:'My PCR',
      roles:['INDIVIDUAL']
    },
    icon:'person',
    visible:true,
  },
  {
    path: '/myOffice',
    component: () => import('pages/TestPages.vue'),
    meta:{
      title:'My Office',
      roles:['OFFICE_HEAD','OFFICE_STAFF']
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
  {
    path: '/PMT',
    component: () => import('pages/sysAdmin/SysAdmin.vue'),
    meta:{
      title:'PMT',
      roles:['PMT']
    },
    icon:'admin_panel_settings',
    visible:true,
    children:[
      {
        path: '/pcr_sched',
        component: () => import('pages/PMT/ScheduleMgt.vue'),
        meta:{
          title:'PCR Schedule',
        },
        icon:'schedule',
        visible:true,
      },
      {
        path: '/mfo',
        component: () => import('pages/sysAdmin/UserMgt.vue'),
        meta:{
          title:'MFO',
        },
        icon:'checklist',
        visible:true,
      },
      {
        path: '/commitments',
        component: () => import('pages/sysAdmin/UserMgt.vue'),
        meta:{
          title:'Commitments',
        },
        icon:'task',
        visible:true,
      },
    ],
  },
  {
    path: '/HR',
    component: () => import('pages/sysAdmin/SysAdmin.vue'),
    meta:{
      title:'Human Resource',
      roles:['HR']
    },
    icon:'groups',
    visible:true,
    children:[
      {
        path: '/offices',
        component: () => import('pages/HR/Offices.vue'),
        meta:{
          title:'Office',
        },
        icon:'holiday_village',
        visible:true,
      },
      {
        path: '/employees',
        component: () => import('pages/sysAdmin/UserMgt.vue'),
        meta:{
          title:'Employees',
        },
        icon:'supervisor_account',
        visible:true,
      },
    ],
  },  
  {
    path: '/sysadm',
    component: () => import('pages/sysAdmin/SysAdmin.vue'),
    meta:{
      title:'System Admin',
      roles:['ADMIN']
    },
    icon:'settings',
    visible:true,
    children:[
      {
        path: '/user',
        component: () => import('pages/sysAdmin/UserMgt.vue'),
        meta:{
          title:'Users',
        },
        icon:'manage_accounts',
        visible:true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name:'catchAll',
    component: () => import('pages/ErrorNotFound.vue'),
    meta:{
      title:'Not Found',
    },
    icon:'error',
    visible:false,
  },
  {
    path: '/accessDenied',
    name:'accessDenied',
    component: () => import('pages/accessDenied.vue'),
    meta:{
      title:'Denied',
    },
    icon:'error',
    visible:false,
  },  
  {
    path: '/signIn',
    name:'signIn',
    component: () => import('pages/LandingPage.vue'),
    meta:{
      title:'Sign In',
    },
    visible:false,
  }
]

export default routes

/**
 * for icons sets
 *  https://material.io/icons/
 */
