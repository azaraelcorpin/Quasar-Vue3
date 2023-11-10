<template>
    <div style="background: #7aaf8e;">
      <q-card  >   
        <q-form >
        <q-page-container style="padding:1px;" >                
            <div class="text-h5 bg-primary text-white" style="border-radius:3px 3px 0px 0px" >Add Employee</div>
            {{ typeof model }}
            <q-select
                filled
                v-model="model"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="options"
                option-label="name"
                option-value=""
                @filter="filterFn"
                @input-value="setModel"
                hint="Select Employee"
                style="width: 250px; padding-bottom: 32px"
            >
                <template v-slot:no-option>
                <q-item>
                    <q-item-section class="text-grey">
                    No results
                    </q-item-section>
                </q-item>
                </template>
            </q-select> 
            <!-- lname -->
            <q-input 
            required 
            label="Lastname" 
            dense 
            outlined 
            class="q-pa-sm" 
            color="primary" 
            >
            </q-input> 
            <!-- fname -->
            <q-input 
            required 
            label="Firstname" 
            dense 
            outlined 
            class="q-pa-sm" 
            color="primary" 
            >
            </q-input>  
            <!-- mname -->
            <q-input 
            label="Middlename" 
            dense 
            outlined 
            class="q-pa-sm" 
            color="primary" 
            >
            </q-input>  
            <!-- email -->
            <q-input 
            required 
            label="Email" 
            dense 
            outlined 
            class="q-pa-sm" 
            color="primary" 
            >
            <template v-slot:prepend>
                <q-icon name="email" />
            </template>
            </q-input> 

            <div style="display: flex; justify-content: flex-end;">
            <q-btn class="q-ma-md" color="primary" type="submit">Save</q-btn>
            <q-btn class="q-ma-md" type="reset">Cancel</q-btn>
            </div>

        </q-page-container>
        </q-form>           
      </q-card>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'

  const stringOptions = [{name:'test',id:1},{name:'test2',id:2},{name:'test3',id:3},{name:'test4',id:4},{name:'test5',id:5},
  {name:'fers1',id:11},{name:'fers2',id:12},{name:'fers3',id:13},{name:'fers4',id:14},{name:'fers5',id:15},
  {name:'wers1',id:31},{name:'wrs2',id:32},{name:'frwe3',id:23},{name:'wers4',id:44},{name:'rwes5',id:25}]

  export default {
    setup () {
        const model = ref(null)
        const options = ref(stringOptions)

        return {
        model,
        options,

        filterFn (val, update, abort) {
            update(() => {
            const needle = val.toLocaleLowerCase()
            options.value = stringOptions.filter(v => v.name.toLocaleLowerCase().indexOf(needle) > -1)
            })
        },

        setModel (val) {
            model.value = val
        }
        }
    },
    data() {
      return {
        dialog:false,
      };
    },
    methods: {
      saveContact() {
        // Handle form submission here
        // You can access the form data in this.contact
        console.log('Contact saved:', this.contact);
        // You can also send this data to an API, store it in Vuex, or perform other actions as needed
      },
      cancelForm() {
        // Reset the form fields or navigate away from the form
        this.contact = {
          lastname: '',
          firstname: '',
          middlename: '',
          email: ''
        };
      }
    }
  };
  </script>
  
  <style scoped>
    .form-group {
      margin-bottom: 10px;
    }
    .btn {
      margin-right: 10px;
    }
    .form-actions {
      margin-top: 20px;
    }
  </style>
  