import Layout from '../components/Layout'
import Projects from '../components/Projects'
import { Project } from '../interfaces'
import { projects as projectData} from '../utils/local-data'

type Props = {
  projects: Project[]
}

export default function ProjectsPage({ projects }: Props) {
  return <Layout>
    <main>
      <Projects projects={ projects }/>
    </main>
  </Layout>
}

export async function getStaticProps() {
  return {
    props: {
      projects: projectData
    }
  }
}