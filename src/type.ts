export interface StudentItem {
  id: string
  username: string
  firstname: string
  lastname: string
  image: string
  department: string
  email: string
  teacher: OwnTeacher | string
}

export interface TeacherItem {
  id: string
  username: string
  firstname: string
  lastname: string
  email: string
  roles: string[]
  image: string
  department: string
  ownStudent: OwnStudent | string
}

export interface OwnStudent{
  id: number
  name: string
  surname: string
  image: string
}

export interface OwnTeacher{
  id: number
  username: string
  firstname: string
  lastname: string
  image: string
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

export interface AnnouncementItem {
  id: number
  title: string
  description: string
  images: string[]
  firstname: string
  lastname: string
  image: string
  date: string
}

export interface CommentItem {
  id: string
  content: string
  reply: replyComment | string
  teacherId: string
  teacherImage: string
  teacherFirstName: string
  studentId: string
  studentImage: string
  studentFirstName: string
}

export interface replyComment {
  id: string
  content: string
  reply: string | null
}