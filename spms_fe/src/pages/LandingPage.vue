<template>
  <!-- <div style="color:white;display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; position: relative;" class="bg"> -->
    <div class="fullscreen bg text-white text-center q-pa-md flex flex-center">
      <q-inner-loading :showing="loading"
        label="Please wait..."
        label-class="text-black"
        label-style="font-size: 1.1em"
        color="black"
       style="z-index: 1000;" >
      </q-inner-loading>
    <div style=" align-items: center; justify-content: center;position: absolute; top: 20px; font-size: 48px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; color: black;">
      Mindanao State University</div>
      <div  style="position: absolute;margin-bottom: 30%;  font-size: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; color: black;">
      Strategic Performance Monitoring System
    </div>
    <GoogleLogin clientId="247346265934-ksi885k87vtrcqh7tvmcgeca9fvqr0fd.apps.googleusercontent.com" :callback="callback"/>
  </div>
</template>


<script>
import { GoogleLogin } from 'vue3-google-login';
import { decodeCredential } from 'vue3-google-login';
import { useRouter } from 'vue-router'
import { useCookies } from "vue3-cookies";
import { useQuasar } from 'quasar'
import api from "src/API/api";
import { ref } from 'vue';
import myDialog from 'src/plugins/myDialog';



export default{
  name:'LandingPage',
  components:{
    GoogleLogin
  },
  setup(){
          const loading = ref(false);
          const $q = useQuasar()
          const { cookies } = useCookies();
          const router = useRouter();
          const callback = async (response) => {
            // This callback will be triggered when the user selects or login to
            // his Google account from the popup
            loading.value=true;
            const userData = decodeCredential(response.credential)
            let SID = {};
            SID.userEmail = userData.email;
            SID.name = userData.name;
            SID.picture = userData.picture;    
            console.log(!SID.userEmail.includes('@msugensan.edu.ph'))
            if(!SID.userEmail.includes('@msugensan.edu.ph'))
              {
                myDialog.negative($q,'Unauthorized','Account Not Found')
                loading.value=false;
              }
              else{
                try {                  
                  let response = await api.generateSessionId(SID);                  
                  if(response.error)
                    throw new Error(response.error.message);
                  let sid=response.sessionId;
                  SID.sid=sid
                  cookies.set('_UID_',JSON.stringify(SID),'1d');      
                  router.push({ path: 'dashboard'})
                  loading.value=false;
                } catch (Error) {
                  loading.value=false;
                  myDialog.negative($q,'Error',Error.message)

                }
              }
          };
          
    return{
        callback,
        router,
        cookies ,
        loading
    }
  },
  mounted(){
    if(this.cookies.isKey('_UID_')){
      this.router.push({name:'dashboard'})
    }
  }
}

</script>

<style>
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( '../assets/bgt.png') no-repeat center center;
    background-size: cover;
  }
</style>