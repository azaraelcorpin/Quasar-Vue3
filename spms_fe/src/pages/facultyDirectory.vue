<template>
<div id="app-container">
<div class="header">
  <div class="logo">
</div>
<div class="login">
  
<button class="login-btn" @click="onLogin()" id="g_id_signin">Login</button>
</div>

</div>

<header>
    <h1>Faculty Directory</h1>
  </header>
   <section class="container">

  
 
 


 <div class="profile" v-if="selectedFaculty"  :key="selectedFaculty.id">


 <button @click="goBack" class="mb-4 text-blue-600 underline">
        ← Back to Directory
      </button>

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
            <p>📞 {{ selectedFaculty.phone }}</p>
            <p>
              🔗 <a :href="selectedFaculty.linkedin" class="text-blue-600 underline" target="_blank">LinkedIn</a>
            </p>

            <p>
              🔗 <a :href="selectedFaculty.google_scholar" class="text-blue-600 underline" target="_blank">Google Scholar</a>
            </p>
      </div>
     </div>

      <div class="profile-right">
      <h1 class="fname text-h5 text-weight-bold">{{ toTitleCase(selectedFaculty.facname) }}</h1>
        <h2 class="text-subtitle1 text-weight-bold">{{toTitleCase(selectedFaculty.currentrank)  }}</h2>

       <p class="mt-4 text-gray-700">{{ selectedFaculty.email }}</p>
       <h3 class="text-weight-bold">Specializations</h3>
  

  

<!-- <div class="span-container" v-if="hasColon(selectedFaculty.specializations)">
        <div
          v-for="(item, i) in parsedSpecializations(selectedFaculty.specializations)"
          :key="i"
          class="spec-line"
        >
          <strong>{{ item.key }}:</strong> {{ toTitleCase(item.value) }}
        </div>
      </div>

       -->
      <div class="span-container" v-if="selectedFaculty.specializations">
         <div
              v-for="(spec, i) in getSpecializations(selectedFaculty.specializations)"
              :key="i"
          
            >
            <!-- {{toTitleCase(spec)}} -->
             <span v-if="!hasColon(spec)">{{toTitleCase(spec)}}</span>
             <span v-else>
              <strong>{{toTitleCase(spec.split(':')[0]) }}:</strong> {{ toTitleCase(spec.split(':')[1]) }}
             </span>             
            </div>
      </div>
 
      <div v-else>
        No specializations listed.
      </div>




            
           <h3 class="text-weight-bold">Education</h3>
            <div class="span-container">
           <span
              v-for="(spec, i) in getSpecializations(selectedFaculty.education)"
              :key="i"
          
            >
            <!-- {{spec}} -->

             {{ (!hasColon(spec))?toTitleCase(spec):'' }}             
             <strong>{{  (hasColon(spec))?toTitleCase(spec.split(':')[0])+':':''}}</strong>{{  (hasColon(spec))?toTitleCase(spec.split(':')[1]):'' }}
           </span>
           </div>


             <h3 class="text-weight-bold">Research Interests</h3>
              <div class="span-container">
           <span
              v-for="(spec, i) in getResearchinterest(selectedFaculty.research_interest)"
              :key="i"
          
            >
            <!-- {{spec}} -->

             {{ (!hasColon(spec))?toTitleCase(spec):'' }}             
             <strong>{{  (hasColon(spec))?toTitleCase(spec.split(':')[0])+':':''}}</strong>{{  (hasColon(spec))?toTitleCase(spec.split(':')[1]):'' }}
           </span>
           </div>

 <h3 class="text-weight-bold">Research</h3>
              <div class="span-container">
           <span
              v-for="(spec, i) in getResearchinterest(selectedFaculty.research)"
              :key="i"
          
            >
            <!-- {{spec}} -->

             {{ (!hasColon(spec))?toTitleCase(spec):'' }}             
             <strong>{{  (hasColon(spec))?toTitleCase(spec.split(':')[0])+':':''}}</strong>{{  (hasColon(spec))?toTitleCase(spec.split(':')[1]):'' }}
           </span>
           </div>


   






            <h3 class="text-weight-bold">Extension</h3>
              <div class="span-container">
           <span
              v-for="(spec, i) in getResearchinterest(selectedFaculty.extensions)"
              :key="i"
          
            >
            <!-- {{spec}} -->

             {{ (!hasColon(spec))?toTitleCase(spec):'' }}             
             <strong>{{  (hasColon(spec))?toTitleCase(spec.split(':')[0])+':':''}}</strong>{{  (hasColon(spec))?toTitleCase(spec.split(':')[1]):'' }}
           </span>
           </div>


              <h3 class="text-weight-bold">Publications</h3>
               <div class="span-container">
           <span
              v-for="(spec, i) in getSpecializations(selectedFaculty.publication)"
              :key="i"
          
            >
            <!-- {{spec}} -->

             {{ (!hasColon(spec))?toTitleCase(spec):'' }}             
             <strong>{{  (hasColon(spec))?toTitleCase(spec.split(':')[0])+':':''}}</strong>{{  (hasColon(spec))?toTitleCase(spec.split(':')[1]):'' }}
           </span>
           </div>
        
              <h3 class="text-weight-bold">Affiliations</h3>
               <div class="span-container">
           <span
              v-for="(spec, i) in getSpecializations(selectedFaculty.affiliation)"
              :key="i"
          
            >
            <!-- {{spec}} -->

             {{ (!hasColon(spec))?toTitleCase(spec):'' }}             
             <strong>{{  (hasColon(spec))?toTitleCase(spec.split(':')[0])+':':''}}</strong>{{  (hasColon(spec))?toTitleCase(spec.split(':')[1]):'' }}
           </span>
           </div>
      </div>
 </div>
 </div>
 
 <div style="display: block;" v-else class="row">
 
 <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by last name..."
        @input="handleSearch" 
        class="searchbar"
      />
    </div>


    <div class="q-mb-4 flex flex-wrap gap-2" >
        <button style="border-radius: 15%;"
          v-for="letter in alphabet"
          :key="letter"
          @click="sc(letter)"
          :class="[
            'q-pa-sm q-py-xs rounded-borders text-subtitle1',
            selectedLetter === letter ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
          ]"
        >
          {{ letter }}
        </button>
      </div>

    

      <p class="mb-2 text-sm text-gray-600 records">
  Records found: {{ filteredFaculty.length }}
</p>
       <table class="min-w-full border" id="facultytable">
        <thead class="bg-gray-100">
          <tr>
          <th v-show="false">Lastname</th>
            <th class="p-2 text-left border-b">Name</th>
            <th class="p-2 text-left border-b">Department</th>
              <th class="p-2 text-left border-b">College</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="faculty in filteredFaculty"
            :key="faculty.id"
            class="border-b hover:bg-gray-50 cursor-pointer"
            @click="selectFaculty(faculty)"
          >

        <td v-show="false" >{{faculty.lastname}}</td>
          <td class="p-2 linktd">
            <b class="fname">{{ toTitleCase(faculty.facultyname) }}</b>
            </td>
            <td class="p-2">{{ toTitleCase(faculty.deptname) }}</td>
             <td class="p-2">{{ toTitleCase(faculty.collname) }}</td>
          </tr>
          <tr v-if="filteredFaculty.length === 0">
            <td class="p-2 text-gray-500 italic" colspan="2">No faculty under "{{ selectedLetter }}"</td>
          </tr>
        </tbody>
      </table>


 
 </div>
 
    </section>
   </div>
 <footer class="app-footer">
      <p>&copy; 2025 Mindanao State University General Santos. All rights reserved.</p>
    </footer>
</template>
<script setup>
import { ref, computed, onMounted, watch  } from 'vue'
import axios from 'axios' 
import { decodeCredential } from 'vue3-google-login';
import api from "src/API/api";
import { useCookies } from "vue3-cookies";
import { useQuasar } from 'quasar';
import myDialog from 'src/plugins/myDialog';
 

const selectedFaculty = ref(null)
const facultyList = ref([])
const searchQuery = ref('')
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const selectedLetter = ref('A')

const filteredFaculty = computed(() => {
  if (!searchQuery.value) {
    return facultyList.value.filter(f =>
      f.lastname.toUpperCase().startsWith(selectedLetter.value)
    )
  } else {
    return facultyList.value.filter(f =>
      f.lastname.toUpperCase().startsWith(searchQuery.value.toUpperCase())
    )
  }
})

 function sc(letter)
 {
  searchQuery.value= null;
  selectedLetter.value=letter;
 }
function selectFaculty(faculty) { 
    selectedFaculty.value = faculty
   
  
}

const toTitleCase = (str) => {
  return str
    .split(' ')  
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  
    .join(' '); 
}
onMounted(async () => {
  // const res = await axios.get(`https://qrattendance.msugensan.edu.ph/api/allfaculties`)
  onLogin();
  const res = await api.getAllFaculty()
  if(res.error) {
    myDialog.negative($q, "Error", res.error);
    return;
  }
  facultyList.value = res.FacultyList??[]

console.log(facultyList.value)
  const facultyIdFromUrl = new URLSearchParams(window.location.search).get('facultyId')
  console.log(facultyIdFromUrl)
  if (facultyIdFromUrl) {
    const faculty = facultyList.value.find(faculty => faculty.id === facultyIdFromUrl)
    console.log(faculty)
    if (faculty) {
      selectedFaculty.value = faculty
    }
  }
 
})

watch(selectedFaculty, (newFaculty) => {
  if (newFaculty) { 
    window.history.pushState({}, '', `?facultyId=${newFaculty.id}`)
  }
})


 function goBack() {
  selectedFaculty.value = null 
  window.history.pushState({}, '', window.location.pathname)
}

 
const onImageError = (event) => {
  event.target.src = 'images/default.png'
}
 

const getSpecializations = (s) => s?.split(';').map(x => x.trim()).filter(Boolean) || []
const getResearchinterest = getSpecializations

const parsedSpecializations = (specString) => {
  if (!specString || typeof specString !== 'string') return []
  return specString
    .split(';')
    .map(pair => pair.split(':'))
    .filter(parts => parts.length === 2)
    .map(([key, value]) => ({
      key: key.trim(),
      value: value.trim()
    }))
}

const hasColon = (text) => typeof text === 'string' && text.includes(':')


////
const { cookies } = useCookies();
    const $q = useQuasar();
function onLogin() {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: '247346265934-ksi885k87vtrcqh7tvmcgeca9fvqr0fd.apps.googleusercontent.com',
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("g_id_signin"),
          { theme: "outline", size: "large" } // customization attributes
        );

        // window.google.accounts.id.prompt(); // optional: for One Tap 
      } else {
        console.error("Google Identity script not loaded.");
      }
    }
    import { useRouter } from 'vue-router'
    const router = useRouter();

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

 <style scoped src="./faculty-profile.css"></style>