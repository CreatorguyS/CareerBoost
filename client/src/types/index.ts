export interface User {
  id: string
  email: string
  full_name: string
  created_at: string
  updated_at: string
}

export interface Resume {
  id: string
  user_id: string
  title: string
  content: any
  created_at: string
  updated_at: string
}

export interface Internship {
  id: string
  title: string
  company: string
  location: string
  description: string
  requirements: string[]
  salary_range?: string
  application_deadline: string
  posted_date: string
  is_remote: boolean
  experience_level: 'entry' | 'mid' | 'senior'
}

export interface Application {
  id: string
  user_id: string
  internship_id: string
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn'
  applied_at: string
  notes?: string
}

export interface University {
  id: string
  name: string
  country: string
  ranking: number
  programs: string[]
  tuition_fee_range: string
  admission_requirements: string[]
}

export interface Scholarship {
  id: string
  name: string
  provider: string
  amount: string
  eligibility: string[]
  deadline: string
  description: string
}