<template>
  <!-- <router-view /> -->
  <div v-if="false">
      <main-layout>
          <router-view />
      </main-layout>
   </div>
   <faculty-directory v-else />
</template>

<script>
import { defineComponent,watch } from 'vue'
import MainLayout from './layouts/MainLayout.vue';
import facultyDirectory from './pages/facultyDirectory.vue';


export default defineComponent({
    name: 'App',
    components:{
      MainLayout,
      facultyDirectory
    },
})
</script>
