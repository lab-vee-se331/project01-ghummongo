export interface StudentItem {
  name: string
  surname: string
  studentId: string
  profileImage: string
  courseList: string[]
  teacherId: string
  comment: string
  [key: string]: string | string[] // ใส่ index signature นี้เพื่อรองรับการใช้ string เป็น key
}

export interface TeacherItem {
  id: string
  username: string
  firstname: string
  lastname: string
  email: string
  roles: string[]
  images: string[]
  department: string
  ownStudent: OwnStudent | string
}

export interface OwnStudent{
  id: number
  name: string
  surname: string
}

export interface ErrorsType {
  name?: string
  surname?: string
  studentId?: string
  courseList?: string
  teacherId?: string
  comment?: string
  image?: string
  [key: string]: string | undefined
}

export interface StudentType {
  name: string
  surname: string
  studentId: string
  courseList: string
  courseListDisplay?: string
  teacherId: string
  comment: string
  image?: string
  [key: string]: string | undefined
}

export interface AnnouncementItem {
  id: number
  title: string
  content: string
  images: string[]
}
