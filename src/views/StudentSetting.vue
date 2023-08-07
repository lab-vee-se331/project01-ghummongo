<script setup lang="ts">
import type { Ref } from 'vue'
import type { StudentItem } from '@/type';
import { ref, type PropType } from 'vue';
import StudentService from '@/services/StudentService';
import { useRouter } from 'vue-router';
const router = useRouter()

import { useStudentStore } from '@/stores/student';
import { storeToRefs } from 'pinia';
const store = useStudentStore()




</script>

<template>
    <div>
        <RouterLink :to="{ name: 'student-detail' }">Details</RouterLink>
        <RouterLink :to="{ name: 'student-edit' }">Edit</RouterLink>
    </div>
</template>


