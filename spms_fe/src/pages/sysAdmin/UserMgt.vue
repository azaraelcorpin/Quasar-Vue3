<template>
    <q-page class="q-pa-sm">
      <q-inner-loading :showing="loading" style="z-index: 1000;" >
        <q-spinner-gears size="90px" color="primary"/>
      </q-inner-loading>

        <!-- Test button -->
      <q-btn @click="loading=!loading" style="  position: fixed;right: 1%; z-index: 1000;">
        loading test
      </q-btn>
      <!-- test button -->

      <q-card class="pa-1">      

        <q-card-section class="container--fluid">
          <div class="text-h4">User Management</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="container--fluid">
          <q-btn push color="primary" @click="newUserDialog = !newUserDialog">New User</q-btn>
          <!-- new User dialog -->
          <q-dialog v-model="newUserDialog" persistent >
            <q-card style="width: 50%;" >   
              <q-form @submit="newUser" @reset="newUserReset">
                <q-page-container style="padding:10px;" >                
                  <div class="text-h5" style="margin: 5px;">New User</div> 
                  <q-input 
                    required 
                    label="Email" 
                    dense 
                    outlined 
                    class="q-pa-sm" 
                    color="primary" 
                    v-model="NEW_USER.email"
                    :rules="[rules.properEmail,rules.requiredField]"
                    >
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>   

                  <q-input 
                    label="Fullname" 
                    dense 
                    outlined 
                    class="q-pa-sm" 
                    color="primary" 
                    v-model="NEW_USER.userName"
                    :rules="[rules.requiredField,rules.notEmpty,rules.noSpaceStart]"
                    >
                    <template v-slot:prepend>
                      <q-icon name="person_outline" />
                    </template>
                  </q-input>  

                  <q-select 
                    outlined  
                    :options="['Admin','PMT','HR','Office Staff']" 
                    label="User Type" 
                    class="q-pa-sm" 
                    color="primary" 
                    v-model="NEW_USER.userType"
                    :rules="[rules.requiredField]"
                    >
                    <template v-slot:prepend>
                      <q-icon name="assignment_ind" />
                    </template>
                  </q-select>

                  <q-select 
                    outlined  
                    :options="offices" 
                    option-label="code"
                    label="Office" 
                    class="q-pa-sm" 
                    color="primary"  
                    v-model="NEW_USER.officeId"
                    :rules="[rules.requiredField]"
                    >
                    <template v-slot:prepend>
                      <q-icon name="assignment" />
                    </template>                
                  </q-select>

                  <div style="display: flex; justify-content: flex-end;">
                    <q-btn class="q-ma-md" color="primary" type="submit">Save</q-btn>
                    <q-btn class="q-ma-md" type="reset">Cancel</q-btn>
                  </div>

                </q-page-container>
              </q-form>           
            </q-card>
          </q-dialog>
          <!-- end dialog -->

          <!-- user list table  -->
          <!-- end list table  -->
        </q-card-section>
        <q-card-section  class="container--fluid text-center custom-container flex flex-center"> 
          content here
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script>
  import { defineComponent } from 'vue'  
  import api from "src/API/api";
  import dialog from "src/plugins/myDialog"
  import { useQuasar } from 'quasar'
  
  export default defineComponent({
    name: 'UserMgt',
    setup(){
      const $q = useQuasar();
    },
    methods:{
      async test(para){
        try {
          let response = await api.test();
          console.log('response',response)
        } catch (error) {
          console.log('error',error)
        }
      },

      async queryOffices(){
        try {
          this.loading = true;
          let response = await api.getAllOffice();
          console.log('getOffices', response.message)
          this.offices = response.OFFICES;
        } catch (error) {
          console.log('error',error)
        }
      },

      async newUser(){
        try {
          let response = await api.newUser(this.NEW_USER);
          console.log('newUser',response)          
          if(response.error){
            dialog.negative(this.$q,response.error.data.status,response.error.data.message)           
          }else{
            dialog.positive(this.$q,response.status,response.message).onOk(()=>{
              this.newUserReset();
            }) ;
          }
          
        } catch (error) {
          console.log('error',error)
        }
      },
      newUserReset(){
        this.NEW_USER={
              email:null,
              userName:null,
              userType:null,
              officeId:null,
            }
            this.newUserDialog = false;
      }
    },
    data(){
      return {
        loading:true,
        newUserDialog:false,
        rules: {
                noSpace: v => (!v?.includes(' ')) || "No space allowed.",
                notEmpty:(v) => (v && v.replaceAll(' ','').length > 0) ||  "Empty Value.",
                noSpaceStart:(v) => (v && v.charAt(0) != ' ') || "No space allowed at start",
                requiredField: v => !!v || "Required field.", 
                requiredSelection: v => !!v || "Required at least one selection",
                properEmail: v => !v || /^\w+([.-]?\w+)*@msugensan\.edu\.ph$/.test(v) ||  'E-mail must be valid. Ex. juandelacruz@msugensan.edu.ph',
                matchPassword: v => v === this.form.password || "Does not match new password.",
                mobileNumber: v => !v || /^(09)\d{9}$/.test(v) || 'Mobile number must be valid. Ex. starts with (09) followed by xxxxxxxxx, where x = numeric character only', 
                maxLength: (v) => (v && v.length <= 12) || "Max 12 characters",
                numbers: (v) => (!isNaN(v) && /^[0-9.]*$/.test(v)) || !v || "Must be positive numbers only",
                currency: v => (/^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/.test(v)) || (/^[1-9]\d*(((,\d{3}){2})?(\.\d{0,2})?)$/.test(v)) || (/^[0]\.\d{0,2}$/.test(v))|| v ==="0.00" || v ==="0"  || 'Currency value only',
                // float: (v) => ((!isNaN(this.StringToNumber(v)) && this.StringToNumber(v).indexOf('.') != -1) || (!isNaN(this.StringToNumber(v)) && /^[0-9]*$/.test(this.StringToNumber(v)))) || "Must be a number"
                ///^(09|\+639)\d{9}$/ <- if needed full philippine mobile number 
            },
            NEW_USER:{
              email:null,
              userName:null,
              userType:null,
              officeId:null,
            },
        offices:[],
      };
    },
    mounted(){
      this.queryOffices();
    }
  })
  </script>
  <style>
    .custom-container {
        height: 80vh;
      }
  </style>
  