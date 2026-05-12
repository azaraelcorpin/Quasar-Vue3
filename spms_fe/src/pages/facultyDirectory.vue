<template>
  <q-page class="bg-grey-2">

    <!-- HERO -->
  <div class="row justify-center">
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


    <!-- SEARCH SECTION -->
    <div class="col-12 col-md-11 col-lg-8">
      <div class="col-12 col-md-11 col-lg-8">
        <q-card class="q-pa-lg full-width" >

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

            <div class="row q-gutter-xs">
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
              <q-card bordered @click="viewProfile(faculty)" class="cursor-pointer">
                <q-card-section>
                  <div class=text-center>
                      <q-avatar
                        color="primary"
                        text-color="white"
                        size="80px"
                        class="q-mb-md"
                      >
                        <!-- {{ faculty.facultyname.charAt(0) }} -->
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
                    <q-icon name="business_center" size="xs" class="q-mr-xs" style="color: #B8860B" />
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
  </div>
  </q-page>
</template>

<script>

import { ref, computed, onMounted, watch  } from 'vue'
import axios from 'axios'
import { decodeCredential } from 'vue3-google-login';
import api from "src/API/api";
import { useCookies } from "vue3-cookies";
import { useQuasar } from 'quasar';
import myDialog from 'src/plugins/myDialog';


export default {
  name: "FacultyDirectory",

  data() {
    return {
      search: "",
      selectedDepartment: null,
      selectedCollege: null,
      selectedLetter: "ALL",
      perPage: 9,
      page: 1,

      letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),

      departments: [ ],

      colleges: [],

      facultyList: [],
    }
  },

   methods: {
    onImageError(event) {
      event.target.src = 'images/logo.png'
    },
    // create a method on card click to navigate to faculty profile page and pass the faculty object as parameter
    viewProfile(faculty) {
      this.$router.push({ name: 'facultyProfile', params: { faculty: JSON.stringify(faculty) } })
    }

  },

  computed: {
    filteredFaculty() {
      return this.facultyList.filter(faculty => {
        const searchMatch =
          faculty.facultyname.toLowerCase().includes(this.search.toLowerCase())

        const departmentMatch =
          !this.selectedDepartment ||
          faculty.deptname === this.selectedDepartment

        const collegeMatch =
          !this.selectedCollege ||
          faculty.collname === this.selectedCollege

        const letterMatch =
          this.selectedLetter === "ALL" ||
          faculty.facultyname.startsWith(this.selectedLetter)

        return (
          searchMatch &&
          departmentMatch &&
          collegeMatch &&
          letterMatch
        )
      })
    },
    totalPages() {
      return Math.ceil(this.filteredFaculty.length / this.perPage)
    },
    showPagination() {
      return this.filteredFaculty.length > this.perPage
    },
    paginatedItems() {
      const start = (this.page - 1) * this.perPage
      const end = start + this.perPage
      return this.filteredFaculty.slice(start, end)
    }
  },

  watch: {
    selectedCollege(newVal) {
      this.selectedDepartment = null; // Reset department when college changes
      if (!newVal) {
        this.departments = this.departments = [...new Set(this.filteredFaculty.map(f => f.deptname))].sort();
        return
      }

      const depts = this.filteredFaculty
        .filter(f => f.collname === newVal)
        .map(f => f.deptname)

      this.departments = [...new Set(depts)]
        .sort((a, b) => a.localeCompare(b))
    }
  },


  async mounted() {
    // In a real application, you would fetch this data from an API
    // axios.get('/api/faculty').then(response => {
    //   this.facultyList = response.data
    // })
          const res = await api.getAllFaculty()
      if(res.error) {
        myDialog.negative($q, "Error", res.error);
        return;
      }
      this.facultyList = res.FacultyList??[]

    this.departments = [...new Set(this.filteredFaculty.map(f => f.deptname))].sort();
    this.colleges = [...new Set(this.filteredFaculty.map(f => f.collname))].sort();

  }
}
</script>

<style scoped>
.hero-section {
  height: 300px;
  width: 100%;
  background: url('../assets/banne1r.png') no-repeat center/cover;
  position: relative;
  border-radius: 0 !important;
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

</style>
