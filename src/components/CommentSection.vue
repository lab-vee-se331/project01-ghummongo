<script setup lang="ts">
import { useCommentStore } from '@/stores/comment'
import type { CommentItem } from '@/type'
import { ref } from 'vue'

const commentStore = useCommentStore()
const comments = ref<CommentItem | null>(null)

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

commentStore
  .getStudentById(props.id!)
  .then((result) => {
    if (result) {
      comments.value = result
      console.log(comments.value)
    }
  })
  .catch((error) => {
    console.error(error)
  })
</script>

<template>
  <span class="text-xl text-gray-600 mb-8 underline underline-offset-2 decoration-[#42b883]"
    >Comments</span
  >
  <div class="text-gray-600">
    <div v-for="comment in comments" :key="comment.id" class="grid grid-cols-6">
      <div class="col-span-1 mr-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/640px-Anonymous_emblem.svg.png"
          alt=""
          class="rounded-full w-12 h-12 object-cover float-right"
        />
      </div>
      <div class="col-span-4">
        <div class="text-gray-600"><span class="font-bold">Teacher</span> · 1h ago</div>
        <div class="text">{{ comment.content }}</div>
        <hr class="my-6" />
      </div>

      <div v-if="comment?.reply?.content" class="col-span-4 text-right mr-4">
        <div class="text-gray-600"><span class="font-bold">Me</span> · 1h ago</div>
        <div class="text">{{ comment?.reply?.content }}</div>
        <hr class="my-6" />
      </div>
      <div v-if="comment?.reply?.content" class="col-span-1 mr-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/640px-Anonymous_emblem.svg.png"
          alt=""
          class="rounded-full w-12 h-12 object-cover float-right"
        />
      </div>

    </div>
  </div>
</template>
