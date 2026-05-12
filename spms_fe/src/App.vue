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

            <button class="login-btn" @click="onLogin()" id="g_id_signin">Login with Institutional Account</button>
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

onMounted(() => {
  onLogin();
});

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
      let SID = {};
      SID.userEmail = userData.email;
      // SID.userEmail = 'andrew.ruiz@msugensan.edu.ph'   // For testing purposes, hardcoding the email
      SID.name = userData.name;
      SID.picture = userData.picture;
      let faculty = facultyList.value.find(faculty => faculty.email_address === SID.userEmail);
      SID.facultyId = faculty ? faculty.id : null;

      if (!SID.facultyId) {
        myDialog.negative($q, "Log In Failed", "Account not found in the system. Please contact the administrator.");
        return;
      }
      console.log('Encoded JWT ID token: ' , SID);
      let resp = await api.generateSessionId(SID);
                  console.log('reso',resp)
      if(resp.error){
        myDialog.negative($q, "Log In Failed", "Account not found in the system. Please contact the administrator.");
        cookies.remove('_UID_');
        return;
      } else {
        console.log('Session ID generated:', resp.session);
        cookies.set('_UID_', JSON.stringify(SID), '1d');
      }      router.push({ name: 'facultyProfile' });
    }
</script>
