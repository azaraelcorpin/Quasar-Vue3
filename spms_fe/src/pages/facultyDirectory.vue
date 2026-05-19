<template>

  <!-- ===================== -->
  <!-- FACULTY DIRECTORY -->
  <!-- ===================== -->
  <q-page v-if="!faculty" class="bg-grey-2">


    <!-- <div class="row justify-center"> -->
      <div class="col-12 col-md-11 col-lg-8">

        <q-card flat class="hero-section">
          <div class="hero-overlay text-center ">
            <div class="hero-title">
              Faculty Directory
            </div>

            <div class="text-subtitle1 text-white q-mt-sm">
              Browse faculty by name, department, or college
            </div>
          </div>
        </q-card>

      </div>
    <div class="row justify-center">
      <!-- SEARCH SECTION -->
      <div class="col-12 col-md-11 col-lg-8">

        <q-card class="q-pa-lg full-width">

          <!-- Search Input -->
          <div class="row justify-center">
            <q-input
              v-model="search"
              outlined
              label="Search Faculty"
              dense
              class="q-mb-md"
              :style="{ width: '50%' }"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <!-- Alphabet Filter -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Filter by Letter</div>

            <div class="row q-gutter-xs ">
              <q-btn
                size="md"
                round
                label="All"
                :color="selectedLetter === 'ALL' ? 'primary' : 'grey-5'"
                @click="selectedLetter = 'ALL'"
              />

              <q-btn
                v-for="letter in letters"
                :key="letter"
                size="md"
                round
                :label="letter"
                :color="selectedLetter === letter ? 'primary' : 'grey-5'"
                @click="selectedLetter = letter"
              />
            </div>
          </div>

          <!-- Dropdowns -->
          <div class="row q-col-gutter-md q-mb-md">

            <div class="col-12 col-md-6">
              <q-select
                v-model="selectedDepartment"
                :options="departments"
                label="Department"
                outlined
                clearable
              />
            </div>

            <div class="col-12 col-md-6">
              <q-select
                v-model="selectedCollege"
                :options="colleges"
                label="College"
                outlined
                clearable
              />
            </div>

          </div>

          <!-- Result Count -->
          <div class="text-subtitle2 q-mb-md">
            {{ filteredFaculty.length }} Records Found
          </div>

          <!-- Faculty Cards -->
          <div class="row q-col-gutter-md">

            <div
              v-for="faculty in paginatedItems"
              :key="faculty.id"
              class="col-12 col-sm-6 col-md-4"
            >
              <q-card
                bordered
                class="cursor-pointer"
                @click="viewProfile(faculty)"
              >

                <q-card-section>

                  <div class="text-center">

                    <q-avatar
                      color="primary"
                      text-color="white"
                      size="80px"
                      class="q-mb-md"
                    >
                      <img
                        :src="faculty.pic"
                        @error="onImageError"
                      />
                    </q-avatar>

                    <div class="text-weight-bold">
                      {{ faculty.facultyname }}
                    </div>

                  </div>

                  <div class="text-grey-7">
                    <q-icon name="business_center" size="xs" class="q-mr-xs" style="color:#B8860B" />
                    {{ faculty.deptname }}
                  </div>

                  <div class="text-caption text-grey">
                    <q-icon name="account_balance" size="xs" class="q-mr-xs" color="blue" />
                    {{ faculty.collname }}
                  </div>

                </q-card-section>

              </q-card>
            </div>

          </div>

          <div v-if="showPagination" class="row justify-center q-mt-md">
            <q-pagination
              v-model="page"
              :max="totalPages"
              direction-links
              boundary-links
            />
          </div>

        </q-card>

      </div>

    </div>

  </q-page>

  <!-- ===================== -->
  <!-- FACULTY PROFILE -->
  <!-- ===================== -->
  <q-page v-else class="bg-grey-2">



        <!-- HERO SECTION -->
        <div class="hero1-section">
           <q-btn @click="$router.push({ name: 'facultyDirectory' })" flat style="color:grey" label="← Back to Directory" />

          <div class="hero1-overlay q-pa-xl ">

            <q-chip
              color="warning"
              text-color="dark"
              style="width: fit-content;"
            >
              {{ faculty.deptname }}
            </q-chip>

            <div class="text-h4 text-weight-bold text-white q-mt-md">
              {{ faculty.facultyname }}
            </div>

            <div class="text-h6 text-warning">
              {{ faculty.currentrank }}
            </div>

          </div>
        </div>

<div class="page-container">
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
                  <q-item
                    clickable
                    tag="a"
                    href="https://www.linkedin.com/in/your-profile"
                    target="_blank"
                  >
                    <q-item-section avatar>
                      <q-icon name="link" color="primary" />
                    </q-item-section>

                    <q-item-section>
                      LinkedIn
                    </q-item-section>
                  </q-item>

                  <!-- Google Scholar -->
                  <q-item
                    clickable
                    tag="a"
                    href="https://scholar.google.com/citations?user=your-id"
                    target="_blank"
                  >
                    <q-item-section avatar>
                      <q-icon name="link" color="primary" />
                    </q-item-section>

                    <q-item-section>
                      Google Scholar
                    </q-item-section>
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
import { useQuasar,QSpinnerFacebook  } from 'quasar'

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
const search = ref('')
const selectedDepartment = ref(null)
const selectedCollege = ref(null)
const selectedLetter = ref('ALL')
const perPage = ref(9)
const page = ref(1)

const letters = ref('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))

const departments = ref([])
const colleges = ref([])
const facultyList = ref([])
const faculty = ref(null)

// =====================
// METHODS
// =====================
function onImageError(event) {
  event.target.src = 'images/logo.png'
}

function viewProfile(f) {
  router.push({ name: 'facultyDirectory', query: { id: f.id } })
}

function handleLoginSuccess(event) {
  //remove any existing session
  cookies.remove('_UID_')
  localStorage.removeItem('faculty')

  const email = event.detail

  // const email = 'mario.aguja@msugensan.edu.ph' // TEMPORARY HARDCODED EMAIL FOR TESTING

  faculty.value =
    facultyList.value.find(f => f.email_address === email) || null
    console.log('Login successful for email:', email)
    console.log('Faculty found:', faculty.value)

  if (faculty.value) {
    const SID = { userEmail: faculty.value.email_address }

    cookies.set('_UID_', JSON.stringify(SID), '1d')
    localStorage.setItem('faculty', JSON.stringify(faculty.value))

    router.push({ name: 'facultyProfile' })
  } else {
    myDialog.negative($q, 'Unauthorized', 'Your account is not authorized to access the system.')
  }
}

// =====================
// COMPUTED
// =====================
const filteredFaculty = computed(() => {
  return facultyList.value.filter(f => {
    const searchMatch =
      f.facultyname.toLowerCase().includes(search.value.toLowerCase())

    const departmentMatch =
      !selectedDepartment.value || f.deptname === selectedDepartment.value

    const collegeMatch =
      !selectedCollege.value || f.collname === selectedCollege.value

    const letterMatch =
      selectedLetter.value === 'ALL' ||
      f.facultyname.startsWith(selectedLetter.value)

    return searchMatch && departmentMatch && collegeMatch && letterMatch
  })
})

const totalPages = computed(() =>
  Math.ceil(filteredFaculty.value.length / perPage.value)
)

const showPagination = computed(() =>
  filteredFaculty.value.length > perPage.value
)

const paginatedItems = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filteredFaculty.value.slice(start, start + perPage.value)
})

const sections = computed(() => {
  if (!faculty.value) return []

  return [
    {
      title: 'Specializations',
      icon: 'psychology',
      items: faculty.value.specializations?.split(';').map(x => x.trim()).filter(Boolean) || []
    },
    {
      title: 'Research Interests',
      icon: 'search',
      items: faculty.value.research_interest?.split(';').map(x => x.trim()).filter(Boolean) || []
    },
    {
      title: 'Research',
      icon: 'article',
      items: faculty.value.research?.split(';').map(x => x.trim()).filter(Boolean) || []
    },
    {
      title: 'Publications',
      icon: 'menu_book',
      items: faculty.value.publication?.split(';').map(x => x.trim()).filter(Boolean) || []
    },
    {
      title: 'Affiliations',
      icon: 'groups',
      items: faculty.value.affiliation?.split(';').map(x => x.trim()).filter(Boolean) || []
    },
    {
      title: 'Extension',
      icon: 'volunteer_activism',
      items: faculty.value.extensions?.split(';').map(x => x.trim()).filter(Boolean) || []
    }
  ]
})

const education = computed(() =>
  faculty.value?.education?.split(';').map(x => x.trim()).filter(Boolean) || []
)

// =====================
// WATCHERS
// =====================
watch(selectedCollege, (newVal) => {
  selectedDepartment.value = null

  if (!newVal) {
    departments.value = [
      ...new Set(filteredFaculty.value.map(f => f.deptname))
    ].sort()
    return
  }

  const depts = filteredFaculty.value
    .filter(f => f.collname === newVal)
    .map(f => f.deptname)

  departments.value = [...new Set(depts)].sort((a, b) =>
    a.localeCompare(b)
  )
})

watch(
  () => route.query.id,
  (newId) => {
    if (newId) {
      faculty.value =
        facultyList.value.find(f => f.id === newId) || null
    } else {
      faculty.value = null
    }
  }
)

// =====================
// LIFECYCLE
// =====================
function onGoogleLogin(e) {
  handleLoginSuccess(e)
}

onMounted(async () => {
  $q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'yellow',
          spinnerSize: 140,
          backgroundColor: '#720455',
          // message: 'Some important process is in progress. Hang on...',
          messageColor: 'black'
        })
  window.addEventListener('google-login-success', onGoogleLogin)

  const res = await api.getAllFaculty()
  const id = route.query.id

  if (res.error) {
    myDialog.negative($q, 'Error', res.error)
    return
  }

  facultyList.value = res.FacultyList ?? []
console.log('UID from cookie:', cookies.get('_UID_'))
  let storedFaculty = cookies.get('_UID_') ? cookies.get('_UID_') : null
  if (storedFaculty){
    handleLoginSuccess({ detail: storedFaculty.email })
  }

  if (id) {
    faculty.value =
      facultyList.value.find(f => f.id === id) || null
  }

  departments.value = [
    ...new Set(filteredFaculty.value.map(f => f.deptname))
  ].sort()

  colleges.value = [
    ...new Set(filteredFaculty.value.map(f => f.collname))
  ].sort()
  $q.loading.hide()
})

onBeforeUnmount(() => {
  window.removeEventListener('google-login-success', onGoogleLogin)
})
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
