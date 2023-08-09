<template>
    <div>
        <img :src="profileImage" class="uploading-image" />
        <input type="file" accept="image/jpeg" @change="uploadImage">
        <p v-if="errors.image" class="error">{{ errors.image }}</p>

        <!-- Form form teacher data -->
        <form @submit.prevent="submitForm">
            <div>
                <label for="name">Name:</label>
                <input id="name" v-model="teacher.name" type="text" placeholder="Ex : Sorawee">
                <p v-if="errors.name" class="error">{{ errors.name }}</p>
            </div>

            <div>
                <label for="surname">Surname:</label>
                <input id="surname" v-model="teacher.surname" type="text" placeholder="Ex : Mamaiaa">
                <p v-if="errors.surname" class="error">{{ errors.surname }}</p>
            </div>

            <div>
                <label for="teacherId">Teacher ID:</label>
                <input id="teacherId" v-model="teacher.teacherId" type="text" placeholder="Ex : s20">
                <p v-if="errors.teacherId" class="error">{{ errors.teacherId }}</p>
            </div>

            <div>
                <label for="courses">Courses:</label>
                <input id="courses" v-model="teacher.courseList" type="text" placeholder='Ex : "Sci","Psy"'>
                <p v-if="errors.courseList" class="error">{{ errors.courseList }}</p>
            </div>

            <div>
                <label for="teacherId">Teacher ID:</label>
                <input id="teacherId" v-model="teacher.teacherId" type="text" placeholder="Ex : t20">
                <p v-if="errors.teacherId" class="error">{{ errors.teacherId }}</p>
            </div>

            <div>
                <label for="comment">Comment:</label>
                <input id="comment" v-model="teacher.comment" type="text"
                    placeholder="Ex : Fuck You, You Fucking Orange Shirt">
                <p v-if="errors.comment" class="error">{{ errors.comment }}</p>
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
import { useTeacherStore } from '@/stores/teacher'


export default {
    name: 'imageUpload',
    data() {
        return {
            profileImage: null,
            teacher: {
                name: '',
                surname: '',
                courseList: '',
                teacherId: '',
                comment: ''
            },
            errors: {
                name: '',
                surname: '',
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
                // success baby

                const newTeacher = {
                    name: this.teacher.name,
                    surname: this.teacher.surname,
                    teacherId: this.teacher.teacherId,
                    profileImage: this.profileImage,
                    courseList: this.teacher.courseList.split(","),
                    comment: this.teacher.comment
                };

                const teacherStore = useTeacherStore();
                teacherStore.addTeacher(newTeacher);

                this.$router.push({ name: "teacher-list" });

            } else {
                console.log('Form validation failed.');
            }
        },
        validateForm() {
            let isValid = true;
            for (let key in this.teacher) {
                if (!this.teacher[key]) {
                    this.errors[key] = `${key} field is required.`;
                    isValid = false;
                } else {
                    this.errors[key] = '';
                }
            }
            if (!this.profileImage) {
                this.errors.image = 'Image is required.';
                isValid = false;
                console.log(this.errors)
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

input {
    border: 5px solid red;
}
</style>
