<template>
  <!-- <router-view /> -->
  <!-- <div v-if="toFaculty==0">
      <main-layout>
          <router-view />
      </main-layout>
   </div> -->
   <faculty-directory v-if="toFaculty==2" />
   <faculty-Profile v-else />
</template>

<script>
import { defineComponent,watch } from 'vue'
// import MainLayout from './layouts/MainLayout.vue';
import facultyDirectory from './pages/facultyDirectory.vue';
import facultyProfile from './pages/facultyProfile.vue';


export default defineComponent({
    name: 'App',
    components:{
      // MainLayout,
      facultyDirectory,
      facultyProfile
    },
    watch: {
    // Watch $route.path (reactive in Vue Router)
    '$route.path'(newPath) {
      if (newPath === '/facultyProfile') 
        this.toFaculty = 1
      else
        this.toFaculty = 2
      }
    
  },
    data() {
      return {
        toFaculty: 2
      }
    },
})
</script>
