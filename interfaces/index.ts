// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}
export type Timeline = {
  id: number
  date: string
  title: string
  description: string
  hideDate: boolean
}

export type Genre = "Android Application" | "iOS Application" | "Android OSS Library" | "Writing" | "Website"

export type Project = {
  id: number
  date: string
  title: string
  description: string
  genre: Genre
  part: string
  coverImageUrl: string
  videoUrl?: string
}