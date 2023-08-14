<script setup lang="ts">
import type { Ref } from 'vue'
import type { TeacherItem } from '@/type';
import { ref, type PropType } from 'vue';

import { useRouter } from 'vue-router';
import { useTeacherStore } from '@/stores/teacher';
import { storeToRefs } from 'pinia';


const router = useRouter();
const store = useTeacherStore();
const students = storeToRefs(store).teachers
const teacher = ref<TeacherItem | null>(null); // ตั้งค่าเริ่มต้นให้เป็น null

const props = defineProps({
    id: String
})
store.getTeacherById(props.id!)
    .then(result => {
        if (result) {
            teacher.value = result;
        } else {
            console.warn(props.id);
        }
    })
    .catch(error => {
        console.error(error);
    });



</script>

<template>
    <div>
        <div v-if="teacher">
            <h1>{{ teacher.name }}</h1>
            <div id="nav">
                <RouterLink :to="{ name: 'teacher-detail', params: { id } }">Details</RouterLink>
                <!-- <RouterLink :to="{ name: 'teacher-edit', params: { id } }">Edit</RouterLink> -->
            </div>
            <RouterView :oneTeacher="teacher"></RouterView>
        </div>
    </div>
</template>


