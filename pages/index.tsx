import Layout from '../components/Layout'
import Projects from '../components/Projects'
import { ProjectData } from '../interfaces'
import { getProjects } from '../utils/graphcms'

type Props = {
  data: ProjectData
}

export default function ProjectsPage({ data }: Props) {
  return <Layout>
    <Projects data={ data }/>
  </Layout>
}

export async function getStaticProps() {
  const { data } = await getProjects()
  const projectData = data as ProjectData
  return {
    props: {
      data: projectData
    }
  }
}