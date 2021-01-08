import Layout from '../../components/Layout'
import { PostData } from '../../interfaces'
import PostDetail from '../../components/PostDetail'
import { getPosts } from '../../utils/graphcms'

type Props = {
    postData?: PostData
    errors?: string
}

export default function PostDetailPage({ postData, errors}: Props){
    if(errors){
        return(
            <Layout>
                <p>{ errors }</p>
            </Layout>
        )
    }

    return <Layout>
        { postData && <PostDetail postData={ postData }/> }
    </Layout>
}

export async function getStaticPaths() {
    const { data } = await getPosts()
    const posts = data.posts as PostData[]
    const paths = posts.map((post) => ({ params: { id: post.fileName }}))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: any) {
    try{
        const { data } = await getPosts()
        const posts = data.posts as PostData[]
        const postData = posts.find((post) => post.fileName == params?.id)
        return { props: { postData }}
    } catch(e) {
        return { props: { errors: e.message }}
    }

}