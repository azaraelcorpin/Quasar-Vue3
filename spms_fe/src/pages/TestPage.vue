<template>
  <q-page class="flex flex-center" style="background-color: aquamarine;">
    Dashboard
    <q-btn @click="test()">TEST</q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import api from "src/API/api";

export default defineComponent({
  name: 'TestPage',
  methods:{
    async test(para){
      try {
        let response = await api.test();
        console.log('response',response)
      } catch (error) {
        console.log('error',error)
      }
    }
  }
})
</script>
