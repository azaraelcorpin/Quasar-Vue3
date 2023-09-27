
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
              window.location.reload();
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
        Authorization:'Bearer '+ encryptedData
      } 
    }
  },


  ///// start leave type
  async test(userEmail) {
    var url = api_url+'/user/all'
    const config = await this.getAuthorization(userEmail);
    const body = { }
    try {      
      const response = await axios.post(url, body, config);
      if (response && response.data && response.status == 200) {
        return response.data;
      } else if (response && response.data && response.data.message) {
        return { error: response.data.message };
      } else {
        return { error: "Sorry. Error on checking account." };
      }
    } catch (error) {
      console.log(error);
      return { error: error.response }
    }
  },

}
