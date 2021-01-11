import Layout from '../../components/Layout'
import { getProjects } from '../../utils/graphcms'
import { Project, ProjectData } from '../../interfaces'
import ProjectDetail from '../../components/ProjectDetail'
import { siteUrl } from '../../utils/constants'
import { OgData, ImageUrl } from '../../interfaces'
import { useState } from 'react'
import ImageViewer  from '../../components/ImageViewer'

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

    const [ isModalVisible, setModalVisible ] = useState(false)
    const [ selectedImageUrl, setSelectedImageUrl ] = useState<ImageUrl>({ url: "", width: 0, height: 0 })

    function showModal(imageUrl: ImageUrl) {
        setModalVisible(true)
        setSelectedImageUrl(imageUrl)
        offsetBody()
    }

    function hideModal(){
        setModalVisible(false)
        restoreBody()
    }

    function offsetBody(){
        const offset = window.scrollY
        document.body.style.position = "fixed"
        document.body.style.top = `${-offset}px`
    }

    function restoreBody(){
        const offset = document.body.style.top
        document.body.style.position = ''
        document.body.style.top = ''
        window.scrollTo(0, parseInt(offset || '0') * -1)
    }

    return <Layout ogData={ogData}>
        <>
            { project && <ProjectDetail project={project} showModal={showModal}/> }
            <ImageViewer isVisible={isModalVisible} imageUrl={selectedImageUrl} hideModal={hideModal}/>
        </>
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