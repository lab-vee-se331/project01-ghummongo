export interface StudentItem {
  id: string
  username: string
  firstname: string
  lastname: string
  images: string[]
  department: string
  teacher: OwnTeacher | string
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
  username: string
  firstname: string
  lastname: string
}

export interface OwnTeacher{
  id: number
  username: string
  firstname: string
  lastname: string
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
