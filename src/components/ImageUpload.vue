<script setup lang="ts">
import Uploader from 'vue-media-upload'
import { ref } from 'vue'
import axios from 'axios';
interface Props {
  modelValue?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => []
})

const emit = defineEmits(['update:modelValue'])

const uploadUrl = ref(import.meta.env.VITE_UPLOAD_URL)

const handleFileChange = (e: any) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });

    const formData = new FormData();
    formData.append('files', blob, file.name);

    formData.append("teacherId", "1");
    formData.append("title", "Your Title");
    formData.append("description", "Your Description");
    formData.append("date", "2023-10-22");

    axios.post(uploadUrl.value, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error("There was an error uploading the file:", error);
    });
  }

  reader.readAsArrayBuffer(file);
}

// const onChanged = async (files: any) => {
//   const formData = new FormData();

//   formData.append("files", files);
//   formData.append("teacherId", "12345");
//   formData.append("title", "Your Title");
//   formData.append("description", "Your Description");
//   formData.append("date", "2023-10-22");

//   console.log(formData)

//   console.log(uploadUrl.va)

//   axios.post(uploadUrl.value, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   }).then(response => {
//   });
// }


</script>

<template>
  <input type="file" @change="handleFileChange" />
</template>