<script setup lang="ts">
import type { Ref } from 'vue'
import type { StudentItem } from '@/type';
import { ref, type PropType, watch } from 'vue';
import { useStudentStore } from '@/stores/student';
// import StudentService from '@/services/EventService';


defineProps({
    student: {
        type: Object as PropType<StudentItem>,
        require: true
    }
})

const studentStore = useStudentStore()

watch(() => studentStore.student, (newVal, oldVal) => {
    console.log('Student value changed!')
    console.log('New Value:', newVal)
    console.log('Old Value:', oldVal)
})

</script>

<template>
    <div>
        <div v-if="student">
            <span> {{ student?.name }} {{ student?.surname }}</span>
        </div>

    </div>
</template>


