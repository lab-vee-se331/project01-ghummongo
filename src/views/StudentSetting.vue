<template>
    <div>
        <img :src="profileImage" class="uploading-image" />
        <input type="file" accept="image/jpeg" @change="uploadImage">

        <!-- Form for student data -->
        <form @submit.prevent="submitForm">
            <div>
                <label for="name">Name:</label>
                <input id="name" v-model="student.name" type="text" required>
                <p v-if="errors.name" class="error">{{ errors.name }}</p>
            </div>

            <div>
                <label for="surname">Surname:</label>
                <input id="surname" v-model="student.surname" type="text">
                <p v-if="errors.surname" class="error">{{ errors.surname }}</p>
            </div>

            <div>
                <label for="studentId">Student ID:</label>
                <input id="studentId" v-model="student.studentId" type="text">
                <p v-if="errors.studentId" class="error">{{ errors.studentId }}</p>
            </div>

            <div>
                <label for="courses">Courses:</label>
                <input id="courses" v-model="student.courseList" type="text">
                <p v-if="errors.courseList" class="error">{{ errors.courseList }}</p>
            </div>

            <div>
                <label for="teacherId">Teacher ID:</label>
                <input id="teacherId" v-model="student.teacherId" type="text">
                <p v-if="errors.teacherId" class="error">{{ errors.teacherId }}</p>
            </div>

            <div>
                <label for="comment">Comment:</label>
                <input id="comment" v-model="student.comment" type="text">
                <p v-if="errors.comment" class="error">{{ errors.comment }}</p>
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'imageUpload',
    data() {
        return {
            profileImage: null,
            student: {
                name: '',
                surname: '',
                studentId: '',
                courseList: '',
                teacherId: '',
                comment: ''
            },
            errors: {
                name: '',
                surname: '',
                studentId: '',
                courseList: '',
                teacherId: '',
                comment: '',
                image: ''
            }
        }
    },
    methods: {
        uploadImage(e) {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.profileImage = e.target.result;
            };
        },
        submitForm() {
            if (this.validateForm()) {
                console.log(this.profileImage);
                // Submit the form data here. For example, you could send it to a server.
            } else {
                console.log('Form validation failed.');
            }
        },
        validateForm() {
            let isValid = true;
            for (let key in this.student) {
                if (!this.student[key]) {
                    this.errors[key] = 'This field is required.';
                    isValid = false;
                } else {
                    this.errors[key] = '';
                }
            }
            if (!this.profileImage) {
                this.errors.image = 'Image is required.';
                isValid = false;
            } else {
                this.errors.image = '';
            }
            return isValid;
        }
    }
}
</script>

<style>
.error {
    color: red;
}
</style>
