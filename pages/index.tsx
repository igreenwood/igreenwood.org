import Link from 'next/link'
import Layout from '../components/Layout'
import Projects from '../components/Projects'
import { Project } from '../interfaces'

export default function IndexPage() {
  const projects: Project[] = [
    { id: 1, date: "20210101", title: "igreenwood.com", description: "this pageg", genre: "Android OSS Library", part: "Frontend/Backend coding, Design,", coverImageUrl: "/images/cover4.jpg"},
    { id: 2, date: "20210101", title: "igreenwood.com", description: "this pageg", genre: "Website", part: "Frontend/Backend coding, Design,", coverImageUrl: "/images/cover4.jpg"},
    { id: 3, date: "20210101", title: "igreenwood.com", description: "this pageg", genre: "Website", part: "Frontend/Backend coding, Design,", coverImageUrl: "/images/cover4.jpg"},
    { id: 4, date: "20210101", title: "igreenwood.com", description: "this pageg", genre: "Website", part: "Frontend/Backend coding, Design,", coverImageUrl: "/images/cover4.jpg"},
    { id: 5, date: "20210101", title: "igreenwood.com", description: "this pageg", genre: "Website", part: "Frontend/Backend coding, Design,", coverImageUrl: "/images/cover4.jpg"}
  ]
  return <Layout>
    <Projects projects={ projects }/>
  </Layout>
}