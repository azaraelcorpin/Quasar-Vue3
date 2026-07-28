<template>

  <!-- ===================== -->
  <!-- FACULTY PROFILE -->
  <!-- ===================== -->
  <q-page class="bg-grey-2">

        <div class="page-container">

                                      <q-dialog v-model="showdialog" persistent>
                                            <q-card  style="overflow-x: hidden; word-break: break-word; width: 50%; padding-inline: 20px;">
                                              <q-card-section>
                                                <div class="text-h6">Update {{ toTitleCase(field.replace('_', ' ')) }}</div>
                                              </q-card-section>

                                            <div class="span-container"  >
                                              <span
                                                    v-for="(spec, i) in getSpecializationsDialog"
                                                    :key="i"
                                                     style="display: inline-flex; align-items: center; gap: 6px; margin-bottom: 6px; border: 1px solid #ccc; border-radius: 16px; padding: 4px 8px;"
                                                  >

                                                  <!-- {{toTitleCase(spec)}} -->
                                                  <span v-if="!hasColon(spec)">{{toTitleCase(spec)}}</span>
                                                  <span v-else>
                                                    <strong>{{toTitleCase(spec.split(':')[0]) }}:</strong> {{ toTitleCase(spec.split(':')[1]) }}
                                                  </span>
                                                      <q-icon
                                                            name="delete"
                                                            class="cursor-pointer"
                                                            @click="() =>{
                                                              const specs = message.split(';').map(x => x.trim()).filter(Boolean);
                                                              specs.splice(i, 1);
                                                              message = specs.join('; ');
                                                              console.log('Updated entry:', message);
                                                            }"
                                                            size="16px"
                                                            color="primary"
                                                      ></q-icon>
                                                      <q-icon
                                                            name="edit"
                                                            class="cursor-pointer"
                                                            @click="() => {
                                                              dialogEntry = spec;
                                                              const specs = message.split(';').map(x => x.trim()).filter(Boolean);
                                                              specs.splice(i, 1);
                                                              message = specs.join('; ');
                                                              console.log('Updated entry:', message);
                                                            }"
                                                            size="16px"
                                                            color="primary"
                                                    ></q-icon>
                                                </span>
                                            </div>

                                              <q-card-section style="display: flex; justify-content: center; align-items: center; gap: 10px;">
                                                <!-- with rules no double colon -->
                                                <q-input style="width: 100%;"
                                                  v-model="dialogEntry"
                                                  type="text"
                                                  autogrow
                                                  autofocus
                                                  :rules="[
                                                    val => !val.includes('::') || 'Entry cannot contain double colon'
                                                  ]"

                                                />
                                                <q-btn
                                                  icon="add"
                                                  color="primary"
                                                  flat
                                                  :disable="dialogEntry.includes('::')||dialogEntry.trim() === ''"
                                                  @click="() => {
                                                    const specs = message?.split(';').map(x => x.trim()).filter(Boolean)||[];

                                                    if(field === 'linked_in' || field === 'google_scholar'){
                                                      if(specs.length > 0){
                                                        myDialog.negative($q,'Error', 'Only one entry allowed for this field. Please edit or delete the existing entry first.')
                                                      dialogEntry = '';
                                                      return;
                                                    }}

                                                    if (dialogEntry.trim()) {
                                                      specs.push(dialogEntry.trim());
                                                      message = specs.join('; ');
                                                      dialogEntry = '';
                                                    }
                                                  }"></q-btn>

                                              </q-card-section>

                                              <q-card-actions align="right">
                                                <q-btn flat label="Cancel" color="primary" @click="dialogEntry='', message = ''" v-close-popup />
                                                <q-btn flat label="Save" color="primary" @click="handlesFacultyUpdate(field,String(message))" :disable="dialogEntry!==''" />
                                              </q-card-actions>
                                            </q-card>
                                          </q-dialog>
        <!-- HERO SECTION -->
        <div class="hero1-section">

          <div class="hero1-overlay q-pa-xl ">

            <q-chip
              color="warning"
              text-color="dark"
              style="width: fit-content;"
            >
              {{ faculty.deptname }}
            </q-chip>

            <div class="text-h4 text-weight-bold text-white q-mt-md">
              {{ faculty.facultyname??"" }}
            </div>

            <div class="text-h6 text-warning">
              {{ faculty.currentrank }}
            </div>

          </div>
        </div>


        <!-- MAIN CONTENT -->
        <div class="row q-col-gutter-lg q-pa-sm">

          <!-- LEFT PROFILE CARD -->
          <div class="col-12 col-md-4">
            <q-card flat bordered class="profile-card">

              <!-- Profile Picture -->
              <q-card-section class="text-center">

                <q-avatar
                  square
                  size="180px"
                  class="faculty-avatar"
                >
                  <img
                    :src="faculty.pic"
                    @error="onImageError"
                  />
                </q-avatar>

                <div class="q-mt-md">
                  <q-chip
                    color="warning"
                    text-color="dark"
                    icon="business_center"
                  >
                    {{ faculty.deptname }}
                  </q-chip>
                </div>

              </q-card-section>

              <q-separator />

              <!-- Basic Information -->
              <q-card-section>

                <div class="info-item q-mb-md">
                  <q-icon
                    name="apartment"
                    color="primary"
                    size="sm"
                  />
                  <div>
                    <div class="text-caption text-grey">
                      College
                    </div>
                    <div class="text-body1">
                      {{ faculty.collname }}
                    </div>
                  </div>
                </div>

                <div class="info-item q-mb-md">
                  <q-icon
                    name="school"
                    color="primary"
                    size="sm"
                  />
                  <div>
                    <div class="text-caption text-grey">
                      Education
                                <q-btn
                                  icon="edit"
                                  size="sm"
                                  round
                                  dense
                                  flat
                                  color="primary"
                                  @click="showdialog = true; field='education'; message = (String(faculty.education)||'').split(';')
                                            .map(item => item.trim())
                                            .filter(Boolean)
                                            .join(';\n\n')"
                                />
                    </div>
                    <div class="">
                      <!-- {{ education }} -->
                        <q-list v-if="education.length" >

                          <q-item
                            v-for="(item, index) in education"
                            :key="index"
                            style="overflow-wrap: anywhere; margin-left: -40px;"
                          >
                            <q-item-section avatar>
                              <q-icon
                                name="fiber_manual_record"
                                size="xs"
                                color="primary"
                              />
                            </q-item-section>

                            <q-item-section style="margin-left: -30px;" >
                              {{ item }}
                            </q-item-section>
                          </q-item>

                        </q-list>
                    </div>
                  </div>
                </div>

              </q-card-section>

              <q-separator />

              <!-- Contact -->
              <q-card-section>
                <div class="text-subtitle1 text-weight-bold q-mb-md">
                  Contact Information
                </div>

                <q-list bordered separator>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon
                        name="email"
                        color="primary"
                      />
                    </q-item-section>

                    <q-item-section style="overflow-wrap: anywhere;">
                      {{ faculty.email_address }}
                    </q-item-section>
                  </q-item>

                  <!-- LinkedIn -->
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="link" color="primary" />
                    </q-item-section>

                    <a
                    :href="faculty.linked_in??''"
                    target="_blank">
                      LinkedIn  {{faculty.linked_in ? '' : '(not provided)'}}
                      </a>

                    <q-btn
                      icon="edit"
                      size="sm"
                      round
                      dense
                      flat
                      color="primary"
                      @click="showdialog = true; field='linked_in'; message = faculty.linked_in"
                    />
                  </q-item>

                  <!-- Google Scholar -->
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="link" color="primary" />
                    </q-item-section>

                    <a
                      :href="faculty.google_scholar??''"
                      target="_blank"
                      class="q-item-section"
                      style="overflow-wrap: anywhere;"
                    >
                      Google Scholar  {{faculty.google_scholar ? '' : '(not provided)'}}
                    </a>

                    <q-btn
                      icon="edit"
                      size="sm"
                      round
                      dense
                      flat
                      color="primary"
                      @click="showdialog = true; field='google_scholar'; message = faculty.google_scholar"
                    />
                  </q-item>

                </q-list>
              </q-card-section>

            </q-card>
          </div>


          <!-- RIGHT CONTENT -->
          <div class="col-12 col-md-8">

            <q-card
              v-for="section in sections"
              :key="section.title"
              class="q-mb-lg"
              flat
              bordered
            >
              <!-- Header -->
              <q-card-section class="row items-center">
                <q-icon
                  :name="section.icon"
                  color="primary"
                  class="q-mr-sm"
                />

                <div class="text-h6 text-primary">
                  {{ section.title }}
                </div>
                        <q-btn
                          icon="edit"
                          size="sm"
                          round
                          dense
                          flat
                          color="primary"
                          @click="showdialog = true; field=section.name; message = (String((faculty[section.name]??''))||'').split(';')
                          .map(item => item.trim())
                          .filter(Boolean)
                          .join(';\n\n')"
                        />
              </q-card-section>

              <q-separator />

              <!-- With Data -->
              <q-list v-if="section.items.length">

                <q-item
                  v-for="(item, index) in section.items"
                  :key="index"
                >
                  <q-item-section avatar>
                    <q-icon
                      name="fiber_manual_record"
                      size="xs"
                      color="primary"
                    />
                  </q-item-section>

                  <q-item-section>
                    {{ item }}
                  </q-item-section>
                </q-item>

              </q-list>

              <!-- No Data -->
              <q-card-section
                v-else
                class="text-center text-grey"
              >
                <q-icon
                  name="info"
                  size="md"
                  class="q-mb-sm"
                />

                <div>
                  No {{ section.title.toLowerCase() }} available.
                </div>
              </q-card-section>

            </q-card>

          </div>
        </div>
        </div>
      </q-page>

</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'

import api from 'src/API/api'
import myDialog from 'src/plugins/myDialog'
import { useQuasar } from 'quasar'

// =====================
// CORE SETUP
// =====================
const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const { cookies } = useCookies()

// =====================
// STATE (data)
// =====================

const faculty = ref({})
const showdialog = ref(false)
const field = ref('sdasdda')
const message = ref('')
const dialogEntry = ref('')

// =====================
// METHODS
// =====================
function onImageError(event) {
  event.target.src = 'images/logo.png'
}

function toTitleCase (str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
}
function hasColon(str) {
  return str.includes(':');
}

async function handlesFacultyUpdate(_field, _data) {
      showdialog.value = false;
      // let resp = await api.updateFacultyProfile(this.SID, this.selectedFaculty);
      try {
        await myDialog.confirm($q, "Update Confirmation", `Are you sure you want to update your ${_field}?`)
        $q.loading.show({  // Show loading dialog
            message: 'Updating Profile...',
            spinnerSize: 50,
            spinnerColor: 'primary',
            backgroundColor: 'white',
            messageColor: 'primary'
          });
          //change _field value "specializations" to "Specialization" to match the backend field name
          if(_field === 'specializations')
            _field = 'specialization';
        let resp = await api.updateFacultyProfile(_field, _data.replace(/\n/g, ' '), faculty.value.id);
        console.log('resp', resp);
        if (resp.statusCode === "200"){
          myDialog.positive($q, "Update Successful", `You have successfully updated your ${_field}.`);
          console.log('field', _field);
          console.log('data', _data);
          if(_field === 'specialization')
            faculty.value.specializations = _data;
          else
            faculty.value[_field] = _data;
        }
        else
          // throw new Error('Failed to update profile');
        myDialog.negative($q, "Update Failed", `Failed to update your ${_field}. Please try again later.`);
      } catch (error) {
        $q.loading.hide(); // Hide loading dialog
        return
      }
      $q.loading.hide(); // Hide loading dialog
    }


// =====================
// COMPUTED
// =====================


const sections = computed(() => {
  if (!faculty.value) return []

  return [
    {
      title: 'Specializations',
      name: 'specializations',
      icon: 'psychology',
      items: faculty.value.specializations?.split(';').map(x => x.trim()).filter(Boolean) || []
    },
    {
      title: 'Research Interests',
      name: 'research_interest',
      icon: 'search',
      items: faculty.value.research_interest?.split(';').map(x => x.trim()).filter(Boolean) || []
    },
    {
      title: 'Research',
      name: 'research',
      icon: 'article',
      items: faculty.value.research?.split(';').map(x => x.trim()).filter(Boolean) || []
    },
    {
      title: 'Publications',
      name: 'publication',
      icon: 'menu_book',
      items: faculty.value.publication?.split(';').map(x => x.trim()).filter(Boolean) || []
    },
    {
      title: 'Affiliations',
      name: 'affiliation',
      icon: 'groups',
      items: faculty.value.affiliation?.split(';').map(x => x.trim()).filter(Boolean) || []
    },
    {
      title: 'Extension',
      name: 'extensions',
      icon: 'volunteer_activism',
      items: faculty.value.extensions?.split(';').map(x => x.trim()).filter(Boolean) || []
    }
  ]
})

const getSpecializationsDialog = computed(() => {
  return String(message.value || '').split(';').map(x => x.trim()).filter(Boolean) || []
})

const education = computed(() =>
  faculty.value?.education?.split(';').map(x => x.trim()).filter(Boolean) || []
)

// =====================
// WATCHERS
// =====================


// =====================
// LIFECYCLE
// =====================
onMounted(async () => {


console.log('UID from cookie:', cookies.get('_UID_'))

  let storedFaculty = cookies.get('_UID_') ? cookies.get('_UID_') : null
  if (storedFaculty){
    faculty.value = localStorage.getItem('faculty') ? JSON.parse(localStorage.getItem('faculty')) : null
  }else{
    myDialog.negative($q,'Error', 'No faculty data found. Please return to the directory and select a faculty member.')
    router.push({ name: 'facultyDirectory' })
  }
        // 2. Notify layout instantly (THIS is the key)
      window.dispatchEvent(
        new CustomEvent('auth-change', {
          detail: { userEmail: storedFaculty.userEmail }
        })
      )
}
)

</script>

<style scoped>
.hero-section {
  height: 300px;
  width: 100%;
  background: url('../assets/banne1r.png') no-repeat center/cover;
  position: sticky;
  border-radius: 0 !important;
  z-index: 10
}

.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-title {
  color:goldenrod;
  font-size: 100px;
  font-family: "Friz Quadrata Std", serif;
  font-style: italic;
  font-weight: 400;
  line-height: 96px;
  letter-spacing: 2.4px;
  word-wrap: break-word;
}

.hero1-section {
  height: 200px;
  width: 100%;
  background: url('../assets/BannerProfilePage.png') center/cover no-repeat;
  position: sticky;
  background-color: white;
  top: 60px;
  z-index: 10;
}

.hero1-overlay {
  height: 100%;
  /* background: rgba(114, 4, 85, 0.85); */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.page-container {
  width: 65%;
  margin: 0 auto;
}

/* tablet */
@media (max-width: 1024px) {
  .page-container {
    width: 85%;
  }
}

/* phone */
@media (max-width: 600px) {
  .page-container {
    width: 100%;
  }
}

.profile-card {
  border-radius: 16px;
}

.info-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.faculty-avatar,
.faculty-avatar .q-avatar__content,
.faculty-avatar img {
  border-radius: 10px !important;
    width: 80%;
  height: 80%;
  margin-left: 10%;
  object-fit: cover;
}



</style>
