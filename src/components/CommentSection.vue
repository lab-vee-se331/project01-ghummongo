<script setup lang="ts">
import { useCommentStore } from '@/stores/comment'
import type { CommentItem, StudentItem, TeacherItem } from '@/type'
import { onMounted, ref, type PropType } from 'vue'
import InputText from '@/components/InputText.vue'
import { useField, useForm } from 'vee-validate'
import { useMessageStore } from '@/stores/message'
import { useTeacherStore } from '@/stores/teacher'

const commentStore = useCommentStore()
const comments = ref<CommentItem[]>([])
const replyStates = ref<Record<string, boolean>>({})
const messageStore = useMessageStore()
const teacherStore = useTeacherStore()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  oneStudent: {
    type: Object as PropType<StudentItem>,
    required: true
  }
})

const fetchComments = async () => {
  await commentStore
    .getCommentById(props.id!)
    .then(async (result) => {
      if (result) {
        comments.value = result
        console.log(result)
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(async () => {
  fetchComments()
})

const toggleReply = (commentId: string) => {
  replyStates.value[commentId] = !replyStates.value[commentId]
}

const { errors, handleSubmit } = useForm({
  // validationSchema,

  initialValues: {
    commentId: '',
    content: '',
    studentId: '',
    teacherId: '',
    teacherImage: '',
    teacherFirstName: '',
    studentImage: '',
    studentFirstName: ''
  }
})

const { value: commentId } = useField<string>('commentId')
const { value: content } = useField<string>('content')
const { value: studentId } = useField<string>('studentId')
const { value: teacherId } = useField<string>('teacherId')
const { value: teacherImage } = useField<string>('studentId')
const { value: teacherFirstName } = useField<string>('teacherId')
const { value: studentImage } = useField<string>('studentId')
const { value: studentFirstName } = useField<string>('teacherId')

const onSubmit = handleSubmit((values) => {
  console.log(values.commentId, values.content, values.studentId, values.teacherId)
  commentStore
    .replyComment(values.commentId, values.content, values.studentId, values.teacherId)
    .then(() => {
      messageStore.updateMessage('Reply Successful')
      toggleReply(values.commentId)
      fetchComments()
      setTimeout(() => {
        messageStore.resetMessage()
      }, 5000)
    })
    .catch(() => {
      messageStore.updateMessage('could not Reply')

      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    })
})

const setReply = (id: string, sid: string, tid: string) => {
  commentId.value = id
  studentId.value = sid
  teacherId.value = tid
}

const isTeacherRole = () => {
  return localStorage.getItem('user_role') === '["ROLE_TEACHER"]'
}

const onSubmitComment = handleSubmit(async (values) => {
  const teacherId = localStorage.getItem('user_id') as string
  const teacherImage = await teacherStore.getTeacherById(teacherId).then((result) => {
    return result?.image
  }) as string
  // console.log(values.content, props.id, teacherId, teacherImage)
  commentStore
    .createComment(values.content, props.id, teacherId, teacherImage)
    .then(() => {
      messageStore.updateMessage('Create comment Successful')
      content.value = ''
      fetchComments()
      setTimeout(() => {
        messageStore.resetMessage()
      }, 5000)
    })
    .catch(() => {
      messageStore.updateMessage('could not Create comment')

      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    })
})
</script>

<template>
  <div class="flex flex-col items-center justify-center my-12">
    <span class="text-xl text-gray-600 mb-8 underline underline-offset-2 decoration-[#42b883]"
      >Comments</span
    >
    <div v-for="comment in comments" :key="comment.id" class="text-gray-600 lg:w-[800px]">
      <div class="grid grid-cols-6 mb-8">
        <div class="col-span-1 sm:col-span-2 mr-4">
          <img
            :src="comment.teacherImage"
            alt=""
            class="rounded-full w-12 h-12 object-cover float-right"
          />
        </div>
        <div class="col-span-4">
          <div class="text-gray-600">
            <span class="font-bold">{{ comment.teacherFirstName }} (Teacher)</span>
          </div>
          <!-- <div class="text-md mb-2">{{ comment.content }}</div> -->
          <div class="text-md mb-2">
            {{ comment.content }}
          </div>
          <div class="pt-2 w-fit">
            <div class="flex flex-col pl-6 text-gray-500 border-l border-gray-300">
              <div v-if="comment?.reply?.content" class="grid grid-cols-6 my-2">
                <div class="col-span-1 mr-4">
                  <img
                    :src="comment.studentImage"
                    alt=""
                    class="rounded-full w-12 h-12 object-cover float-right"
                  />
                </div>
                <div class="col-span-5">
                  <div class="text-gray-600">
                    <span class="font-bold">{{ comment.studentFirstName }} (Student)</span>
                  </div>
                  <div class="text-md mb-2">{{ comment?.reply?.content }}</div>
                </div>
              </div>
              <p
                v-if="!comment?.reply?.content && !isTeacherRole()"
                class="group text-sm cursor-pointer"
                @click="toggleReply(comment.id)"
              >
                <font-awesome-icon icon="reply" class="mr-2" /><span
                  class="group-hover:underline"
                  >{{ replyStates[comment.id] ? 'Hide' : 'Reply' }}</span
                >
              </p>
              <form v-if="replyStates[comment.id]" class="relative" @submit.prevent="onSubmit">
                <InputText
                  type="text"
                  v-model="content"
                  :error="errors['content']"
                  placeholder="Reply..."
                ></InputText>
                <button
                  type="submit"
                  @click="setReply(comment.id, comment.studentId, comment.teacherId)"
                >
                  <font-awesome-icon
                    icon="reply"
                    class="absolute top-3.5 right-2 p-1.5 bg-green-400 rounded cursor-pointer text-white hover:bg-white hover:text-green-400 hover:border-green-400 hover:border"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <form v-if="isTeacherRole()" @submit.prevent="onSubmitComment">
    <div class="w-full border border-gray-200 rounded-lg bg-gray-50">
      <div class="px-4 py-2 bg-white rounded-t-lg">
        <label for="comment" class="sr-only">Your comment</label>
        <InputText
          rows="4"
          v-model="content"
          class="w-full px-0 text-sm text-gray-900 bg-white"
          placeholder="Write a comment..."
        ></InputText>
      </div>
      <div class="flex items-center justify-between px-3 py-2 border-t">
        <button
          type="submit"
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#27a26f] rounded-lg focus:ring-4 focus:ring-[#b1e9ca]"
        >
          Post comment
        </button>
      </div>
    </div>
  </form>
</template>
