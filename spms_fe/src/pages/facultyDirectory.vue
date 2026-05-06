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
    <div class="row justify-center q-px-md q-pb-lg">
      <div class="col-12 col-md-11 col-lg-11">
        <q-card class="q-pa-lg">

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
              v-for="faculty in filteredFaculty"
              :key="faculty.id"
              class="col-12 col-sm-6 col-md-4"
            >
              <q-card bordered>
                <q-card-section class="text-center">

                  <q-avatar
                    color="primary"
                    text-color="white"
                    size="60px"
                    class="q-mb-md"
                  >
                    {{ faculty.name.charAt(0) }}
                  </q-avatar>

                  <div class="text-weight-bold">
                    {{ faculty.name }}
                  </div>

                  <div class="text-grey-7">
                    {{ faculty.department }}
                  </div>

                  <div class="text-caption text-grey">
                    {{ faculty.college }}
                  </div>

                </q-card-section>
              </q-card>
            </div>
          </div>

        </q-card>
      </div>
    </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "FacultyDirectory",

  data() {
    return {
      search: "",
      selectedDepartment: null,
      selectedCollege: null,
      selectedLetter: "ALL",

      letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),

      departments: [
        "IT Department",
        "Engineering Department",
        "Education Department"
      ],

      colleges: [
        "College of Computing",
        "College of Engineering",
        "College of Education"
      ],

      facultyList: [
        {
          id: 1,
          name: "Abdul Rahman",
          department: "IT Department",
          college: "College of Computing"
        },
        {
          id: 2,
          name: "John Smith",
          department: "Engineering Department",
          college: "College of Engineering"
        },
        {
          id: 3,
          name: "Maria Santos",
          department: "Education Department",
          college: "College of Education"
        }
      ]
    }
  },

  computed: {
    filteredFaculty() {
      return this.facultyList.filter(faculty => {
        const searchMatch =
          faculty.name.toLowerCase().includes(this.search.toLowerCase())

        const departmentMatch =
          !this.selectedDepartment ||
          faculty.department === this.selectedDepartment

        const collegeMatch =
          !this.selectedCollege ||
          faculty.college === this.selectedCollege

        const letterMatch =
          this.selectedLetter === "ALL" ||
          faculty.name.startsWith(this.selectedLetter)

        return (
          searchMatch &&
          departmentMatch &&
          collegeMatch &&
          letterMatch
        )
      })
    }
  }
}
</script>

<style scoped>
.hero-section {
  height: 300px;
  width: 100%;
  background: url('../assets/banne1r.png') no-repeat center center;
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
