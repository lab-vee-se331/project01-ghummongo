<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import ImageUpload from '@/components/ImageUpload.vue'
import { ref } from 'vue'
import { useAnnouncementStore } from '@/stores/announcement'
import { useMessageStore } from '@/stores/message'

const images = ref<string[]>([])
const announcementStore = useAnnouncementStore()
const messageStore = useMessageStore()

const validationSchema = yup.object({
  title: yup.string().required('The title is required')
})

const { errors, handleSubmit } = useForm({
  validationSchema,

  initialValues: {
    title: '',
    description: ''
  }
})

const { value: title } = useField<string>('title')
const { value: description } = useField<string>('description')

const onSubmit = handleSubmit((values) => {
  // console.log('title: ' + values.title)
  // console.log('description: ' + values.description)
  // console.log(images.value)
  const urls = images.value.map((img) => img.url)
  const tid = localStorage.getItem('user_id') as string
  // console.log(urls);
  announcementStore
    .createAnnouncement(values.title, values.description, urls, tid)
    .then(() => {
      messageStore.updateMessage('Update Successful')

      setTimeout(() => {
        messageStore.resetMessage()
      }, 5000)
    })
    .catch(() => {
      messageStore.updateMessage('could not Update')

      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    })
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
                <div class="md:col-span-6">
                  <label for="title">Title</label>
                  <InputText
                    type="text"
                    v-model="title"
                    :error="errors['title']"
                    placeholder="Title..."
                  ></InputText>
                </div>

                <div class="md:col-span-6">
                  <label for="description">Description</label>
                  <textarea
                    rows="4"
                    v-model="description"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-[#42b883] mt-1 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#42b883] sm:text-sm sm:leading-6"
                    placeholder="Write your announcement here..."
                  ></textarea>
                </div>

                <div class="md:col-span-6">
                  <h3>The Image of The Announcement</h3>
                  <ImageUpload v-model="images" class="my-1" />
                  <p class="text-gray-400">Supported formats: "JPG", "JPEG", "PNG", "GIF"</p>
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
