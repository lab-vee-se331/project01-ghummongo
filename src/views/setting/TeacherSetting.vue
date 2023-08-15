<template>
    <div>
      <div>
        <h2 class="font-semibold text-xl text-gray-600">Add Teacher</h2>
        <p class="text-gray-500 mb-6">This form is used to add new teacher to the list.</p>
  
        <!-- Form for teacher data -->
        <form @submit.prevent="submitForm">
          <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
              <div class="lg:col-span-2">
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                  <div class="md:col-span-6">
                    <img :src="profileImage" class="uploading-image" />
                    <label for="profileImage">Upload Profile</label>
                    <input
                      class="mt-1 bg-gray-50 text-gray-400 relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                      type="file"
                      id="formFile"
                      accept="image/png, image/gif, image/jpeg"
                      @change="uploadImage"
                    />
                    <p v-if="errors.image" class="error">{{ errors.image }}</p>
                  </div>
                  <div class="md:col-span-3">
                    <label for="firstName">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      v-model="teacher.name"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    <p v-if="errors.name" class="error">{{ errors.name }}</p>
                  </div>
  
                  <div class="md:col-span-3">
                    <label for="lastName">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      v-model="teacher.surname"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    <p v-if="errors.surname" class="error">{{ errors.surname }}</p>
                  </div>
                  <div class="md:col-span-2">
                    <label for="teacherId">Teacher ID</label>
                    <input
                      type="text"
                      name="teacherId"
                      id="teacherId"
                      v-model="teacher.teacherId"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    <p v-if="errors.teacherId" class="error">{{ errors.teacherId }}</p>
                  </div>
                  <div class="md:col-span-6 text-right mt-2">
                    <div class="inline-flex items-end">
                      <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { useTeacherStore } from '@/stores/teacher'
  
  export default {
    name: 'imageUpload',
    data() {
      return {
        profileImage: null,
        teacher: {
            name: '',
            surname: '',
            teacherId: ''
        },
        errors: {
            name: '',
            surname: '',
            teacherId: ''
        }
      }
    },
    methods: {
      uploadImage(e) {
        const image = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = (e) => {
          this.profileImage = e.target.result
        }
      },
      submitForm() {
        if (this.validateForm()) {
          // success baby
  
          const newTeacher = {
            name: this.teacher.name,
            surname: this.teacher.surname,
            profileImage: this.profileImage,
            teacherId: this.teacher.teacherId
          }
  
          const teacherStore = useTeacherStore()
          teacherStore.addTeacher(newTeacher)
  
          this.$router.push({ name: 'teacher-list' })
        } else {
          console.log('Form validation failed.')
          console.log('Errors:', this.errors);
        }
      },
      validateForm() {
        let isValid = true
        for (let key in this.teacher) {
          if (!this.teacher[key]) {
            this.errors[key] = `${key} field is required.`
            isValid = false
          } else {
            this.errors[key] = ''
          }
        }
        if (!this.profileImage) {
          this.errors.image = 'Image is required.'
          isValid = false
          console.log(this.errors)
        } else {
          this.errors.image = ''
        }
        return isValid
      }
    }
  }
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  
  input {
    border: 1px solid red;
  }
  </style>
  