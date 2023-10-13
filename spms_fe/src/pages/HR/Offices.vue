<template>
    <q-page class="q-pa-sm">
      <q-inner-loading :showing="loading" style="z-index: 1000;" >
        <q-spinner-gears size="90px" color="primary"/>
      </q-inner-loading>

        <!-- Test button -->
      <!-- <q-btn @click="loading=!loading" style="  position: fixed;right: 1%; z-index: 1000;">
        loading test
      </q-btn> -->
      <!-- test button -->

      <q-card class="pa-1">      

        <q-card-section class="container--fluid" style="height: 89vh;">
          <div class="text-h4">Office Management </div>
          <!-- new Office dialog -->
          <q-dialog v-model="newOfficeDialog" persistent >
            <q-card  :style="{ width: $q.screen.xs ? '100%' : '50%' }" >   
              <q-form @submit="newOffice" @reset="newOfficeReset">
                <q-inner-loading :showing="loading"
                label="Updating Record..."
                label-class="text-black"
                label-style="font-size: 1.1em"
                color="black"
                style="z-index: 1000;" 
                >
              </q-inner-loading>
                <q-page-container style="padding:10px;" >                
                  <div class="text-h5" style="margin: 5px;">{{!NEW_OFFICE.id?'New ':'Update '}} Office</div> 

                  <q-input 
                    required 
                    label="Code" 
                    dense 
                    outlined 
                    class="q-pa-sm" 
                    color="primary" 
                    v-model="NEW_OFFICE.code"
                    :rules="[rules.requiredField,rules.noSpace]"
                    >
                  </q-input> 

                  <q-input 
                    required 
                    label="Description" 
                    dense 
                    outlined 
                    class="q-pa-sm" 
                    color="primary" 
                    v-model="NEW_OFFICE.Description"
                    :rules="[rules.requiredField,rules.noSpace]"
                    >
                  </q-input>                   

                  <div class="q-gutter-sm" v-if="NEW_OFFICE.id">
                    <q-radio v-model="NEW_OFFICE.status" val="Active" label="Active" />
                    <q-radio v-model="NEW_OFFICE.status" val="Inactive" label="Inactive" />
                  </div>
                  <div style="display: flex; justify-content: flex-end;">
                    <q-btn class="q-ma-md" color="primary" v-if="NEW_OFFICE.id" @click="updateOffice">Update</q-btn>
                    <q-btn class="q-ma-md" color="primary" v-else type="submit">Save</q-btn>
                    <q-btn class="q-ma-md" type="reset">Cancel</q-btn>
                  </div>

                </q-page-container>
              </q-form>           
            </q-card>
          </q-dialog>
          <!-- end dialog -->
          <!-- Office list table  -->
            <q-table
              class="my-sticky-header-table"
              :grid="false"
              :rows="Officelist"
              :columns="header"
              row-key="email"
              :rows-per-page-options="[ 10, 1, 15, 20, 25, 50, 0 ]"
              :filter="filter"
              :style="{height: $q.screen.xs ? '90.5%' : '96.5%', 'overflow-y': 'auto'}"
              virtual-scroll-sticky-size-start="100"
            >
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <q-btn color="positive" icon="edit" round flat @click="showUpdateOfficeDialog(props.row)"></q-btn>
                  <q-btn color="negative" icon="delete" round flat @click="deleteOffice(props.row)"></q-btn>
                </q-td>
              </template>   
              <template v-slot:top>
                <q-btn push color="primary" @click=" newOfficeReset(), newOfficeDialog = !newOfficeDialog">New Office</q-btn>
                  <q-space />
                  <q-input dense debounce="300" color="primary" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
              </template>

              <!-- ↓↓↓↓↓ this is for gridview such as viewing on small screen like android -->
              <template v-slot:item="props">
                <q-card style="width: 100%;height:min-content;" class="q-ma-sm">
                  <q-list dense>
                    <q-item v-for="col in props.cols" :key="col.name">
                      <q-item-section>
                        <q-item-label>{{ col.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-chip v-if="col.name === 'status'"
                          :color="props.row.status == 'Active' ? 'green': props.row.status == 'Disable' ? 'red': 'grey'"
                          text-color="white"
                          dense
                          class="text-weight-bolder"
                          square
                        >{{col.value}}
                        </q-chip>
                        <div v-else-if="col.name === 'action'"  class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
                          <q-btn color="positive" icon="edit" round flat @click="showUpdateOfficeDialog(props.row)"></q-btn>
                          <q-btn color="negative" icon="delete" round flat @click="deleteOffice(props.row)"></q-btn>
                        </div>
                        <q-item-label v-else caption :class="col.classes ? col.classes : ''">{{ col.value }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>

              </template>
              <!-- ↑↑↑↑↑ this is for gridview such as viewing on small screen like android -->

            </q-table>
          <!-- end list table  -->
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
    name: 'OfficeMgt',
    setup(){
      const $q = useQuasar();
      return{
        dialog
      }
    },
    methods:{
       test(evt, row){
        console.log({...row})
        row.office = new Date().toUTCString()

      },

      async queryOfficeList(){
        try {
          this.loading = true;
          let response = await api.getAllOffice();
          console.log('getAllOffice', response)
          this.Officelist = response.OFFICES;
        } catch (error) {
          console.log('error',error)
        }
        this.loading = false;
      },

      async newOffice(){
        try {
          this.loading = true;
          console.log(this.NEW_OFFICE);
          let response = await api.newSched(this.NEW_OFFICE);
          console.log('newOffice',response)          
          if(response.error){
            dialog.negative(this.$q,response.error.data.status,response.error.data.message)           
          }else{
            dialog.positive(this.$q,response.status,response.message).onOk(()=>{
              this.newOfficeReset();
              this.queryOfficeList();
            }) ;
          }
          
        } catch (error) {
          console.log('error',error)
        }
        this.loading = false;
      },

      async updateOffice(){
        try {
          
          dialog.confirm(this.$q,"Confirmation","Would you like to update this Office?")
          .onOk(async() => {
              this.loading = true;
              let response = await api.updateSched(this.NEW_OFFICE);
              console.log('updateOffice',response)      
              if(response.error){
                dialog.negative(this.$q,response.error.data.status,response.error.data.message)           
              }else{
                this.loading = false; 
                dialog.positive(this.$q,response.status,response.message).onOk(()=>{
                  // this.queryOfficeList();
                  this.testObj.id = this.NEW_OFFICE.id
                  this.testObj.dateStart = this.NEW_OFFICE.dateStart
                  this.testObj.dateEnd = this.NEW_OFFICE.dateEnd
                  this.testObj.status = this.NEW_OFFICE.status
                  this.newOfficeReset();
                }) ;
              }     
              this.loading = false;                                      
            })               
        } catch (error) {
          console.log('error',error)
        }
        this.loading = false;
      },      

      async deleteOffice(param){
        try {

          dialog.confirm(this.$q,"Confirmation","Would you like to delete the Office ID No. "+param.id+"?")
          .onOk(async() => {
              this.loading = true;
              let response = await api.deleteSched(param);
              console.log('deleteOffice',response)          
              if(response.error){
                dialog.negative(this.$q,response.error.data.status,response.error.data.message)           
              }else{
                dialog.positive(this.$q,response.status,response.message).onOk(()=>{
                  this.queryOfficeList();
                }) ;
              }
              this.loading = false;
            })
          .onCancel(() => {
            return
          }) 
          
        } catch (error) {
          console.log('error',error)
        }
        this.loading = false;
      },

      showUpdateOfficeDialog(row){
        this.testObj = row;        
        let tmp = {...row};
        console.log('start', tmp)
        this.NEW_OFFICE.id = tmp.id;
        this.NEW_OFFICE.dateStart = this.formatDateToDateSelect( tmp.dateStart);
        this.NEW_OFFICE.dateEnd = this.formatDateToDateSelect(tmp.dateEnd);
        this.NEW_OFFICE.status = tmp.status;
        this.newOfficeDialog = true;
      },

      newOfficeReset(){
        this.NEW_OFFICE={
              id:null,
              dateStart:null,
              dateEnd:null,
              status:null,
            }
            this.newOfficeDialog = false;
      },
      formatDate(dateString) {
        const dateObject = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return dateObject.toLocaleDateString(undefined, options);
      },
      formatDateToDateSelect(DateVariable){
        const formattedDate = new Date(DateVariable)
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, "/");
          return formattedDate
      },
    },
    data(){
      return {
        testObj:{},
        filter:"",
        loading:false,
        newOfficeDialog:false,
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
            NEW_OFFICE:{
              id:null,
              dateStart:null,
              dateEnd:null,
              status:null,
            },
        header : [
            {
              name: 'id',
              label: 'ID',
              align: 'left',
              field: 'id',
              sortable: true
            },
            {
              name: 'code',
              label: 'Code',
              align: 'left',
              field: 'code',
              sortable: true
            },
            {
              name: 'description',
              label: 'Description',
              align: 'left',
              field: 'Description',
              sortable: true
            },
            {
              name: 'topOffice',
              label: 'Top Office',
              align: 'left',
              field: 'top_office_code',
              sortable: true
            },
            {
              name: 'is_sector',
              label: 'Office Type',
              align: 'left',
              field: 'is_sector',
              format:(val,row)=>{return val===0?"Office":"Sector"},
              sortable: true
            },
            {
              name: 'action',
              label: 'Action',
              align: 'center',
            },
          ],
          Officelist:[],
      };
    },
    mounted(){
      this.queryOfficeList();
    }
  })
  </script>
  <style>
    .custom-container {
        height: 89vh;
      }
    .my-sticky-header-table .q-table__middle {
      max-height: 89vh;
    }
    .my-sticky-header-table .q-table__top,
    .my-sticky-header-table .q-table__bottom,
    .my-sticky-header-table thead tr:first-child th {
      background-color: #ffffff;
      z-index: 1000;
    }
    .my-sticky-header-table thead tr:first-child th {
      position: sticky;
      top: 0;
    }
    .grid-style-transition {
      transition: transform 0.28s, background-color 0.28s;
    }
  </style>
  