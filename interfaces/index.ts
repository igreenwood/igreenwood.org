export type Timeline = {
  id: number
  date: string
  title: string
  description: string
  hideDate: boolean
}

export type Genre = "Android Application" | "iOS Application" | "Android OSS Library" | "Writing" | "Website"

export type ImageUrl = {
  url: string
  width?: number
  height?: null
}

export type Project = {
  id: string
  name: string
  date: string
  title: string
  description: string
  genre: Genre
  part: string
  coverImageUrl: ImageUrl
  note: string
  tools: string
  links: string[]
  imageUrls?: ImageUrl[]
  videoUrls?: ImageUrl[]
}

export type ProjectData = {
  projects: Project[]
}

export type PostData = { 
  id: string
  title: string
  date: string
  tags: string
  markdownText:string
}

export type SkillCategory = "programming" | "design" | "other"

export type Skill = {
  name: string
  category: SkillCategory
}

export type SkillData = {
  mainSkills: Skill[]
  subSkills: Skill[]
}

export type ContactData = {
  githubUrl: string
  twitterUrl: string
  linkedInUrl: string
  email: string
}

export type CareerData = {
  timelines: Timeline[]
}

export type AwardData = {
  timelines: Timeline[]
}

export type EducationData = {
  timelines: Timeline[]
}

export type ProfileData = {
  name: string
  job: string
  description: string
  skillData: SkillData
  careerData: CareerData
  awardData: AwardData
  educationData: EducationData
  contactData: ContactData
}