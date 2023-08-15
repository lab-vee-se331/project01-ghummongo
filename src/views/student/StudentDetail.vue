<script setup lang="ts">
import type { Ref } from 'vue'
import type { TeacherItem } from '@/type';
import type { StudentItem } from '@/type';
import { ref, type PropType } from 'vue';
// import StudentService from '@/services/EventService';


defineProps({
    oneStudent: {
        type: Object as PropType<StudentItem>,
        require: true
    },
    oneTeacher: {
        type: Object as PropType<TeacherItem>,
        required: false
    }


})



</script>

<template
>
    <div>
        <div v-if="oneStudent">
            <h1>------ student --------</h1>
            <span>name : {{ oneStudent?.name }} {{ oneStudent?.surname }}</span>
            <br><span>studentid : {{ oneStudent?.studentId }}</span>
            <img :src="oneStudent?.profileImage" alt="">
            <ul>
                Courselist :
                {{ oneStudent?.courseList }}
            </ul>
            <span>comment : {{ oneStudent?.comment }}</span>
            <br><br>
            <h1>------ teacher --------</h1>
            <span>TeacherId : {{ oneTeacher?.teacherId }}</span><br>
            <img :src="oneTeacher?.profileImage" alt="">
        </div>

    </div>
</template>


