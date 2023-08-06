<script setup lang="ts">
import type { Ref } from 'vue'
import type { StudentItem } from '@/type';
import { ref, type PropType } from 'vue';
// import StudentService from '@/services/EventService';


defineProps({
    oneStudent: {
        type: Object as PropType<StudentItem>,
        require: true
    },



})

</script>

<template
>
    <div>
        <div v-if="oneStudent">
            <span> {{ oneStudent?.name }} {{ oneStudent?.surname }}</span>
        </div>

    </div>
</template>


