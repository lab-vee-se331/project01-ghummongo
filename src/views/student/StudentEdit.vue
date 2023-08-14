<template>
    <div>
        <img :src="profileImage" class="uploading-image" />
        <input type="file" accept="image/jpeg" @change="uploadImage">
        <p v-if="errors.image" class="error">{{ errors.image }}</p>

        <!-- Form for student data -->
        <form @submit.prevent="submitForm">
            <div>
                <label for="name">Name:</label>
                <input id="name" v-model="student.name" type="text" placeholder="Ex : Sorawee" disabled>
                <p v-if="errors.name" class="error">{{ errors.name }}</p>
            </div>

            <div>
                <label for="surname">Surname:</label>
                <input id="surname" v-model="student.surname" type="text" placeholder="Ex : Mamaiaa" disabled>
                <p v-if="errors.surname" class="error">{{ errors.surname }}</p>
            </div>

            <div>
                <label for="studentId">Student ID:</label>
                <input id="studentId" v-model="student.studentId" type="text" placeholder="Ex : s20" disabled>
                <p v-if="errors.studentId" class="error">{{ errors.studentId }}</p>
            </div>

            <div>
                <label for="courses">Courses:</label>
                <input id="courses" v-model="student.courseListDisplay" type="text" placeholder='Ex : "Sci","Psy"'>
                <p v-if="errors.courseList" class="error">{{ errors.courseList }}</p>
            </div>

            <div>
                <label for="teacherId">Teacher ID:</label>
                <input id="teacherId" v-model="student.teacherId" type="text" placeholder="Ex : t20" disabled>
                <p v-if="errors.teacherId" class="error">{{ errors.teacherId }}</p>
            </div>

            <div>
                <label for="comment">Comment:</label>
                <input id="comment" v-model="student.comment" type="text"
                    placeholder="Ex : Fuck You, You Fucking Orange Shirt">
                <p v-if="errors.comment" class="error">{{ errors.comment }}</p>
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
import type { StudentItem } from '@/type';
import { reactive, ref, type PropType } from 'vue';
import router from '@/router';
const oneStudent = defineProps({
    oneStudent: {
        type: Object as PropType<StudentItem>,
        required: true
    }
})

const receivedStudent = oneStudent.oneStudent

const profileImage = ref(receivedStudent.profileImage)
const student = reactive({
    name: receivedStudent.name,
    surname: receivedStudent.surname,
    studentId: receivedStudent.studentId,
    // courseList: receivedStudent.courseList.map(course => `"${course}"`).join(','),
    courseList: receivedStudent.courseList ? receivedStudent.courseList.join(',') : '',
    courseListDisplay: receivedStudent.courseList ? receivedStudent.courseList.map(course => `"${course}"`).join(',') : '',
    teacherId: receivedStudent.teacherId,
    comment: receivedStudent.comment,
})

const errors = reactive({
    name: '',
    surname: '',
    studentId: '',
    courseList: '',
    teacherId: '',
    comment: '',
    image: ''
})

const uploadImage = (e: any) => {
    const image = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
            profileImage.value = e.target.result;
        } else {
            // Handle the error here (e.g., show an error message to the user)
        }
    }
}

const submitForm = () => {
    if (validateForm()) {

        const newStudent = {
            name: student.name,
            surname: student.surname,
            studentId: student.studentId,
            profileImage: profileImage.value,
            courseList: student.courseList.split(","),
            teacherId: student.teacherId,
            comment: student.comment
        }


        const studentStore = useStudentStore()
        studentStore.updateStudent(newStudent)

        router.push({ name: 'student-list' })
    } else {
        console.log('Form validation failed.')
    }
}

const validateForm = () => {
    let isValid = true
    for (let key in student) {
        if (!student[key]) {
            errors[key] = `${key} field is required.`
            isValid = false
        } else {
            errors[key] = ''
        }
    }
    if (!profileImage.value) {
        errors.image = 'Image is required.'
        isValid = false
    } else {
        errors.image = ''
    }
    return isValid
}
</script>
  
<style scoped>
.error {
    color: red;
}

input {
    border: 1px solid red;
}
</style>
  