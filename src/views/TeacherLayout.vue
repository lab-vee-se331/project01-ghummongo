<script setup lang="ts">
import type { Ref } from 'vue'
import type { TeacherItem } from '@/type';
import { ref, type PropType } from 'vue';
import TeacherService from '@/services/TeacherService';
import { useRouter } from 'vue-router';
const router = useRouter()

import { useTeacherStore } from '@/stores/teacher';
import { storeToRefs } from 'pinia';
const store = useTeacherStore()
const teachers = storeToRefs(store).teachers
const teacherId = ref(teachers?.value?.teacherId)



</script>

<template>
    <div>
        <div v-if="teachers">
            <h1>{{ teachers.name }}</h1>
            <div id="nav">
                <RouterLink :to="{ name: 'teacher-detail', params: { teacherId } }">Details</RouterLink>
                <RouterLink :to="{ name: 'teacher-edit', params: { teacherId } }">Edit</RouterLink>
            </div>
            <RouterView :teacher="teachers"></RouterView>
        </div>
    </div>
</template>


