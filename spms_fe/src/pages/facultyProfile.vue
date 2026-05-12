<template>
  <q-page class="bg-grey-2">

    <div class="page-container">

    <!-- HERO SECTION -->
    <div class="hero-section">
      <div class="hero-overlay q-pa-xl ">

        <q-chip
          color="warning"
          text-color="dark"
          icon="school"
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
                icon="menu_book"
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
                name="badge"
                color="primary"
                size="sm"
              />
              <div>
                <div class="text-caption text-grey">
                  Employee ID
                </div>
                <div class="text-body1">
                  {{ faculty.id }}
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

<script>
export default {
  name: "FacultyProfilePage",

  data() {
    return {
      faculty: {
        email_address: "rohanifah.abdulrahman@msugensan.edu.ph",
        currentrank: "ASSISTANT PROFESSOR",
        deptcode: "IS",
        id: "118-1025",
        facname: "ROHANIFAH ABDUL-RAHMAN",
        pic: "images/118-1025.jpg",
        facultyname: "ABDUL-RAHMAN, ROHANIFAH",
        lastname: "ABDUL-RAHMAN",
        deptname: "ISLAMIC STUDIES",
        collname: "INSTITUTE OF ISLAMIC, ARABIC & IT'L STUD"
      },

      facultySections: {
        specializations: [
          "Islamic Jurisprudence",
          "Quranic Studies",
          "Islamic Philosophy"
        ],

        researchInterests: [],

        research: [
          "Islamic Banking Systems in Southeast Asia (2023)"
        ],

        publications: [],

        affiliations: [],

        extension: []
      }
    }
  },

  computed: {
    sections() {
      return [
        {
          title: "Specializations",
          icon: "psychology",
          items: this.facultySections.specializations
        },
        {
          title: "Research Interests",
          icon: "search",
          items: this.facultySections.researchInterests
        },
        {
          title: "Research",
          icon: "article",
          items: this.facultySections.research
        },
        {
          title: "Publications",
          icon: "menu_book",
          items: this.facultySections.publications
        },
        {
          title: "Affiliations",
          icon: "groups",
          items: this.facultySections.affiliations
        },
        {
          title: "Extension",
          icon: "volunteer_activism",
          items: this.facultySections.extension
        }
      ]
    }
  },

  methods: {
    onImageError(event) {
      event.target.src = "images/default.png"
    }
  }
}
</script>

<style scoped>
.hero-section {
  height: 300px;
  width: 100%;
  /* background: url('/images/logo.png') center/cover no-repeat; */
  position: sticky;
  background-color: white;
  top: 50px;
  z-index: 10;
}

.hero-overlay {
  height: 100%;
  background: rgba(114, 4, 85, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  border-radius: 0 !important;
}

.faculty-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px !important;
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
</style>
