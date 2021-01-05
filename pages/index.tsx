import Layout from '../components/Layout'
import Projects from '../components/Projects'
import { ProjectData } from '../interfaces'
import { projectData as data } from '../utils/local-data'

type Props = {
  data: ProjectData
}

export default function ProjectsPage({ data }: Props) {
  return <Layout>
    <Projects data={ data }/>
  </Layout>
}

export async function getStaticProps() {
  return {
    props: {
      data: data
    }
  }
}