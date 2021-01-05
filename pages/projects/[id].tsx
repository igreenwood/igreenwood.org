import Layout from '../../components/Layout'
import { projectData } from '../../utils/local-data'
import { Project } from '../../interfaces'
import ProjectDetail from '../../components/ProjectDetail'

type Props = {
    project?: Project
    errors?: string
}

export default function ProjectPage({ project, errors }: Props) {
    if (errors) {
        return (
            <Layout>
                <p>{ errors }</p>
            </Layout>
        )
    }

    return <Layout>
        { project && <ProjectDetail project={ project }/> }
    </Layout>
}

export async function getStaticPaths() {
    const paths = projectData.projects.map((project) => ({ params: { id: project.name } }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: any) {
    try{
        const project = projectData.projects.find(project => project.name == params?.id)
        return { props: { project }}
    } catch(e){
        return { props: { errors: e.message }}
    }
}