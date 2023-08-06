<script setup lang="ts">
import type { Ref } from 'vue'
import type { StudentItem } from '@/type';
import { ref, type PropType } from 'vue';
// import StudentService from '@/services/EventService';


defineProps({
    student: {
        type: Object as PropType<StudentItem>,
        require: true
    }
})




// EventService.getEventById(Number(props.id)).then((response) => {
//     event.value = response.data
// }).catch(error => {
//     console.log(error)
// })

</script>

<template>
    <div>
        <div v-if="student">
            <span> {{ student?.name }} {{ student?.surname }}</span>
        </div>

    </div>
</template>


