<template>
  <q-page class="q-pa-sm">
      <q-inner-loading :showing="loading" style="z-index: 1000;" >
        <q-spinner-gears size="90px" color="primary"/>
      </q-inner-loading>

        <!-- Test button -->
      <q-btn @click="loading=!loading" style="  position: fixed;right: 1%; z-index: 1000;">
        loading test
      </q-btn>
      <!-- test button -->

      <q-card class="pa-1">      

        <q-card-section class="container--fluid" style="height: 89vh;">
          <div class="text-h4">Employee Management </div>
          {{ UserType }}
        </q-card-section> 
        {{ $route.meta.roles }}
      </q-card>
  </q-page> 
  
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data(){
    return{
      loading:true,
      UserType:"dddd",
    }
  },
  methods:{
    getOfficeData(){

    },
    getEmployee(){
      
    }
  },
  mounted(){
    // alert(this.$route.params.id)

    const offices = JSON.parse(localStorage.getItem('officesAndRoles'));    
    let role = offices?offices.find(item=>(item.office_id+'' === this.$route.params.id && item.role === 'OFFICE_HEAD')):null;
    role = role??offices.find(item=>(item.office_id === this.$route.params.id && item.role === 'OFFICE_STAFF'))
    if(role)
      this.UserType = role.role
    

  }
})
</script>
<style>

</style>
