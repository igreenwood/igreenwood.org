import Layout from '../../components/Layout'
import { getProjects } from '../../utils/graphcms'
import { Project, ProjectData } from '../../interfaces'
import ProjectDetail from '../../components/ProjectDetail'
import { siteUrl } from '../../utils/constants'
import { OgData } from '../../interfaces'

type Props = {
    project?: Project
    errors?: string
}

export default function ProjectPage({ project, errors }: Props) {
    if (errors || project == undefined) {
        return (
            <Layout>
                <p>{ errors }</p>
            </Layout>
        )
    }

    const ogData: OgData = {
        title: `${project.title} | Issei Aoki`,
        type: "article",
        url: `${siteUrl}/posts/${project.name}`,
        image: project.coverImageUrl.url
    }

    return <Layout ogData={ogData}>
        { project && <ProjectDetail project={ project }/> }
    </Layout>
}

export async function getStaticPaths() {
    const { data } = await getProjects()
    const projectData = data as ProjectData
    const paths = projectData.projects.map((project) => ({ params: { id: project.name }}))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: any) {
    try{
        const { data } = await getProjects()
        const projectData = data as ProjectData
        const project = projectData.projects.find(project => project.name == params?.id)
        return { props: { project }}
    } catch(e){
        return { props: { errors: e.message }}
    }
}