
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import { useCookies } from "vue3-cookies";
import axios from 'axios'

const { cookies } = useCookies();
const api_url = process.env.VUE_APP_SPMS_API_URL;
export default {
  async getAuthorization(_data){
    
   if(!_data){
    if(!cookies.get('_UID_')){
          cookies.remove('_UID_');
          localStorage.removeItem('routeParams');
          Swal.fire({
            title: 'The Session Timed Out',
            text: 'Please log in again',
            icon: 'error',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              return
            }
          });          
      return null;
    }
  }
     let key = process.env.VUE_APP_PCR_KEY;
    key = CryptoJS.enc.Utf8.parse(key); // replace with your own secret key
    let iv = CryptoJS.lib.WordArray.random(16); // generate a random 16-byte IV
    const jsonData = JSON.stringify( _data??(cookies.get('_UID_')));
    const encryptedData = CryptoJS.AES.encrypt(jsonData, key,  {iv} ).toString();    
    return {
      headers:{
        'X-IV': iv.toString(CryptoJS.enc.Base64),
        Authorization:'Bearer '+ encryptedData,
      } 
    }
  },

  validateResponse(error){
    let response = error.response
    console.log('res',response.data.message)
    if(response){
      if(response.data && response.data.statusCode === '401'){    
        localStorage.removeItem('routeParams');
        Swal.fire({
          title: 'Unauthorized',
          text: response.data.message +' Please log in again',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick:false,
          timer:5000,
        })
        setTimeout(function() {
          cookies.remove('_UID_');
        }, 1000); // 5000 milliseconds = 5 seconds         
      }
    }else{
      Swal.fire({
        title: error.name,
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick:false,
      })
    }
    
  },


  ///// test 
  async test(userEmail) {
    var url = api_url+'/user/all'
    const config = await this.getAuthorization(userEmail);
    const body = { }
    try {      
      const response = await axios.post(url, body, config);      
      if (response && response.data && response.status == 200) {
        return response.data;
      } else{
        console.log(response);
        return {error:response}
      }
    } catch (error) {
      console.log(error.response);
      this.validateResponse(error.response)
      return { error: error.response }
    }
  },

    ///// generate session Id
    async generateSessionId(userEmail) {
      var url = api_url+'/user/getSessionId'
      const config = await this.getAuthorization(userEmail);
      const body = { }
      try {      
        const response = await axios.post(url, body, config);
        if (response && response.data && response.status == 200) {
          return response.data;
        } else{
          console.log('generatedSessionId Error');
          return {error:response}
        }
      } catch (error) {
        console.log('error',error.message);
        return { error:error }
      }
    },  

        ///// new User
    async updateFacultyProfile(_field, _data,faculty_id) {
      var url = api_url+'/updateFacultyProfile'
      const config = await this.getAuthorization();
      const body = {
        field:_field,
        data:_data,
        faculty_id:faculty_id
      }
      try {      
        const response = await axios.post(url, body, config);
        if (response && response.data && response.status == 200) {
          return response.data;
        } else{
          console.log('Update Faculty Error');
          return {error:response}
        }
      } catch (error) {
        console.log(error.response);
        return { error: error.response }
      }
    },  


    ///// getfacultylist
    async getAllFaculty() { 
      var url = api_url+'/getFacultyList'
      // const config = await this.getAuthorization();
      const body = { }
      try {      
        const response = await axios.post(url, body);      
        if (response && response.data && response.status == 200) {
          return response.data;
        } else{
          console.log(response);
          return {error:response}
        }
      } catch (error) {
        console.log(error);
          if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
            // Server is likely offline or unreachable
            console.error('🛑 Server is down or not reachable.');
            // You can also show a user-friendly message:
            return { error: 'Server is down or not reachable.' };
          } else if (error.response) {
            // Server responded but with an error (4xx, 5xx)
                console.error('❌ Server error:', error.response.status);
                console.error('📝 Details:', error.response.data);
            return { error: error.response };
          } else {
            // Unknown error
            console.error('⚠️ Unexpected error:', error.message);
            return { error: 'An unexpected error occurred: ' + error.message };
          }
      }
    },    

    ///// getAllOffice 
    async getAllOffice() {
      var url = api_url+'/office/all'
      const config = await this.getAuthorization();
      const body = { }
      try {      
        const response = await axios.post(url, body, config);      
        if (response && response.data && response.status == 200) {
          return response.data;
        } else{
          console.log(response);
          return {error:response}
        }
      } catch (error) {
        console.log(error);
        this.validateResponse(error)
        return { error: error.response }??error
      }
    },     

}
