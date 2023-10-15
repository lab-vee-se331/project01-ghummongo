<script setup lang="ts">
// import { defineComponent, ref } from 'vue'
// import { useTeacherStore } from '@/stores/teacher'
// import { useRouter } from 'vue-router'
// import type { TeacherItem } from '@/type'
import InputText from '@/components/InputText.vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

// export default defineComponent({
//   name: 'imageUpload',
//   setup() {
//     const profileImage = ref<string | null>(null)
//     const teacher = ref({
//       name: '',
//       surname: '',
//       teacherId: ''
//     })

//     const router = useRouter()

//     const uploadImage = (e: Event) => {
//       const input = e.target as HTMLInputElement
//       const image = input?.files ? input.files[0] : null

//       if (image) {
//         const reader = new FileReader()
//         reader.readAsDataURL(image)
//         reader.onload = (e) => {
//           profileImage.value = e.target!.result as string
//         }
//       }
//     }

//     const submitForm = () => {
//       const newTeacher: TeacherItem = {
//         name: teacher.value.name,
//         surname: teacher.value.surname,
//         profileImage: profileImage.value || '',
//         teacherId: teacher.value.teacherId
//       }

//       const teacherStore = useTeacherStore()
//       teacherStore.addTeacher(newTeacher)

//       router.push({ name: 'teacher-list' })
//     }

//     return {
//       profileImage,
//       teacher,
//       uploadImage,
//       submitForm
//     }
//   }
// })

const validationSchema = yup.object({
  username: yup.string().required('The username is required'),
  password: yup.string().required('The password is required'),
  firstName: yup.string().required('The first name is required'),
  lastName: yup.string().required('The last name is required'),
  email: yup.string().email('The email is required'),
})

const { errors, handleSubmit } = useForm({
  validationSchema,

  initialValues: {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  }
})

const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')
const { value: firstName } = useField<string>('firstName')
const { value: lastName } = useField<string>('lastName')
const { value: email } = useField<string>('email')

const onSubmit = handleSubmit((values) => {
  console.log('username: '+ values.username)
  console.log('password: '+ values.password)
  console.log('firstName: '+ values.firstName)
  console.log('lastName: '+ values.lastName)
  console.log('email: '+ values.email)
})
</script>

<template>
  <div>
    <div>
      <h2 class="font-semibold text-xl text-gray-600">Create new Advisor</h2>
      <p class="text-gray-500 mb-6">This form is used to create New advisor id</p>

      <!-- Form for advisor data -->
      <form @submit.prevent="onSubmit">
        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
            <div class="lg:col-span-2">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                <!-- <div class="md:col-span-6">
                  <img v-if="profileImage" :src="profileImage" class="uploading-image" />
                  <label for="profileImage">Upload Profile</label>
                  <input
                    class="mt-1 bg-gray-50 text-gray-400 relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                    type="file"
                    id="formFile"
                    accept="image/png, image/gif, image/jpeg"
                    @change="uploadImage"
                    required
                  />
                </div> -->

                <div class="md:col-span-6">
                  <label for="username">Username</label>
                  <InputText type="text" v-model="username" :error="errors['username']"></InputText>
                </div>

                <div class="md:col-span-6">
                  <label for="password">Password</label>
                  <InputText type="password" v-model="password" :error="errors['password']"></InputText>
                </div>

                <div class="md:col-span-3">
                  <label for="firstName">First Name</label>
                  <InputText type="text" v-model="firstName" :error="errors['firstName']"></InputText>
                </div>

                <div class="md:col-span-3">
                  <label for="lastName">Last Name</label>
                  <InputText type="text" v-model="lastName" :error="errors['lastName']"></InputText>
                </div>

                <div class="md:col-span-6">
                  <label for="email">Email</label>
                  <InputText type="text" v-model="email" :error="errors['email']"></InputText>
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

<style scoped>
.error {
  color: red;
}

input {
  border: 1px solid red;
}
</style>
