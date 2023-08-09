<script setup lang="ts">
import type { Ref } from 'vue'
import type { TeacherItem } from '@/type';
import { ref, type PropType } from 'vue';
// import StudentService from '@/services/EventService';


defineProps({
    oneTeacher: {
        type: Object as PropType<TeacherItem>,
        require: true
    },



})

</script>

<template
>
    <div>
        <div v-if="oneTeacher">
            <span> {{ oneTeacher?.name }} {{ oneTeacher?.surname }}</span>
        </div>

    </div>
</template>


