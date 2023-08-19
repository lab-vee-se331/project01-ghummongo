export interface StudentItem {
    name: string;
    surname: string;
    studentId: string;
    profileImage: string;
    courseList: string[];
    teacherId: string;
    comment: string;
    [key: string]: string | string[]; // ใส่ index signature นี้เพื่อรองรับการใช้ string เป็น key
}

export interface TeacherItem {
    name: string;
    surname: string;
    profileImage: string;
    teacherId: string;
    [key: string]: string; // ใส่ index signature นี้เพื่อรองรับการใช้ string เป็น key
}