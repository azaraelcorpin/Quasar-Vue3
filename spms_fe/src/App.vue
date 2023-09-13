<template>
  <!-- <router-view /> -->
  <div>{{ cookieValue }}
  <main-layout v-if="false">
      <router-view />
   </main-layout>
   <landing-page v-else />
   </div>
</template>

<script>
import { defineComponent,computed,watch } from 'vue'
import MainLayout from './layouts/MainLayout.vue';
import LandingPage from './pages/LandingPage.vue';
import  {useQuasar}  from 'quasar'
import { useCookies } from "vue3-cookies";

export default defineComponent({
    name: 'App',
    components:{
      MainLayout,
      LandingPage
    },
    setup() {

      const { cookies } = useCookies();
      const $q = useQuasar();
      const cookieValue = computed(() => {
          return cookies.get('_UID_') || 'Cookie not found';
          });
      return{
        cookieValue,
        cookies
      }
  }

})
</script>
