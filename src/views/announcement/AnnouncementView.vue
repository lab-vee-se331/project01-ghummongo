<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

const validationSchema = yup.object({
  title: yup.string().required('The title is required')
})

const { errors, handleSubmit } = useForm({
  validationSchema,

  initialValues: {
    title: '',
  }
})

const { value: title } = useField<string>('title')

const onSubmit = handleSubmit((values) => {
  console.log('title: ' + values.title)
})
</script>

<template>
  <div>
    <div>
      <h2 class="font-semibold text-xl text-gray-600">Create New Announcement</h2>
      <p class="text-gray-500 mb-6">This form is used to create New Announcement to Student</p>

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
                  <label for="title">Title</label>
                  <InputText type="text" v-model="title" :error="errors['title']" placeholder="Title..."></InputText>
                </div>

                <div class="md:col-span-6">
                  <label for="content">Content</label>
                  <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-[#42b883] mt-1 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#42b883] sm:text-sm sm:leading-6" placeholder="Write your announcement here..."></textarea>
                </div>

                <div class="md:col-span-6 text-right mt-2">
                  <div class="inline-flex items-end">
                    <button
                      class="bg-[#42b883] hover:bg-[#27a26f] text-white font-bold py-2 px-4 rounded"
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
