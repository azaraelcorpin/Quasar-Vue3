<template>
  <div style="color:white;display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; position: relative;" class="bg">
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



export default{
  name:'LandingPage',
  components:{
    GoogleLogin
  },
  setup(){
          const { cookies } = useCookies();
          const router = useRouter();
          const callback = (response) => {
            // This callback will be triggered when the user selects or login to
            // his Google account from the popup
            console.log("Handle the response", response)
            const userData = decodeCredential(response.credential)
            console.log("Handle the userData", userData)
            let SID = {};
            SID.userEmail = userData.email;
            SID.name = userData.name;
            SID.picture = userData.picture;           
            setUser(SID);           
          }
    return{
        callback,
        router,
        cookies ,
    }
  },
  methods:{
    setUser(uid){
      this.cookies.set('_UID_',JSON.stringify(uid),'1d')
      this.router.push({ path: 'dashboard'})
      
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