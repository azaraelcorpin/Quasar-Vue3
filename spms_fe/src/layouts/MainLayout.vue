<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
      <q-toolbar style="background-color: #636060;">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div v-if="$q.screen.width >= 550" >Strategic Performance Management System</div>
          <div v-else >SPMS</div>
          
        </q-toolbar-title>

        <q-btn   padding="0" round >
          <q-avatar size="32px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">
          </q-avatar>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  v-close-popup
                ></q-btn>
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-footer reveal elevated style="background-color: #520608;">
        <q-toolbar class="justify-between">
          <div>MSU GenSan - ICTO</div>
          <div>SPMS v{{ $version}}</div>
        </q-toolbar>
        
      </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above

      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay

      :width="250"
      :breakpoint="500"
      bordered
      class="drawer-with-bg"
    >
     <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
      <q-list padding>
          <q-item v-ripple to="/">
            <q-avatar square>
              <img src="~assets/MSU_Gensan_logo.png">
            </q-avatar>
              <q-item-section style="margin-left: 5px; color: white;">
                <strong>MSU-GENSAN</strong>
              </q-item-section>
            </q-item>
            
            <div v-for="item in routes" :key="item.path" link>
              <div v-if="item.visible">
                <q-item v-if="!item.children" clickable v-ripple :to="item.path">
                  <q-item-section avatar>
                    <q-icon :name="item.icon" />
                  </q-item-section>

                  <q-item-section>
                    {{ item.meta.title }}
                  </q-item-section>
                </q-item>
              
                <div v-else>
                  <q-expansion-item  
                    :content-inset-level="0.3" 
                    expand-separator 
                    :icon="item.icon" 
                    :label="item.meta.title" 
                    :default-opened=false
                    :to="item.path"
                    expand-icon-class="text-white"
                    >
                      <div  v-for="child in item.children" :key="child.path" link>
                        <q-item v-if="child.visible" clickable v-ripple :to="child.path">
                          <q-item-section avatar>
                            <q-icon :name="child.icon" />
                          </q-item-section>

                          <q-item-section>
                            {{ child.meta.title }}
                          </q-item-section>
                        </q-item>
                      </div>
                </q-expansion-item>
                
              </div>
              </div>
            </div>
      </q-list>
    </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <Transition 
        name="fade-transform"
        mode="out-in"
      >
        <KeepAlive>
            <slot/>
        </KeepAlive>
      </Transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import routes from 'src/router/routes'


export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const miniState = ref(true)
    return {
      routes,
      leftDrawerOpen,
      miniState,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style>
.drawer-with-bg {
  background-image: url('../assets/bg.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
  /* Add any other styling you need */
}
.drawer-with-bg.active {
  color: #12e246; /* Bright blue font color for active elements */
}
</style>