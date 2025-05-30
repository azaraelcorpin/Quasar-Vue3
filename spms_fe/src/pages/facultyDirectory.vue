<template>
  <q-layout view="lHh Lpr lFf">
    <div class="q-pa-md flex flex-center">
      <div class="top">
        <q-avatar square class="q-pl-xl">
              <img src="~assets/MSU_Gensan_logo.png">
        </q-avatar>
      </div>
      <div class="q-pa bg">
        <div class="q-pa text">Faculty Directory</div>
      </div>
      <div class="q-pa-md" style="width: 70%; background-color: white;  box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <div class="text-h4 text-center q-mb-md">Faculty Directory</div>
        <q-table
          class="q-pa-md"
        >
        </q-table>
        
      </div>
  </div>
  <q-footer class="q-pa-md flex flex-center">
    © 2025 Mindanao State University General Santos. All rights reserved. 
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'facultyDirectory'
})
</script>
<style>
  .bg {
    width: 70%;
    height: 150px;
    background-image:url('https://facultydirectory.msugensan.edu.ph/assets/msuheader-DC9LfvgY.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: white;
    position: relative;
  }
  .text {
    position: absolute;
  bottom: 0;
  left: 0;
  color: yellow;
  font-size: 50px;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 10px;
}
.top{
  width: 70%;
  margin-top: 30px;
}
</style>
