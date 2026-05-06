<template>
  <q-layout view="hHh lpR fFf">

    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="col-6 col-sm-4 col-md-3 col-lg-2">
          <img src="./assets/logo.png" style="height: 40px;  margin-right: 10px; margin-left: 10px; margin-bottom: 10px;"  />
              <img
                src="./assets/bannerType.png"
                style="height: auto;"
              />
            </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Required -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-primary text-white text-center">
      <div class="q-pa-sm">
        &copy; 2026 MSU-Gensan. All rights reserved.
      </div>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>
