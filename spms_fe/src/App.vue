<template>
  <q-layout view="hHh lpR fFf">

    <!-- Header -->
    <q-header elevated class="text-white" style="background-color: #720455;">
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
                    <div class="login">

            <button v-if="!isLoggedIn" class="login-btn" @click="onLogin()" id="g_id_signin">Login with Institutional Account</button>
            <button v-if="isLoggedIn" class="login-btn" @click="onLogout()">Logout</button>
            </div>
      </q-toolbar>
    </q-header>

    <!-- Required -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="text-white text-center" style="background-color: #720455;">
      <div class="q-pa-sm">
        &copy; 2026 MSU-Gensan. All rights reserved.
      </div>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted, watch  } from 'vue'
import { decodeCredential } from 'vue3-google-login';
import { useCookies } from "vue3-cookies";
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const cookies = useCookies().cookies;
const $q = useQuasar();
const router = useRouter();


const isLoggedIn = ref(false);

onMounted(() => {
  onLogin();

  window.addEventListener('auth-change', onAuthChange)// Listen for auth changes to update login state from other components (like facultyDirectory.vue)
});
function onAuthChange(event) {
  const email = event.detail.email;
  isLoggedIn.value = !!email; // Set to true if email exists, false otherwise
}

function onLogin() {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: '247346265934-ksi885k87vtrcqh7tvmcgeca9fvqr0fd.apps.googleusercontent.com',
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("g_id_signin"),
          { theme: "outline", size: "small" } // customization attributes
        );

        // window.google.accounts.id.prompt(); // optional: for One Tap
      } else {
        console.error("Google Identity script not loaded.");
      }
    }

    async function handleCredentialResponse(response) {
      const userData = decodeCredential(response.credential);
      let email = userData.email;

      window.dispatchEvent(new CustomEvent('google-login-success', { detail: email }));

    }

function onLogout() {
  cookies.remove('_UID_');
  localStorage.removeItem('faculty');
  router.push('/'); // Redirect to home or login page after logout
  window.dispatchEvent(new CustomEvent('auth-change', { detail: { email: null } })) // Notify layout of logout
}
</script>
