<script setup lang="ts">
import type { Ref } from 'vue'
import type { StudentItem } from '@/type';
import { ref, type PropType } from 'vue';
import { useRouter } from 'vue-router';


import { useStudentStore } from '@/stores/student';
import { storeToRefs } from 'pinia';


const router = useRouter()
const store = useStudentStore()
const students = storeToRefs(store).students
const student = ref<StudentItem | null>(null);


const props = defineProps({
    id: String
})

store.getStudentById(props.id!)
    .then(result => {
        if (result) {
            student.value = result;
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
        <div v-if="student">
            <div id="nav">
                <RouterLink :to="{ name: 'student-detail', params: { id } }">Details</RouterLink> | 
                <RouterLink :to="{ name: 'student-edit', params: { id } }">Edit</RouterLink>
            </div>
            <RouterView :oneStudent="student"></RouterView>
        </div>
    </div>
</template>


