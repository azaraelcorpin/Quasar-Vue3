<template>
<div id="app-container">
<div class="header">
  <div class="logo">
</div>
<div class="login">
  
<button class="login-btn" @click="logout()" id="">Logout</button>
</div>

</div>

<header>
    <h1>Faculty Profile</h1>
  </header>
   <section class="container">

  
 <div class="profile">


 <!-- <button @click="goBack" class="mb-4 text-blue-600 underline">
        ← Back to Directory
      </button> -->

 <div class="profile-card">

  
    <div class="profile-left">
 
     <transition name="fade">
          <img  
            :src="selectedFaculty.pic"   
            @error="onImageError"
            alt="Faculty Photo"
            class="w-40 h-40 rounded-lg object-cover profile-photo" />
        </transition>
      <div class="contact-info">
       <h3 class="text-weight-bold">Department</h3>
          <p>{{ toTitleCase(selectedFaculty.deptname) }}</p>
          <h3 class="text-weight-bold">College</h3>
  <p>{{ toTitleCase(selectedFaculty.collname) }}</p>

  <br/>

       <h3 class="text-weight-bold">Contact Information</h3>
        
       
        <p class="email">📧 {{ selectedFaculty.email_address }}</p>
        
            <p>            
              📞 {{ selectedFaculty.phone }}
                <q-btn
                icon="edit"
                size="sm"
                round
                dense
                flat
                color="primary"
                @click="showdialog = true; field='Phone'; message = selectedFaculty.phone"
              />                
            </p>
            <p>
              🔗 <a :href="selectedFaculty.linked_in" class="text-blue-600 underline" target="_blank">Linked In</a>
              <q-btn
                icon="edit"
                size="sm"
                round
                dense
                flat
                color="primary"
                @click="showdialog = true; field='Linked In'; message = selectedFaculty.linked_in"
              />   
            </p>

            <p>
              🔗 <a :href="selectedFaculty.google_scholar" class="text-blue-600 underline" target="_blank">Google Scholar</a>
                            <q-btn
                icon="edit"
                size="sm"
                round
                dense
                flat
                color="primary"
                @click="showdialog = true; field='Google Scholar'; message = selectedFaculty.google_scholar"
              />   
            </p>
      </div>
     </div>

      <div class="profile-right">
      <h1 class="fname text-h5 text-weight-bold">{{ toTitleCase(selectedFaculty.facname) }}</h1>
        <h2 class="text-subtitle1 text-weight-bold">{{toTitleCase(selectedFaculty.currentrank)  }}</h2>

       <!-- <p class="mt-4 text-gray-700">{{ selectedFaculty.email }}</p> -->
       <h3 class="text-weight-bold">Specializations 
        <q-btn
          icon="edit"
          size="sm"
          round
          dense
          flat
          color="primary"
          @click="showdialog = true; field='Specialization'; message = (String(selectedFaculty.specializations)||'').split(';')
                          .map(item => item.trim())
                          .filter(Boolean)
                          .join(';\n\n')"
        />
      </h3>
  

  <q-dialog v-model="showdialog" persistent>
      <q-card  style="overflow-x: hidden; word-break: break-word; width: 50%; padding-inline: 20px;">
        <q-card-section>
          <div class="text-h6">Update {{ field }}</div>
        </q-card-section>

        <q-card-section >
          <q-input
            v-model="message"
            type="textarea"
            autogrow
            autofocus
            :label="['Phone', 'Linked In', 'Google Scholar'].includes(field)
                    ? field+(field==='Phone'?'':'   (example: https://www.example.com) for links')
                    : 'Separated with semicolon (;) e.g. ' + field + '1; '+ field +'2'"
          />
          
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Save" color="primary" @click="handlesFacultyUpdate(field,String(message))" />
        </q-card-actions>
      </q-card>
    </q-dialog>

<div class="span-container" v-if="hasColon(selectedFaculty.specializations)">
 
        <div
          v-for="(item, i) in parsedSpecializations(selectedFaculty.specializations)"
          :key="i"
          class="spec-line"
        >
          <strong>{{ item.key }}:</strong> {{ toTitleCase(item.value) }}
        </div>
      </div>

      
      <div class="span-container" v-else-if="selectedFaculty.specializations">
         <span
              v-for="(spec, i) in getSpecializations(selectedFaculty.specializations)"
              :key="i"
          
            >
            {{toTitleCase(spec)}}
           </span>
      </div>
 
      <div v-else>
        No specializations listed.
      </div>




            
           <h3 class="text-weight-bold">Education
                  <q-btn
                icon="edit"
                size="sm"
                round
                dense
                flat
                color="primary"
                @click="showdialog = true; field='Education'; message = (String(selectedFaculty.education)||'').split(';')
                          .map(item => item.trim())
                          .filter(Boolean)
                          .join(';\n\n')"
              />
           </h3>
            <div class="span-container">
           <span
              v-for="(spec, i) in getSpecializations(selectedFaculty.education)"
              :key="i"
          
            >
            {{spec}}
           </span>
           </div>


             <h3 class="text-weight-bold">Research Interests
                        <q-btn
                          icon="edit"
                          size="sm"
                          round
                          dense
                          flat
                          color="primary"
                          @click="showdialog = true; field='Research Interest'; message = (String(selectedFaculty.research_interest)||'').split(';')
                          .map(item => item.trim())
                          .filter(Boolean)
                          .join(';\n\n')"
                        />              
             </h3>
              <div class="span-container">
           <span
              v-for="(spec, i) in getResearchinterest(selectedFaculty.research_interest)"
              :key="i"
          
            >
            {{spec}}
           </span>
           </div>

          <h3 class="text-weight-bold">Research
                              <q-btn
                          icon="edit"
                          size="sm"
                          round
                          dense
                          flat
                          color="primary"
                          @click="showdialog = true; field='Research'; message = (String(selectedFaculty.research)||'').split(';')
                          .map(item => item.trim())
                          .filter(Boolean)
                          .join(';\n\n')"
                        />
          </h3>
              <div class="span-container">
           <span
              v-for="(spec, i) in getResearchinterest(selectedFaculty.research)"
              :key="i"
          
            >
            {{spec}}
           </span>
           </div>


   






            <h3 class="text-weight-bold">Extensions
                        <q-btn
                          icon="edit"
                          size="sm"
                          round
                          dense
                          flat
                          color="primary"
                          @click="showdialog = true; field='Extensions'; message = (String(selectedFaculty.extensions)||'').split(';')
                          .map(item => item.trim())
                          .filter(Boolean)
                          .join(';\n\n')||''"
                        />                   
            </h3>
              <div class="span-container">
           <span
              v-for="(spec, i) in getResearchinterest(selectedFaculty.extensions)"
              :key="i"
          
            >
            {{spec}}
           </span>
           </div>


              <h3 class="text-weight-bold">Publications
                        <q-btn
                          icon="edit"
                          size="sm"
                          round
                          dense
                          flat
                          color="primary"
                          @click="showdialog = true; field='Publication'; message = (String(selectedFaculty.publication)||'').split(';')
                          .map(item => item.trim())
                          .filter(Boolean)
                          .join(';\n\n')"
                        />                            
              </h3>
               <div class="span-container">
           <span
              v-for="(spec, i) in getSpecializations(selectedFaculty.publication)"
              :key="i"
          
            >
            {{spec}}
           </span>
           </div>
        
              <h3 class="text-weight-bold">Affiliations
                        <q-btn
                          icon="edit"
                          size="sm"
                          round
                          dense
                          flat
                          color="primary"
                          @click="showdialog = true; field='Affiliation'; message = (String(selectedFaculty.affiliation)||'').split(';')
                          .map(item => item.trim())
                          .filter(Boolean)
                          .join(';\n\n')"
                        />                         
              </h3>
               <div class="span-container">
           <span
              v-for="(spec, i) in getSpecializations(selectedFaculty.affiliation)"
              :key="i"
          
            >
            {{spec}}
           </span>
           </div>
      </div>
 </div>
 </div>
 
    </section>
   </div>
 <footer class="app-footer">
      <p>&copy; 2025 Mindanao State University General Santos. All rights reserved.</p>
    </footer>
</template>

<script>
import { defineComponent } from 'vue'
import { decodeCredential } from 'vue3-google-login';
import api from "src/API/api";
import { useCookies } from "vue3-cookies";
import { useQuasar } from 'quasar';
import myDialog from 'src/plugins/myDialog';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'facultyProfile',
  mounted() {
    // this.onLogin(); // ← call it here
    this.$q.loading.show({
      message: 'Loading Profile...',
      spinnerSize: 50,
      spinnerColor: 'primary',
      backgroundColor: 'white',
      messageColor: 'primary'
    });

    if(this.cookies.isKey('_UID_')) {
      this.SID = JSON.parse(JSON.stringify(this.cookies.get('_UID_')));
      console.log('SID', this.SID.userEmail);

      this.onLogin(this.SID.userEmail);
          setTimeout(() => {
          this.$q.loading.hide()
        }, 3000)
    } else {
          setTimeout(() => {
          this.$q.loading.hide()
        }, 3000)
        this.$router.push({ name: 'facultyDirectory' });
    }
  },
  setup() {
    const { cookies } = useCookies();
    const $q = useQuasar();
    const router = useRouter();
    return {
      cookies,
      
    }
  },
  methods: {
    async onLogin(userEmail) {
      const res = await api.getAllFaculty()
      if(res.error) {
        this.cookies.remove('_UID_');
        this.SID = {};        
        myDialog.negative($q, "Error", res.error);
        this.$router.push({ name: 'facultyDirectory' });
        return;
      }
      let facultyList = res.FacultyList??[]
      console.log('facultyList', facultyList);
      let faculty = facultyList.find(faculty => faculty.email_address === userEmail);
      if (faculty) {
        this.selectedFaculty = {
          faculty_id: faculty.id,
          pic: faculty.pic || 'images/default.png',
          facname: faculty.facname,
          currentrank: faculty.currentrank,
          email: faculty.email_address,
          deptname: faculty.deptname,
          collname: faculty.collname,
          email_address: faculty.email_address,
          phone: faculty.phone,
          linkedin: faculty.linkedin,
          google_scholar: faculty.google_scholar,
          specializations: faculty.specializations || '',
          education: faculty.education || [],
          research_interest: faculty.research_interest || [],
          research: faculty.research || [],
          extensions: faculty.extensions || [],
          publication: faculty.publication || [],
          affiliation: faculty.affiliation || []
        };
      } else {
        console.error('Faculty not found');
      }
    },
    async handlesFacultyUpdate(_field, _data) {
      this.showdialog = false;
      // let resp = await api.updateFacultyProfile(this.SID, this.selectedFaculty);
      try {
        await myDialog.confirm(this.$q, "Update Confirmation", `Are you sure you want to update your ${_field}?`)
        this.selectedFaculty[_field.toLowerCase().replace(' ', '_')] = _data;
        this.$q.loading.show({  // Show loading dialog
            message: 'Updating Profile...',
            spinnerSize: 50,
            spinnerColor: 'primary',
            backgroundColor: 'white',
            messageColor: 'primary'
          });
        let resp = await api.updateFacultyProfile(_field.toLowerCase().replace(' ', '_'), _data.replace(/\n/g, ' '), this.selectedFaculty.faculty_id);
        console.log('resp', resp);
        if (resp.statusCode === "200")       
          myDialog.positive(this.$q, "Update Successful", `You have successfully updated your ${_field}.`);
        else
          // throw new Error('Failed to update profile');
        myDialog.negative(this.$q, "Update Failed", `Failed to update your ${_field}. Please try again later.`);
      } catch (error) {
        this.$q.loading.hide(); // Hide loading dialog
        return
      }
      this.$q.loading.hide(); // Hide loading dialog
    },
    logout() {
      this.cookies.remove('_UID_');
      this.SID = {};
      myDialog.positive(this.$q, "Logged Out", "You have successfully logged out.");
      console.log('Logged out');
        this.$router.push({ name: 'facultyDirectory' });
    },
    toTitleCase (str) {
        return str
          .split(' ')  
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  
          .join(' '); 
      },
    onImageError(event) {
      event.target.src = 'images/default.png' // Default image URL
    },
    hasColon(str) {
      return str.includes(':');
    },
    getSpecializations(s) {
      return String(s || '').split(';').map(x => x.trim()).filter(Boolean) || []
    },
    getResearchinterest (s) {
      return String(s || '').split(';').map(x => x.trim()).filter(Boolean) || []
    },
    parsedSpecializations(s) {
      if (!specString || typeof specString !== 'string') return []
        return specString
          .split(';')
          .map(pair => pair.split(':'))
          .filter(parts => parts.length === 2)
          .map(([key, value]) => ({
            key: key.trim(),
            value: value.trim()
          }))
    },
  },
  data() {
    return {
      SID:{},
      // Data properties go here
      selectedFaculty: {
        pic: '',
        facname: '',
        currentrank: '',
        email: '',
        deptname: '',
        collname: '',
        email_address: '',
        phone: '',
        linked_in: '',
        google_scholar: '',
        specializations: '',
        education:'',
        research_interest: '',
        research: '',
        extensions: '',
        publication: '',
        affiliation: ''
      },
      showdialog: false,
      message: '',
      field: '',
    }
  }
});

</script>
<!-- <style>

  .bg {
    width: 70%;
    height: 140px;
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
</style> -->
<style scoped src="./faculty-profile.css"></style>
